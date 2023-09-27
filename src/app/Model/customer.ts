export interface Customer {
  id?: number | null
  firstName?: string | null
  lastName?: string | null
  birthDate?: number[] | null
}

export interface CustomerEdit {
  id?: number | null
  firstName?: string | null
  lastName?: string | null
  birthDate?: Date | null
}
