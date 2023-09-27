/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { vehicle } from '../Model/vehicle'
import { environment } from '../../enviornment'

@Injectable({
  providedIn: 'root'
})
export class vehicleService {
  constructor (private http: HttpClient) { }

  addVehicle (data: vehicle): Observable<vehicle> {
    return this.http.post<vehicle>(environment.baseUrl + 'vehicle/', data)
  }

  editVehicle (data: vehicle, id: number): Observable<vehicle> {
    return this.http.put<vehicle>(environment.baseUrl + 'vehicle/' + id, data)
  }

  deleteVehicle (id: number): Observable<vehicle> {
    return this.http.delete(environment.baseUrl + 'vehicle/' + id)
  }

  getVehiclebyId (code: string): Observable<vehicle> {
    return this.http.get(environment.baseUrl + 'vehicle/' + code)
  }

  getVehicle (Pagesize: number, PageIndex: number): Observable<{ numberOfItems: number, overviewItems: vehicle[] }> {
    return this.http.get<{ numberOfItems: number, overviewItems: vehicle[] }>(environment.baseUrl + `vehicles?page=${PageIndex}&size=${Pagesize}`)
  }
}
