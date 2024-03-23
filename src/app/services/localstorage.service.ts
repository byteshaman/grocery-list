import { Injectable } from '@angular/core';
import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() { }


  // Set a value in local storage
  setItem(key: string, value: Product[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get a value from local storage
  getItem(key: string): Product[] | null {
    return JSON.parse(localStorage.getItem(key));
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }
}