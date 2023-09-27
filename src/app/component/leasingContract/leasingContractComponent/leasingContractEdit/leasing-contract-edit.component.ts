/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/consistent-type-imports */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Component, Inject, OnInit, inject } from '@angular/core'
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { MasterService } from 'src/app/service/master.service'
import { Customer } from '../../../../Model/customer'
import { Vehicle } from '../../../../Model/vehicle'
import { SnackbarService } from '../../../../service/snackbar.service'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { Observable, map } from 'rxjs'
import { ContractEdit } from 'src/app/Model/Master'
import { CommonModule, NgIf } from '@angular/common'

@Component({
  selector: 'app-leasing-contract-edit',
  templateUrl: './leasing-contract-edit.component.html',
  styleUrls: ['./leasing-contract-edit.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, NgIf]
})
export class LeasingContractEditComponent implements OnInit {
  inputdata: any
  editdata: any
  birtdate: number[] = [1998, 5, 13]
  namelist !: string[]
  closemessage = 'closed using directive'
  contractedit$!: Observable<ContractEdit>
  myform: any
  constructor (@Inject(MAT_DIALOG_DATA) public data: any, private readonly ref: MatDialogRef<LeasingContractEditComponent>, private readonly buildr: FormBuilder) {

  }

  private readonly service = inject(MasterService)
  private readonly snackbarService = inject(SnackbarService)
  ngOnInit (): void {
    this.myform = this.buildr.group({
      contractNo: this.buildr.control('', Validators.required),
      monthlyRate: this.buildr.control('', Validators.required),
      firstname: this.buildr.control('', Validators.required),
      lastName: this.buildr.control('', Validators.required),
      brand: this.buildr.control('', Validators.required),
      model: this.buildr.control('', Validators.required),
      year: this.buildr.control('', Validators.required),
      vin: this.buildr.control('', Validators.required),
      price: this.buildr.control('', Validators.required)
    })
    this.inputdata = this.data
    if (this.inputdata.code > 0) {
      this.setpopupdata(this.inputdata.code)
    }
  }

  setpopupdata (code: any): void {
    this.contractedit$ = this.service.GetContractbycode(code).pipe(
      map((contractedit) => {
        console.log(contractedit)
        // Populate the form controls when data is available
        this.myform.patchValue({
          contractNo: contractedit.id,
          monthlyRate: contractedit.monthlyRate,
          firstname: contractedit.customer.firstName,
          lastName: contractedit.customer.lastName,
          birthDate: contractedit.customer.birthDate,
          brand: contractedit.vehicle.brand,
          model: contractedit.vehicle.model,
          year: contractedit.vehicle.modelYear,
          vin: contractedit.vehicle.vin,
          price: contractedit.vehicle.price
        })
        return contractedit
      })
    )
  }

  closepopup (): void {
    this.ref.close('Closed using function')
  }

  // Mapping function to transform the form values to the desired format
  transformFormValues (formValues: any): any {
    const transformedData: any = {
      contractNumber: formValues.contractNo,
      monthlyRate: formValues.monthlyRate
    }

    const vehicle: Vehicle = {
      brand: formValues.brand,
      model: formValues.model,
      modelYear: formValues.year,
      vin: formValues.vin, // Assuming you want a constant value for "vin"
      price: formValues.price // Assuming you want a constant value for "price"
    }

    transformedData.vehicle = vehicle

    const customer: Customer = {
      id: null,
      firstName: formValues.firstname,
      lastName: formValues.lastName,
      birthDate: this.birtdate
    }
    transformedData.customer = customer

    return transformedData
  }

  Saveuser (): void {
    if (this.myform.valid) {
      const formValues = this.myform.value
      const transformedData = this.transformFormValues(formValues)
      this.contractedit$ = this.service.Savecontract(transformedData, this.myform.value.contractNo).pipe(
        map((contractedit) => {
          this.snackbarService.openSnackBar('Record edited successfully', 'Close', 'success-snackbar')
          this.closepopup()
          return contractedit
        }))
    }
  }
}
