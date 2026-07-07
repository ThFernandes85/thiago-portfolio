// AquaCascata — shared cart, navigation and UI behaviour (vanilla JS, no build step)

const CART_KEY = 'aquacascata_cart';
const PRODUCT = {
  id: 'cascata-premium',
  name: 'Cascata de Piscina Premium',
  price: 549.90,
  img: 'assets/waterfall-1.svg',
};

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

function addToCart(qty) {
  const cart = getCart();
  const existing = cart.find(item => item.id === PRODUCT.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...PRODUCT, qty });
  }
  saveCart(cart);
  openCartDrawer();
}

function removeFromCart(id) {
  saveCart(getCart().filter(item => item.id !== id));
}

function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderCart() {
  const cart = getCart();
  const countEl = document.getElementById('cartCount');
  const itemsEl = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('cartSubtotal');

  if (countEl) {
    countEl.textContent = cart.reduce((n, item) => n + item.qty, 0);
  }

  if (itemsEl) {
    if (cart.length === 0) {
      itemsEl.innerHTML = '<div class="cart-empty">Seu carrinho está vazio.</div>';
    } else {
      itemsEl.innerHTML = cart.map(item => `
        <div class="cart-line" data-id="${item.id}">
          <img src="${item.img}" alt="${item.name}">
          <div>
            <p class="name">${item.name}</p>
            <span class="price">${formatBRL(item.price)}</span>
            <div style="color:var(--text-muted);font-size:13px;margin-top:4px;">Qtd: ${item.qty}</div>
          </div>
          <button class="remove" data-remove="${item.id}">✕</button>
        </div>
      `).join('');
    }
  }

  if (subtotalEl) {
    subtotalEl.textContent = formatBRL(cartTotal(cart));
  }

  document.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.remove));
  });
}

function openCartDrawer() {
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
}

function closeCartDrawer() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle?.addEventListener('click', () => mainNav.classList.toggle('open'));

  // Cart drawer open/close
  document.getElementById('cartOpenBtn')?.addEventListener('click', openCartDrawer);
  document.getElementById('cartCloseBtn')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCartDrawer);

  // Coupon (demo only — always shows the same friendly message)
  document.getElementById('couponBtn')?.addEventListener('click', () => {
    const input = document.getElementById('couponInput');
    if (input.value.trim()) {
      alert('Cupom aplicado nesta demonstração é ilustrativo. Em produção, validado contra a plataforma de e-commerce.');
    }
  });

  // Quantity selector on product page
  const qtyValue = document.getElementById('qtyValue');
  document.getElementById('qtyMinus')?.addEventListener('click', () => {
    const next = Math.max(1, parseInt(qtyValue.textContent, 10) - 1);
    qtyValue.textContent = next;
  });
  document.getElementById('qtyPlus')?.addEventListener('click', () => {
    const next = parseInt(qtyValue.textContent, 10) + 1;
    qtyValue.textContent = next;
  });
  document.getElementById('addToCartBtn')?.addEventListener('click', () => {
    addToCart(parseInt(qtyValue.textContent, 10));
  });

  // Gallery thumbnails
  document.querySelectorAll('.gallery-thumbs button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('galleryMainImg').src = btn.dataset.img;
      document.querySelectorAll('.gallery-thumbs button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Accordions
  document.querySelectorAll('[data-accordion]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      trigger.closest('.accordion-item').classList.toggle('open');
    });
  });
});
