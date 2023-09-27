/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, ViewChild, inject } from '@angular/core'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Customer } from 'src/app/Model/customer'
import { MasterService } from 'src/app/service/master.service'
import { CommonModule, DatePipe, NgIf } from '@angular/common'
import { EditCustomerComponent } from 'src/app/component/customers/editCustomerComponent/edit-customer.component'
import { DeleteCustomerComponent } from 'src/app/component/customers/deleteCustomer/delete-customer.component'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { Observable } from 'rxjs'
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatTableModule, MatSortModule, MatIconModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, NgIf, CommonModule]
})
export class CustomersComponent {
  customerlist !: Customer[]
  dataSource: any
  displayedColumns: string[] = ['firstName', 'lastName', 'birthDate', 'action']
  @ViewChild(MatPaginator) paginatior !: MatPaginator
  @ViewChild(MatSort) sort !: MatSort
  pageSizeOptions = [5, 10, 20]
  totalItems: number = 0
  currentPageSize: number = this.pageSizeOptions[0]
  currentPageIndex: number = 0
  customers$!: Observable<{ numberOfItems: number, overviewItems: Customer[] } >

  private readonly service = inject(MasterService)
  private readonly dialog = inject(MatDialog)
  private readonly datePipe = inject(DatePipe)
  ngOnInit (): void {
    this.dataSource = new MatTableDataSource<Customer>([])
    this.loadcustomer()
  }

  loadcustomer (): void {
    this.customers$ = this.service.getCustomer(this.currentPageSize, this.currentPageIndex)
    this.dataSource.sort = this.sort
  }

  filterChange (data: Event): void {
    const value = (data.target as HTMLInputElement).value
    this.dataSource.filter = value
  }

  onPaginatorChange (event: PageEvent): void {
    this.currentPageSize = event.pageSize
    this.currentPageIndex = event.pageIndex
    // Reload data when the page size or index changes.
    this.loadcustomer()
  }

  editCustomer (code: any): void {
    this.Openpopup(code, 'Edit Customer', EditCustomerComponent)
  }

  addCustomer (code: any): void {
    this.Openpopup(code, 'Add Customer', EditCustomerComponent)
  }

  deleteCustomer (code: any): void {
    this.Openpopup(code, 'delete Customer', DeleteCustomerComponent)
  }

  Openpopup (code: any, title: any, component: any): void {
    const _popup = this.dialog.open(component, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        // eslint-disable-next-line object-shorthand
        title: title,
        // eslint-disable-next-line object-shorthand
        code: code
      }
    })
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      this.loadcustomer()
    })
  }

  formatBirthDate (birthDate: any): string {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (birthDate) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return (this.datePipe.transform(birthDate, 'dd/MM/yyyy') ?? '') || ''
    }
    return ''
  }
}
