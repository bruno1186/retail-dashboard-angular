import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { CartItem, Product, SalesKpis } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Retail Dashboard</h1>

      <section class="kpis">
        <div class="kpi"><h3>Itens</h3><strong>{{ (kpis$ | async)?.totalItems }}</strong></div>
        <div class="kpi"><h3>Produtos</h3><strong>{{ (kpis$ | async)?.distinctProducts }}</strong></div>
        <div class="kpi"><h3>Subtotal</h3><strong>R$ {{ (kpis$ | async)?.subtotal }}</strong></div>
        <div class="kpi"><h3>Ticket medio</h3><strong>R$ {{ (kpis$ | async)?.averageTicket }}</strong></div>
      </section>

      <h2>Catalogo</h2>
      <table>
        <thead><tr><th>Produto</th><th>Categoria</th><th>Preco</th><th></th></tr></thead>
        <tbody>
          <tr *ngFor="let p of products$ | async">
            <td>{{ p.name }}</td>
            <td>{{ p.category }}</td>
            <td>R$ {{ p.price }}</td>
            <td><button (click)="add(p)">Adicionar</button></td>
          </tr>
        </tbody>
      </table>

      <h2>Carrinho</h2>
      <table>
        <tbody>
          <tr *ngFor="let item of items$ | async">
            <td>{{ item.product.name }}</td>
            <td>x{{ item.quantity }}</td>
            <td><button (click)="remove(item.product.id)">Remover</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class AppComponent {
  readonly products$: Observable<Product[]>;
  readonly items$: Observable<CartItem[]>;
  readonly kpis$: Observable<SalesKpis>;

  constructor(
    private readonly cart: CartService,
    private readonly productService: ProductService,
  ) {
    this.products$ = this.productService.list();
    this.items$ = this.cart.items$;
    this.kpis$ = this.cart.kpis$;
  }

  add(product: Product): void {
    this.cart.add(product);
  }

  remove(productId: string): void {
    this.cart.remove(productId);
  }
}
