import { CartService, computeKpis } from './cart.service';
import { Product } from './models';

const p = (id: string, price: number): Product => ({
  id,
  name: 'Produto ' + id,
  category: 'Cat',
  price,
  stock: 10,
});

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    service = new CartService();
  });

  it('inicia vazio', () => {
    expect(service.snapshot()).toEqual([]);
  });

  it('adiciona um produto', () => {
    service.add(p('p1', 10));
    expect(service.snapshot().length).toBe(1);
    expect(service.snapshot()[0].quantity).toBe(1);
  });

  it('incrementa quantidade quando o mesmo produto e adicionado', () => {
    service.add(p('p1', 10));
    service.add(p('p1', 10), 2);
    expect(service.snapshot()[0].quantity).toBe(3);
  });

  it('ignora quantidade nao positiva', () => {
    service.add(p('p1', 10), 0);
    expect(service.snapshot()).toEqual([]);
  });

  it('remove um produto', () => {
    service.add(p('p1', 10));
    service.add(p('p2', 20));
    service.remove('p1');
    expect(service.snapshot().map((i) => i.product.id)).toEqual(['p2']);
  });

  it('setQuantity para zero remove o item', () => {
    service.add(p('p1', 10));
    service.setQuantity('p1', 0);
    expect(service.snapshot()).toEqual([]);
  });

  it('emite KPIs via kpis$', (done) => {
    service.add(p('p1', 10), 2);
    service.add(p('p2', 30), 1);
    service.kpis$.subscribe((kpis) => {
      expect(kpis.totalItems).toBe(3);
      expect(kpis.distinctProducts).toBe(2);
      expect(kpis.subtotal).toBe(50);
      expect(kpis.averageTicket).toBe(25);
      done();
    });
  });
});

describe('computeKpis', () => {
  it('retorna zeros para carrinho vazio', () => {
    expect(computeKpis([])).toEqual({
      totalItems: 0,
      distinctProducts: 0,
      subtotal: 0,
      averageTicket: 0,
    });
  });

  it('arredonda subtotal com 2 casas', () => {
    const kpis = computeKpis([{ product: p('p1', 10.333), quantity: 3 }]);
    expect(kpis.subtotal).toBe(31);
  });
});
