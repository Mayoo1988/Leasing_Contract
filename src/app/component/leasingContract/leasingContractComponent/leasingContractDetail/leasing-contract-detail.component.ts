/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, Inject, OnInit, inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { MasterService } from 'src/app/service/master.service'
import { MatButtonModule } from '@angular/material/button'
import { Observable, map } from 'rxjs'
import { ContractEdit } from 'src/app/Model/Master'
import { CommonModule, NgIf } from '@angular/common'

@Component({
  selector: 'app-leasing-contract-detail',
  templateUrl: './leasing-contract-detail.component.html',
  styleUrls: ['./leasing-contract-detail.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, NgIf]
})
export class LeasingContractDetailComponent implements OnInit {
  inputdata: any
  custdata: any
  contractdetail$!: Observable<ContractEdit>
  constructor (@Inject(MAT_DIALOG_DATA) public data: any, private readonly ref: MatDialogRef<LeasingContractDetailComponent>) {

  }

  private readonly service = inject(MasterService)
  ngOnInit (): void {
    this.inputdata = this.data
    if (this.inputdata.code > 0) {
      this.contractdetail$ = this.service.GetContractbycode(this.inputdata.code).pipe(
        map((contractedit) => {
          return contractedit
        }))
    }
  }

  closepopup (): void {
    this.ref.close('closing from detail')
  }
}
