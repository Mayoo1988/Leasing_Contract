/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, Inject, inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { CustomerService } from 'src/app/service/customer.service'
import { SnackbarService } from '../../../service/snackbar.service'
import { MatButtonModule } from '@angular/material/button'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class DeleteCustomerComponent {
  constructor (
    public dialogRef: MatDialogRef<DeleteCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  private subscription: Subscription | undefined
  private readonly service = inject(CustomerService)
  private readonly snackbarService = inject(SnackbarService)
  onConfirm (): void {
    this.service.DeleteCustomer(this.data.code).subscribe(res => {
      this.snackbarService.openSnackBar('Record deleted successfully', 'Close', 'success-snackbar')
    })
    this.dialogRef.close(true)
  }

  onCancel (): void {
    // Close the dialog with false, indicating a cancellation.
    this.dialogRef.close(false)
  }

  ngOnDestroy (): void {
    // Unsubscribe from the subscription to prevent memory leaks.
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
