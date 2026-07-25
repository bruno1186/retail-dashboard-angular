import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './models';

/**
 * Catalogo de produtos. Em producao viria de uma API REST; aqui usa um
 * dataset em memoria para manter o app autocontido e testavel.
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly catalog: Product[] = [
    { id: 'p1', name: 'Cafe Especial 250g', category: 'Alimentos', price: 32.9, stock: 120 },
    { id: 'p2', name: 'Fone Bluetooth', category: 'Eletronicos', price: 199.9, stock: 45 },
    { id: 'p3', name: 'Camiseta Basica', category: 'Vestuario', price: 59.9, stock: 200 },
    { id: 'p4', name: 'Garrafa Termica', category: 'Casa', price: 89.5, stock: 60 },
    { id: 'p5', name: 'Teclado Mecanico', category: 'Eletronicos', price: 349.0, stock: 18 },
  ];

  list(): Observable<Product[]> {
    return of(this.catalog.slice());
  }

  byCategory(category: string): Observable<Product[]> {
    return of(this.catalog.filter((p) => p.category === category));
  }

  categories(): string[] {
    return Array.from(new Set(this.catalog.map((p) => p.category))).sort();
  }
}
