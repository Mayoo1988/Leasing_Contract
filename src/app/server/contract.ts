/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Contract, ContractItem } from '../Model/Master'

export const contractData: Contract[] = [
  {
    contractNumber: 'A12',
    monthlyRate: '370.00',
    vehicle: {
      id: 10,
      brand: 'XLR',
      model: 'X4',
      modelYear: '2022',
      vin: 'A123456',
      price: 45300.00
    },
    customer: {
      id: 12, firstName: 'Rahul', lastName: 'Menon', birthDate: [1989, 1, 29]
    }
  },
  {
    contractNumber: 'A13',
    monthlyRate: '390.00',
    vehicle: {
      id: 11,
      brand: 'XLR',
      model: 'X3',
      modelYear: '2021',
      vin: 'A123456',
      price: 44300.00
    },
    customer: {
      id: 13, firstName: 'Mayur', lastName: 'Mane', birthDate: [1988, 1, 29]
    }
  }
]

export const contractDetail: ContractItem[] = [
  {
    contractId: 12,
    customerName: 'Mayur',
    monthlyRate: 300,
    vehicleId: 123,
    vehicleName: 'BMW',
    vin: 'A1234',
    customerId: 1
  },
  {
    contractId: 13,
    customerName: 'Mayur',
    monthlyRate: 300,
    vehicleId: 123,
    vehicleName: 'BMW',
    vin: 'A1234',
    customerId: 2
  }
]
