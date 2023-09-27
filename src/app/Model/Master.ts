export interface ContractItem {
  contractId: number
  customerId: number
  customerName: string
  vehicleId: number
  vehicleName: string
  vin: string
  monthlyRate: number

}

export interface Contract {
  contractNumber: string
  monthlyRate: string
  vehicle: {
    id: number
    brand: string
    model: string
    modelYear: string
    vin: string
    price: number
  }
  customer: {
    id: number
    firstName: string
    lastName: string
    birthDate: number[]
  }
}

export interface ContractEdit {
  id: string
  monthlyRate: string
  vehicle: {
    id: number
    brand: string
    model: string
    modelYear: string
    vin: string
    price: number
  }
  customer: {
    id: number
    firstName: string
    lastName: string
    birthDate: number[]
  }
}

export interface ContractLength {
  numberOfPages: number
  numberOfItems: number
}
