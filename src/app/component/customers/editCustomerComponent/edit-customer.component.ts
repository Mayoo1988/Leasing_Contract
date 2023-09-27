/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, Inject, inject } from '@angular/core'
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { CustomerService } from 'src/app/service/customer.service'
import { CustomerEdit } from '../../../Model/customer'
import { SnackbarService } from '../../../service/snackbar.service'
import { CommonModule, DatePipe, NgIf } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatNativeDateModule } from '@angular/material/core'
import { Observable, map } from 'rxjs'

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatNativeDateModule, NgIf, CommonModule]
})
export class EditCustomerComponent {
  inputdata: any
  editdata: any
  closemessage = 'closed using directive'
  customer!: CustomerEdit
  customersedit$!: Observable<CustomerEdit>
  addCustomer$!: Observable<CustomerEdit>
  myform: any
  constructor (@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditCustomerComponent>, private buildr: FormBuilder) {

  }

  private readonly service = inject(CustomerService)
  private readonly snackbarService = inject(SnackbarService)
  private readonly datePipe = inject(DatePipe)
  ngOnInit (): void {
    this.myform = this.buildr.group({
      id: this.buildr.control(''),
      firstName: this.buildr.control('', Validators.required),
      lastName: this.buildr.control('', Validators.required),
      birthDate: [null as Date | null]
    })
    this.inputdata = this.data
    if (this.inputdata.code > 0) {
      this.setpopupdata(this.inputdata.code)
    }
  }

  setpopupdata (code: string): void {
    this.customersedit$ = this.service.GetCustomerbyId(code).pipe(
      map((customereditdata) => {
        // Populate the form controls when data is available
        this.myform.patchValue({
          id: customereditdata.id,
          firstName: customereditdata.firstName,
          lastName: customereditdata.lastName,
          birthDate: customereditdata.birthDate ? new Date(customereditdata.birthDate) : null
        })
        return customereditdata
      })
    )
  }

  closepopup (): void {
    this.ref.close('Closed using function')
  }

  // Mapping function to transform the form values to the desired format
  transformFormValues (formValues: any): any {
    const transformedData: any = []

    this.customer = {
      id: formValues.id,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      birthDate: formValues.birthDate ?? null // Assuming you want a constant value for "birthDate"
    }

    transformedData.customer = this.customer

    return transformedData
  }

  Saveuser (): void {
    if (this.myform.valid) {
      if (this.inputdata.title === 'Add Customer') {
        const formValues = this.myform.value
        this.customer = {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          birthDate: formValues.birthDate
        }
        this.customersedit$ = this.service.AddCustomer(this.customer).pipe(
          map((customersedit) => {
            this.snackbarService.openSnackBar('Record inserted successfully', 'Close', 'success-snackbar')
            this.closepopup()
            return customersedit
          }))
      } else {
        const formValues = this.myform.value
        const transformedData = this.transformFormValues(formValues)
        this.customersedit$ = this.service.EditCustomer(transformedData.customer, transformedData.customer.id).pipe(
          map((customersedit) => {
            this.snackbarService.openSnackBar('Record edited successfully', 'Close', 'success-snackbar')
            this.closepopup()
            return customersedit
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
