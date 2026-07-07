// AquaCascata — checkout page: order summary, payment toggle, validation, simulated order creation

const SHIPPING = 20.0;
const ORDERS_KEY = 'aquacascata_orders';

function renderOrderSummary() {
  const cart = getCart();
  const summaryEl = document.getElementById('orderSummary');
  const totalEl = document.getElementById('orderTotal');
  const emptyEl = document.getElementById('checkoutEmpty');
  const form = document.getElementById('checkoutForm');

  if (cart.length === 0) {
    emptyEl?.classList.remove('hidden');
    form?.classList.add('hidden');
    return;
  }

  summaryEl.innerHTML = cart.map(item => `
    <div class="cart-line">
      <img src="${item.img}" alt="${item.name}">
      <div>
        <p class="name">${item.name} × ${item.qty}</p>
        <span class="price">${formatBRL(item.price * item.qty)}</span>
      </div>
    </div>
  `).join('');

  const total = cartTotal(cart) + SHIPPING;
  totalEl.textContent = formatBRL(total);
}

function validateField(input) {
  const field = input.closest('.field');
  const valid = input.value.trim().length > 1;
  field.classList.toggle('error', !valid);
  return valid;
}

function generateOrderId() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();

  // Payment method toggle
  const optCard = document.getElementById('optCard');
  const optPix = document.getElementById('optPix');
  document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', () => {
      optCard.classList.toggle('selected', radio.value === 'cartao' && radio.checked);
      optPix.classList.toggle('selected', radio.value === 'pix' && radio.checked);
    });
  });
  [optCard, optPix].forEach(opt => {
    opt.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        opt.querySelector('input[type=radio]').checked = true;
        opt.querySelector('input[type=radio]').dispatchEvent(new Event('change'));
      }
    });
  });

  const form = document.getElementById('checkoutForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const requiredFields = ['fName', 'fContact', 'fAddress', 'fCep'].map(id => document.getElementById(id));
    const allValid = requiredFields.map(validateField).every(Boolean);
    if (!allValid) return;

    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const cart = getCart();
    const total = cartTotal(cart) + SHIPPING;
    const orderId = generateOrderId();

    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '{}');
    orders[orderId] = {
      createdAt: new Date().toISOString(),
      items: cart,
      total,
      paymentMethod,
      customer: {
        name: document.getElementById('fName').value,
        contact: document.getElementById('fContact').value,
        address: document.getElementById('fAddress').value,
        cep: document.getElementById('fCep').value,
      },
    };
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    localStorage.removeItem(CART_KEY);

    window.location.href = `obrigado.html?pedido=${orderId}`;
  });
});
