/* eslint-disable @typescript-eslint/no-floating-promises */
import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { vehicleService } from './vehicle.service'
import { vehicleData } from '../server/vehicle'
import { environment } from 'src/enviornment'

describe('vehicleService', () => {
  let vehicleservice: vehicleService,
    httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        vehicleService
      ]
    })
    vehicleservice = TestBed.get((vehicleService))
    httpTestingController = TestBed.get(HttpTestingController)
  })
  it('should retrieve vehicle by id', () => {
    const code: string = '11'
    vehicleservice.getVehiclebyId('11').subscribe((vehicle => {
      expect(vehicleData).toBeTruthy('No vehicle returned')
      expect(vehicleData.length).toBe(2, 'incorrect number of vehicle')
      const foundvehicle = vehicleData.find((vehicleData) => vehicleData.brand === 'BMW')
      expect(foundvehicle?.model).toBe('X4')
    }))
    const req = httpTestingController.expectOne(environment.baseUrl + 'vehicle/' + code)
    expect(req.request.method).toEqual('GET')
    req.flush(vehicleData)
  })
})
