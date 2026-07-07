# Cascata de Piscina Premium — E-commerce Monoproduto (Demo)

Protótipo funcional de e-commerce monoproduto para venda de **cascatas para piscina residenciais**, construído para responder à proposta de freelance descrita no briefing do cliente. Serve como exemplo de trabalho e como base pronta para evoluir para produção.

**[Ver demo ao vivo »](../)** (ative o GitHub Pages do repositório, ou abra `index.html` localmente)

## O que está implementado

| Requisito do cliente | Status neste demo |
|---|---|
| Landing page monoproduto de alta conversão | ✅ Hero, prova social, benefícios, FAQ |
| Galeria de fotos/vídeos + specs técnicas + guia de instalação | ✅ Galeria com thumbnails, ficha técnica com diagrama, acordeão de instalação (placeholders — entram fotos/vídeos reais do cliente) |
| Pagamento com cartão e PIX | ⚠️ UI completa e funcional; processamento **simulado** (sem gateway real conectado) |
| Formulário de compra + e-mail de confirmação + acompanhamento de pedido | ✅ Checkout completo, página de confirmação com nº de pedido, página de rastreio (dados salvos no `localStorage` do navegador) |
| Design responsivo (mobile/tablet/desktop) | ✅ Testado em 390px, 768px e 1400px |
| SEO on-page ("cascata para piscina", "cascata para piscina residencial") | ✅ Title/description/keywords, Open Graph, `schema.org/Product` (JSON-LD) |
| Google Analytics 4 + Facebook Pixel | ✅ Scripts já incluídos em `index.html` — basta trocar os IDs de placeholder (`G-XXXXXXX` / `XXXXXXXXXXXXXXX`) pelos reais |
| Gestão de conteúdo pela equipe interna (CMS) | 📋 Ver seção "Caminho para produção" abaixo |

## Stack

HTML + CSS + JavaScript puro, sem build step — mesma abordagem simples do restante deste portfólio. Roda em qualquer hospedagem estática (GitHub Pages, Vercel, Netlify) sem configuração.

```
cascata-piscina-ecommerce/
├── index.html        landing page + produto + carrinho (drawer)
├── checkout.html      formulário de entrega + pagamento (cartão/PIX)
├── obrigado.html       confirmação de pedido
├── rastreio.html       acompanhamento de pedido (client-side)
├── css/styles.css
├── js/main.js          carrinho (localStorage), menu mobile, acordeões, galeria
├── js/checkout.js       validação do formulário e criação do pedido simulado
└── assets/              ilustrações SVG placeholder do produto
```

## Por que essa stack para a proposta

Para a proposta ao cliente, a recomendação de plataforma final é:

- **Shopify** se a prioridade é rapidez de lançamento e zero manutenção de infraestrutura — tem checkout com cartão e PIX (via apps como Mercado Pago/PagBrasil) prontos, e um CMS de produto muito simples para a equipe gerenciar fotos/descrição sem ajuda técnica.
- **WordPress + WooCommerce** se o cliente já tem preferência por WP ou quer menor custo recorrente — exige mais configuração inicial (plugin de PIX, otimização de performance), mas dá controle total do design e do SEO.

Este protótipo estático serve para validar rapidamente **layout, copy e fluxo de conversão** antes de investir na plataforma final — o design e a estrutura de conteúdo aqui podem ser recriados diretamente em um tema Shopify/WooCommerce.

## Caminho para produção (próximos passos reais)

1. **Fotos/vídeos reais** do produto no lugar dos SVGs placeholder em `assets/`.
2. **Pagamento real**: integrar Mercado Pago Checkout Pro (cartão + PIX nativo) ou o gateway equivalente da plataforma escolhida.
3. **E-mail transacional real**: disparo via a plataforma de e-commerce (Shopify/WooCommerce) ou serviço como Resend/SendGrid a partir de uma function serverless.
4. **Rastreamento de pedidos real**: substituir o `localStorage` por integração com o backend da plataforma escolhida.
5. **IDs reais** de Google Analytics 4 e Facebook Pixel (hoje como placeholder em `index.html`).
6. Migrar conteúdo para o CMS definitivo para que a equipe do cliente edite fotos/texto sem depender de desenvolvedor.

## Rodando localmente

```bash
cd cascata-piscina-ecommerce
python3 -m http.server 8000
# abrir http://localhost:8000
```
