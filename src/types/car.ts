// Car type definition
export interface Car {
  id: string
  name: string
  model: string
  year: number
  price: number
  image: string
  description: string
  category: string
  color: string
  transmission: 'Manual' | 'Automatic'
  fuel: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric'
  mileage: number // in km
  features: string[]
  rating: number
  reviews: number
  isFeatured?: boolean
}

export interface Inquiry {
  id: string
  carId?: string
  carName?: string
  name: string
  email: string
  phone: string
  budget?: string
  message: string
  createdAt: string
  status: 'Baru' | 'Diproses' | 'Selesai'
}

export interface FilterOptions {
  category?: string
  priceMin?: number
  priceMax?: number
  fuel?: string
  transmission?: string
}
