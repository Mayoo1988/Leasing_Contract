export interface vehicle {
  id?: number | null
  brand?: string
  model?: string
  modelYear?: number
  vin?: string
  price?: number
}

export interface Vehicle {
  brand: string
  model: string
  modelYear: string
  vin: string
  price: number
}
