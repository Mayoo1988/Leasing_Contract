/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, ViewChild, inject } from '@angular/core'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { vehicle } from 'src/app/Model/vehicle'
import { vehicleService } from 'src/app/service/vehicle.service'
import { CommonModule, DatePipe } from '@angular/common'
import { EditVehicleComponent } from 'src/app/component/vehicle/editVehicle/edit-vehicle-component.component'
import { DeleteVehicleComponent } from 'src/app/component/vehicle/deleteVehicle/delete-vehicle.component'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-vehicle-component',
  templateUrl: './vehicle-component.component.html',
  styleUrls: ['./vehicle-component.component.css'],
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatIconModule, MatPaginatorModule, MatDialogModule, CommonModule]
})
export class VehicleComponent {
  vehiclelist !: vehicle[]
  dataSource: any
  displayedColumns: string[] = ['brand', 'model', 'modelYear', 'vin', 'price', 'action']
  @ViewChild(MatPaginator) paginatior !: MatPaginator
  @ViewChild(MatSort) sort !: MatSort
  pageSizeOptions = [5, 10, 20]
  totalItems: number = 0
  currentPageSize: number = this.pageSizeOptions[0]
  currentPageIndex: number = 0
  vehicle$!: Observable<{ numberOfItems: number, overviewItems: vehicle[] } >
  ngOnInit (): void {
    this.dataSource = new MatTableDataSource<vehicle>([])
    this.loadVehicle()
  }

  private readonly service = inject(vehicleService)
  private readonly dialog = inject(MatDialog)
  private readonly datePipe = inject(DatePipe)
  loadVehicle (): void {
    this.vehicle$ = this.service.getVehicle(this.currentPageSize, this.currentPageIndex)
    this.dataSource.sort = this.sort
  }

  filterChange (data: Event): void {
    const value = (data.target as HTMLInputElement).value
    this.dataSource.filter = value
  }

  onPaginatorChange (event: PageEvent): void {
    this.currentPageSize = event.pageSize
    this.currentPageIndex = event.pageIndex
    this.loadVehicle()
  }

  editVehicle (code: any): void {
    this.Openpopup(code, 'Edit Vehicle', EditVehicleComponent)
  }

  addVehicle (code: any): void {
    this.Openpopup(code, 'Add Vehicle', EditVehicleComponent)
  }

  deleteVehicle (code: any): void {
    this.Openpopup(code, 'delete Vehicle', DeleteVehicleComponent)
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
      this.loadVehicle()
    })
  }

  formatBirthDate (birthDate: any): string {
    if (birthDate) {
      return this.datePipe.transform(birthDate, 'dd/MM/yyyy') ?? ''
    }
    return ''
  }
}
