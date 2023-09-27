/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, Inject, inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { vehicleService } from 'src/app/service/vehicle.service'
import { SnackbarService } from '../../../service/snackbar.service'
import { MatButtonModule } from '@angular/material/button'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-delete-vehicle',
  templateUrl: './delete-vehicle.component.html',
  styleUrls: ['./delete-vehicle.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class DeleteVehicleComponent {
  constructor (
    public dialogRef: MatDialogRef<DeleteVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  private readonly subscription: Subscription | undefined
  private readonly service = inject(vehicleService)
  private readonly snackbarService = inject(SnackbarService)
  onConfirm (): void {
    // Close the dialog with true, indicating a confirmation.
    this.service.deleteVehicle(this.data.code).subscribe(res => {
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
