/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../enviornment'
import { Observable } from 'rxjs'
import { CustomerEdit } from '../Model/customer'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor (private http: HttpClient) { }

  AddCustomer (data: CustomerEdit): Observable<CustomerEdit> {
    return this.http.post<CustomerEdit>(environment.baseUrl + 'customer/', data)
  }

  EditCustomer (data: CustomerEdit, id: number): Observable<CustomerEdit> {
    return this.http.put<CustomerEdit>(environment.baseUrl + 'customer/' + id, data)
  }

  DeleteCustomer (id: number): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'customer/' + id)
  }

  GetCustomerbyId (code: string): Observable<CustomerEdit> {
    return this.http.get<CustomerEdit>(environment.baseUrl + 'customer/' + code)
  }
}
