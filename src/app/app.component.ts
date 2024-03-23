import { Component } from '@angular/core';
import { PickListModule, PickListMoveToSourceEvent, PickListMoveToTargetEvent } from 'primeng/picklist';
import { products } from './data/products.data';
import { Product } from './interfaces/interfaces';
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

  // onListCheckboxChange(event: any): void {
  //   console.log(event);
  // }

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

  getPrice(p: Product, shop: 'cf' | 'basko'): string {
    const price: string = p[shop].price ? ` ${this.getKgPrice(p, shop)}€` : 'N/A';
    const brand: string = p[shop].brand ? ` (${p[shop].brand})` : '';


    return `${brand}: ${price}`;
  }

  getKgPrice(p: Product, shop: 'cf' | 'basko'): string {
    return (1000 / p[shop].qty * p[shop].price).toFixed(2);
  }

  getClass(p: Product, shop: 'cf' | 'basko'): string {
    // Current shop has no price, other one is better
    if (!p[shop].price) {
      return 'red';
    } 

    const otherShop: 'cf' | 'basko' = shop === 'basko' ? 'cf' : 'basko';

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

  updateLocalStorageAfterMove(): void {
    this.localStorageService.setItem('sourceProducts', this.sourceProducts);
    this.localStorageService.setItem('targetProducts', this.targetProducts);
  }

  // onMoveToSource(ev: PickListMoveToSourceEvent): void {
  //   ev.items.forEach(item => {
  //     const idx: number = this.targetProducts.findIndex(p => p.name === item.name);
  //     this.sourceProducts.push(this.targetProducts.splice(idx, 1)[0]);
  //   });

  //   this.updateLocalStorageAfterMove();
  // }
}
