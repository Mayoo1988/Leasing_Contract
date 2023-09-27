/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, ViewChild, inject } from '@angular/core'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { ContractItem } from 'src/app/Model/Master'
import { MasterService } from 'src/app/service/master.service'
import { LeasingContractEditComponent } from '../leasingContractEdit/leasing-contract-edit.component'
import { LeasingContractAddComponent } from '../leasingContractAdd/leasing-contract-add.component'
import { LeasingContractDetailComponent } from '../leasingContractDetail/leasing-contract-detail.component'
import { LeasingContractDeleteComponent } from '../leasingContractDelete/leasing-contract-delete.component'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { CommonModule, NgIf } from '@angular/common'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-leasing-contract',
  templateUrl: './leasing-contract.component.html',
  styleUrls: ['./leasing-contract.component.css'],
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatIconModule, MatPaginatorModule, MatDialogModule, CommonModule, NgIf]
})
export class LeasingContractComponent {
  customerlist !: ContractItem[]
  dataSource: any
  displayedColumns: string[] = ['ContractNo', 'customerName', 'vehicleName', 'vin', 'monthlyRate', 'vehiclePrice', 'action']
  @ViewChild(MatPaginator) paginatior !: MatPaginator
  @ViewChild(MatSort) sort !: MatSort
  pageSizeOptions = [5, 10, 20]
  totalItems: number = 0
  currentPageSize: number = this.pageSizeOptions[0]
  currentPageIndex: number = 0
  contract$!: Observable<{ numberOfItems: number, overviewItems: ContractItem[] }>
  ngOnInit (): void {
    this.dataSource = new MatTableDataSource<ContractItem>([])
    this.loadcustomer()
  }

  private readonly service = inject(MasterService)
  private readonly dialog = inject(MatDialog)
  loadcustomer (): void {
    this.contract$ = this.service.getLeasingContract(this.currentPageSize, this.currentPageIndex)
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

  editContract (code: any): void {
    this.Openpopup(code, 'Edit Contract', LeasingContractEditComponent)
  }

  detailContract (code: any): void {
    this.Openpopup(code, 'detail Contract', LeasingContractDetailComponent)
  }

  deleteContract (code: any): void {
    this.Openpopup(code, 'delete Contract', LeasingContractDeleteComponent)
  }

  addcontract (type: string): void {
    this.Openpopup(0, 'Add Contract', LeasingContractAddComponent)
  }

  Openpopup (code: any, title: any, component: any): void {
    const _popup = this.dialog.open(component, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code
      }
    })
    _popup.afterClosed().subscribe(item => {
      this.loadcustomer()
    })
  }
}
