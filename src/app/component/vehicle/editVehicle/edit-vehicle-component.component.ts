/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Component, Inject, inject } from '@angular/core'
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { vehicleService } from 'src/app/service/vehicle.service'
import { SnackbarService } from '../../../service/snackbar.service'
import { CommonModule, DatePipe, NgIf } from '@angular/common'
import { vehicle } from 'src/app/Model/vehicle'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { Observable, map } from 'rxjs'

@Component({
  selector: 'app-edit-vehicle-component',
  templateUrl: './edit-vehicle-component.component.html',
  styleUrls: ['./edit-vehicle-component.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, NgIf, CommonModule]
})
export class EditVehicleComponent {
  inputdata: any
  editdata: any
  closemessage = 'closed using directive'
  myform: any
  vehicleedit$!: Observable<vehicle>
  vehicle!: vehicle/* eslint-disable @typescript-eslint/consistent-type-imports */
  constructor (@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditVehicleComponent>, private buildr: FormBuilder) {

  }

  private readonly service = inject(vehicleService)
  private readonly snackbarService = inject(SnackbarService)
  private readonly datePipe = inject(DatePipe)
  ngOnInit (): void {
    this.myform = this.buildr.group({
      id: this.buildr.control(''),
      brand: this.buildr.control('', Validators.required),
      model: this.buildr.control('', Validators.required),
      modelYear: this.buildr.control('', Validators.required),
      vin: this.buildr.control('', Validators.required),
      price: this.buildr.control('', Validators.required)
    })
    this.inputdata = this.data
    if (this.inputdata.code > 0) {
      this.setpopupdata(this.inputdata.code)
    }
  }

  setpopupdata (code: any): void {
    this.vehicleedit$ = this.service.getVehiclebyId(code).pipe(
      map((vehicleedit) => {
        // Populate the form controls when data is available
        this.myform.patchValue({
          id: vehicleedit.id,
          brand: vehicleedit.brand,
          model: vehicleedit.model,
          modelYear: vehicleedit.modelYear,
          vin: vehicleedit.vin,
          price: vehicleedit.price
        })
        return vehicleedit
      })
    )
  }

  closepopup (): void {
    this.ref.close('Closed using function')
  }

  // Mapping function to transform the form values to the desired format
  transformFormValues (formValues: any): any {
    const transformedData: any = []

    const vehicle: vehicle = {
      id: formValues.id,
      brand: formValues.brand,
      model: formValues.model,
      modelYear: formValues.modelYear,
      vin: formValues.vin,
      price: formValues.price
    }

    transformedData.vehicle = vehicle

    return transformedData
  }

  Saveuser (): void {
    if (this.myform.valid) {
      if (this.inputdata.title === 'Add Vehicle') {
        const formValues = this.myform.value
        this.vehicle = {
          id: null,
          brand: formValues.brand,
          model: formValues.model,
          modelYear: formValues.modelYear,
          vin: formValues.vin,
          price: formValues.price
        }
        this.vehicleedit$ = this.service.addVehicle(this.vehicle).pipe(
          map((vehicleedit) => {
            this.snackbarService.openSnackBar('Record inserted successfully', 'Close', 'success-snackbar')
            this.closepopup()
            return vehicleedit
          }))
      } else {
        const formValues = this.myform.value
        const transformedData = this.transformFormValues(formValues)
        this.vehicleedit$ = this.service.editVehicle(transformedData.vehicle, transformedData.vehicle.id).pipe(
          map((vehicleedit) => {
            this.snackbarService.openSnackBar('Record edited successfully', 'Close', 'success-snackbar')
            this.closepopup()
            return vehicleedit
          }))
      }
    }
  }

  formatBirthDate (birthDate: any): string {
    if (birthDate) {
      // Use the DatePipe to format the birth date (e.g., 'dd/MM/yyyy')
      return this.datePipe.transform(birthDate, 'dd/MM/yyyy') ?? ''
    }
    return ''
  }

  formatDateToArray (inputDate: string | null): number[] | null {
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
}
