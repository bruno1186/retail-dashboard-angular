import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CartItem, Product, SalesKpis } from './models';

/**
 * Carrinho de compras reativo. Mantem os itens em um BehaviorSubject e
 * expoe KPIs derivados (RxJS map) para o dashboard consumir.
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly items = new BehaviorSubject<CartItem[]>([]);
  readonly items$: Observable<CartItem[]> = this.items.asObservable();

  readonly kpis$: Observable<SalesKpis> = this.items$.pipe(map(computeKpis));

  add(product: Product, quantity = 1): void {
    if (quantity <= 0) {
      return;
    }
    const current = this.items.value.slice();
    const index = current.findIndex((i) => i.product.id === product.id);
    if (index >= 0) {
      current[index] = { ...current[index], quantity: current[index].quantity + quantity };
    } else {
      current.push({ product, quantity });
    }
    this.items.next(current);
  }

  remove(productId: string): void {
    this.items.next(this.items.value.filter((i) => i.product.id !== productId));
  }

  setQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    this.items.next(
      this.items.value.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
  }

  clear(): void {
    this.items.next([]);
  }

  snapshot(): CartItem[] {
    return this.items.value;
  }
}

/** Calcula os KPIs de vendas a partir dos itens do carrinho. */
export function computeKpis(items: CartItem[]): SalesKpis {
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.product.price, 0);
  const distinctProducts = items.length;
  const averageTicket = distinctProducts === 0 ? 0 : subtotal / distinctProducts;
  return {
    totalItems,
    distinctProducts,
    subtotal: round2(subtotal),
    averageTicket: round2(averageTicket),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
