# retail-dashboard-angular

![CI](https://github.com/bruno1186/retail-dashboard-angular/actions/workflows/ci.yml/badge.svg)

Dashboard de **varejo** em **Angular 17** com **standalone components**, **TypeScript**
e **RxJS**. Exibe catalogo de produtos, carrinho reativo e **KPIs de vendas** (itens,
produtos distintos, subtotal e ticket medio) calculados em tempo real.

> Casos de uso de referencia: **varejo** (checkout / e-commerce) e **mobiletech**.

## Destaques tecnicos

- **Standalone components** (sem NgModules) e bootstrap via `bootstrapApplication`.
- **Estado reativo** com `BehaviorSubject` no `CartService`; KPIs derivados por
  operadores RxJS (`map`) e consumidos no template com o pipe `async`.
- **Logica de dominio testavel** isolada em `computeKpis`, coberta por testes unitarios.
- **Testes headless** (Jasmine/Karma + ChromeHeadless) rodando em CI.

## Estrutura

```
src/app/
  models.ts             # Product, CartItem, SalesKpis
  product.service.ts    # catalogo (mock in-memory, pronto p/ API REST)
  cart.service.ts       # carrinho reativo + computeKpis
  app.component.ts      # dashboard (standalone)
  *.spec.ts             # testes Jasmine
```

## Como rodar

```bash
npm install
npm start          # http://localhost:4200
npm run test:ci    # testes headless
npm run build
```

## KPIs calculados

| KPI | Definicao |
|-----|-----------|
| Itens | soma das quantidades no carrinho |
| Produtos | numero de produtos distintos |
| Subtotal | soma de `preco x quantidade` |
| Ticket medio | subtotal / produtos distintos |

## Stack

Angular 17 | TypeScript 5.4 | RxJS 7 | Jasmine | Karma | GitHub Actions
