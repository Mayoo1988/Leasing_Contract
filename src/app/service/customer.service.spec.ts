/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { TestBed } from '@angular/core/testing'
import { CustomerService } from './customer.service'
import { CustomerEdit } from '../Model/customer'
import { environment } from '../../enviornment'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { customerData } from '../server/customer'

describe('customerService', () => {
  let customerservice: CustomerService,
    httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CustomerService
      ]
    })
    customerservice = TestBed.get((CustomerService))
    httpTestingController = TestBed.get(HttpTestingController)
  })
  it('should retrieve customer by id', () => {
    const code: string = '11'
    customerservice.GetCustomerbyId('11').subscribe((contract => {
      expect(customerData).toBeTruthy('No customer returned')
      expect(customerData.length).toBe(3, 'incorrect number of customers')
      const foundCustomer = customerData.find((customer) => customer.id === 11)
      expect(foundCustomer?.firstName).toBe('Mayur')
    }))
    const req = httpTestingController.expectOne(environment.baseUrl + 'customer/' + code)
    expect(req.request.method).toEqual('GET')
    req.flush(customerData)
  })
  it('should edit customer details by id', () => {
    const changes: CustomerEdit = {
      firstName: 'Mayur', lastName: 'Mane', birthDate: new Date(1989, 5, 29)
    }
    customerservice.EditCustomer(changes, 11).subscribe((customer => {
      expect(customer).toEqual(changes)
    }))
    const req = httpTestingController.expectOne(environment.baseUrl + 'customer/' + 11)
    expect(req.request.method).toEqual('PUT')
    req.flush({ ...changes })
  })
})
