/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, Inject, OnInit, inject } from '@angular/core'
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { MasterService } from 'src/app/service/master.service'
import { Customer } from '../../../../Model/customer'
import { Vehicle } from '../../../../Model/vehicle'
import { Observable, forkJoin, switchMap, of, Subscription } from 'rxjs'
import { SnackbarService } from '../../../../service/snackbar.service'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core'
import { NgFor } from '@angular/common'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { vehicleService } from 'src/app/service/vehicle.service'
import { CustomerService } from 'src/app/service/customer.service'

@Component({
  selector: 'app-leasing-contract-add',
  templateUrl: './leasing-contract-add.component.html',
  styleUrls: ['./leasing-contract-add.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, NgFor, MatOptionModule, MatDatepickerModule, MatButtonModule, MatNativeDateModule]
})
export class LeasingContractAddComponent implements OnInit {
  inputdata: any
  editdata: any
  birtdate?: number[] = [1998, 5, 13]
  namelist !: string[]
  vehiclelist !: string[]
  Pagesize: number = 100
  PageIndex: number = 0
  selectedCustomer !: string
  selectedVehicle !: string

  closemessage = 'closed using directive'
  private subscription: Subscription | undefined
  constructor (@Inject(MAT_DIALOG_DATA) public data: any, private readonly ref: MatDialogRef<LeasingContractAddComponent>) {

  }
  private readonly service = inject(MasterService)
  private readonly vehicle = inject(vehicleService)
  private readonly customer = inject(CustomerService)
  private readonly snackbarService = inject(SnackbarService)
  private readonly buildr = inject(FormBuilder)
  ngOnInit (): void {
    this.setpopupdata(this.data)
  }

  setpopupdata (code: any): void {
    const customerObservable$: Observable<any> = this.service.getCustomer(this.Pagesize, this.PageIndex)
    const vehicleObservable$: Observable<any> = this.service.getVehicle(this.Pagesize, this.PageIndex)

    forkJoin([customerObservable$, vehicleObservable$]).pipe(
      switchMap(([firstResult, secondResult]) => {
        this.namelist = firstResult.overviewItems.map((customer: Customer) => customer.firstName + ' ' + customer.lastName)
        this.vehiclelist = secondResult.overviewItems.map((vehicle: Vehicle) => vehicle.brand + ' ' + vehicle.model + ' ' + vehicle.modelYear)
        return of(null)
      })
    ).subscribe(
      () => {
      }
    )
  }

  closepopup (): void {
    this.ref.close('Closed using function')
  }

  myform = this.buildr.group({
    contractNo: this.buildr.control('', Validators.required),
    monthlyRate: this.buildr.control('', Validators.required),
    customername: this.buildr.control('', Validators.required),
    vehiclename: this.buildr.control('', Validators.required),
    birthDate: this.buildr.control('', Validators.required),
    vin: this.buildr.control('', Validators.required),
    price: this.buildr.control('', Validators.required)
  })

  // Mapping function to transform the form values to the desired format
  transformFormValues (formValues: any): any {
    const transformedData: any = {
      contractNumber: formValues.contractNo,
      monthlyRate: formValues.monthlyRate
    }

    const vehicle: Vehicle = {
      brand: this.segregateString(formValues.vehiclename)[0],
      model: this.segregateString(formValues.vehiclename)[1],
      modelYear: this.segregateString(formValues.vehiclename)[2],
      vin: formValues.vin, // Assuming you want a constant value for "vin"
      price: formValues.price // Assuming you want a constant value for "price"
    }
    transformedData.vehicle = vehicle

    const customer: Customer = {
      id: null,
      firstName: this.segregateString(formValues.customername)[0],
      lastName: this.segregateString(formValues.customername)[0],
      birthDate: this.birtdate // Assuming you want a constant value for "birthDate"
    }
    transformedData.customer = customer
    return transformedData
  }

  Saveuser (): void {
    const formValues = this.myform.value
    const transformedData = this.transformFormValues(formValues)
    const customerObservable$: Observable<any> = this.customer.AddCustomer(transformedData.customer)
    const vehicleObservable$: Observable<any> = this.vehicle.addVehicle(transformedData.vehicle)

    forkJoin([customerObservable$, vehicleObservable$]).pipe(
      switchMap(([firstResult, secondResult]) => {
        transformedData.customer.id = firstResult.id
        transformedData.vehicle.id = secondResult.id
        return this.service.AddLeasingContract(transformedData)
      })).subscribe(res => {
      this.snackbarService.openSnackBar('Record inserted successfully', 'Close', 'success-snackbar')
      this.closepopup()
    })
  }

  formatDateToArray (inputDate: string | null): number[] | null {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!inputDate) {
      // If inputDate is null or undefined, return null
      return null
    }

    const dateObject = new Date(inputDate)
    if (isNaN(dateObject.getTime())) {
      // Invalid input date, return null
      return null
    }

    const year = dateObject.getFullYear()
    const month = dateObject.getMonth() + 1 // JavaScript months are zero-based
    const day = dateObject.getDate()

    return [year, month, day]
  }

  segregateString (inputString: string): string[] {
    return inputString.split(' ')
  }

  ngOnDestroy (): void {
    // Unsubscribe from the subscription to prevent memory leaks.
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
