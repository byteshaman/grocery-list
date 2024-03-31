import { Component } from '@angular/core';
import { PickListModule } from 'primeng/picklist';
import { products } from './data/products.data';
import { Product, Shop } from './interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/localstorage.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PickListModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  products = products;
  sourceProducts: Product[];
  targetProducts: Product[];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    // Initialize source products in local storage
    if (this.localStorageService.getItem('sourceProducts')) {
      this.sourceProducts = this.localStorageService.getItem('sourceProducts');
    } else {
      this.sourceProducts = products;
      this.localStorageService.setItem('sourceProducts', products);
    }

    // Initialize target products in local storage
    if (this.localStorageService.getItem('targetProducts')) {
      this.targetProducts = this.localStorageService.getItem('targetProducts');
    } else {
      this.targetProducts = [];
      this.localStorageService.setItem('targetProducts', []);
    }
  }

  getClass(p: Product, shop: Shop): string {
    // Current shop has no price, other one is better
    if (!p[shop].price) {
      return 'red';
    }

    const otherShop: Shop = shop === 'basko' ? 'cf' : 'basko';

    // Other shop has no price, current shop is the best one
    if (!p[otherShop].price) {
      return 'green';
    }

    // Get the proper class when both shops have a proper price
    if (this.getKgPrice(p, shop) < this.getKgPrice(p, otherShop)) {
      return 'green';
    } else if (this.getKgPrice(p, shop) > this.getKgPrice(p, otherShop)) {
      return 'red'
    } else {
      return '';
    }
  }

  getKgPrice(p: Product, shop: Shop): string {
    return (1000 / p[shop].qty * p[shop].price).toFixed(2);
  }

  getInfo(p: Product, shop: Shop): string {
    const price: string = p[shop].price ? ` ${this.getKgPrice(p, shop)}€` : 'N/A';
    const brand: string = p[shop].brand ? ` (${p[shop].brand})` : '';

    return `${brand}: ${price}`;
  }

  updateLocalStorageAfterMove(): void {
    this.localStorageService.setItem('sourceProducts', this.sourceProducts);
    this.localStorageService.setItem('targetProducts', this.targetProducts);
  }
}
