/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Observable, of } from 'rxjs'
import { type Customer } from '../Model/customer'
import { customerData } from '../server/customer'
import { vehicle } from '../Model/vehicle'
import { vehicleData } from '../server/vehicle'
import { ContractItem } from '../Model/Master'
import { contractDetail } from '../server/contract'

export function setupCustomer (): Observable<{ numberOfItems: number, overviewItems: Customer[] }> {
  const customerArray: Customer[] = Object.values(customerData)
  const numberOfItems: number = customerArray.length

  const result = {
    numberOfItems,
    overviewItems: customerArray
  }

  // Return the result as an observable
  return of(result)
}

export function setupVehicle (): Observable<{ numberOfItems: number, overviewItems: vehicle[] }> {
  const vehicleArray: vehicle[] = Object.values(vehicleData)
  const numberOfItems: number = vehicleArray.length

  const result = {
    numberOfItems,
    overviewItems: vehicleArray
  }

  // Return the result as an observable
  return of(result)
}

export function setupContract (): Observable<{ numberOfItems: number, overviewItems: ContractItem[] }> {
  const contractArray: ContractItem[] = Object.values(contractDetail)
  const numberOfItems: number = contractArray.length

  const result = {
    numberOfItems,
    overviewItems: contractArray
  }

  // Return the result as an observable
  return of(result)
}
