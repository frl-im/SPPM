import { Car, Inquiry } from '@/types/car'
import { carsData } from '@/data/cars'

const CAR_STORAGE_KEY = 'sppm-cars'
const INQUIRY_STORAGE_KEY = 'sppm-inquiries'

function readFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getStoredCars(): Car[] {
  const storedCars = readFromStorage<Car[]>(CAR_STORAGE_KEY, [])
  return storedCars.length > 0 ? storedCars : carsData
}

export function saveCars(cars: Car[]) {
  saveToStorage(CAR_STORAGE_KEY, cars)
}

export function getStoredInquiries(): Inquiry[] {
  return readFromStorage<Inquiry[]>(INQUIRY_STORAGE_KEY, [])
}

export function saveInquiries(inquiries: Inquiry[]) {
  saveToStorage(INQUIRY_STORAGE_KEY, inquiries)
}
