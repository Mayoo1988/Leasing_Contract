/* eslint-disable @typescript-eslint/no-floating-promises */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { TestBed } from '@angular/core/testing'
import { MasterService } from './master.service'
import { contractData } from '../server/contract'
import { environment } from '../../enviornment'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { customerData } from '../server/customer'
import { vehicleData } from '../server/vehicle'

describe('contractService', () => {
  let masterservice: MasterService,
    httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MasterService
      ]
    })
    masterservice = TestBed.get((MasterService))
    httpTestingController = TestBed.get(HttpTestingController)
  })
  it('should retrieve all contracts', () => {
    const PageIndex: number = 1; const Pagesize: number = 1
    masterservice.getLeasingContract(Pagesize, PageIndex).subscribe((contract => {
      expect(contractData).toBeTruthy('No contract returned')
      expect(contractData.length).toBe(2, 'incorrect number of contract')
      const contractvalue = contractData.find(contractvalue => contractvalue.contractNumber === 'A12')
      expect(contractvalue?.monthlyRate).toBe('370.00')
    }))
    const req = httpTestingController.expectOne(environment.baseUrl + `contractoverviews?page=${PageIndex}&size=${Pagesize}`)
    expect(req.request.method).toEqual('GET')
    req.flush(contractData)
  })
  it('should retrieve all customers', () => {
    const PageIndex: number = 1; const Pagesize: number = 1
    masterservice.getCustomer(Pagesize, PageIndex).subscribe((contract => {
      expect(customerData).toBeTruthy('No customer returned')
      expect(customerData.length).toBe(3, 'incorrect number of customers')
    }))
    const req = httpTestingController.expectOne(environment.baseUrl + `customers?page=${PageIndex}&size=${Pagesize}`)
    expect(req.request.method).toEqual('GET')
    req.flush(customerData)
  })
  it('should retrieve all vehicles', () => {
    const PageIndex: number = 1; const Pagesize: number = 1
    masterservice.getVehicle(Pagesize, PageIndex).subscribe((contract => {
      expect(vehicleData).toBeTruthy('No vehicle returned')
      expect(vehicleData.length).toBe(2, 'incorrect number of vehicles')
    }))
    const req = httpTestingController.expectOne(environment.baseUrl + `vehicles?page=${PageIndex}&size=${Pagesize}`)
    expect(req.request.method).toEqual('GET')
    req.flush(vehicleData)
  })
  afterEach(() => {
    httpTestingController.verify()
  })
})
