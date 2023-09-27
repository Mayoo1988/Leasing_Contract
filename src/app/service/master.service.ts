/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Contract, ContractEdit, ContractItem } from '../Model/Master'
import { Customer } from '../Model/customer'
import { Vehicle } from '../Model/vehicle'
import { environment } from '../../enviornment'
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor (private http: HttpClient) { }

  getLeasingContract (Pagesize: number, PageIndex: number): Observable<{ numberOfItems: number, overviewItems: ContractItem[] }> {
    return this.http.get< { numberOfItems: number, overviewItems: ContractItem[] }>(environment.baseUrl + `contractoverviews?page=${PageIndex}&size=${Pagesize}`)
  }

  getCustomer (Pagesize: number, PageIndex: number): Observable<{ numberOfItems: number, overviewItems: Customer[] }> {
    return this.http.get<{ numberOfItems: number, overviewItems: Customer[] }>(environment.baseUrl + `customers?page=${PageIndex}&size=${Pagesize}`)
  }

  Savecontract (data: ContractEdit, id: number): Observable<ContractEdit> {
    return this.http.put<ContractEdit>(environment.baseUrl + 'contract/' + id, data)
  }

  AddLeasingContract (data: Contract): Observable<Contract> {
    return this.http.post<Contract>(environment.baseUrl + 'contract/', data)
  }

  DeleteContract (id: any): Observable<any> {
    return this.http.delete(environment.baseUrl + 'contract/' + id)
  }

  GetContractbycode (code: string): Observable<ContractEdit> {
    return this.http.get<ContractEdit>(environment.baseUrl + 'contract/' + code)
  }

  GetCustomerbyId (code: any): Observable<any> {
    return this.http.get(environment.baseUrl + 'customer/' + code)
  }

  getVehicle (Pagesize: number, PageIndex: number): Observable<{ numberOfItems: number, overviewItems: Vehicle[] }> {
    return this.http.get< { numberOfItems: number, overviewItems: Vehicle[] }>(environment.baseUrl + `vehicles?page=${PageIndex}&size=${Pagesize}`)
  }
}
