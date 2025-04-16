// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Utilities
  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
  const setCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

  // Render products on shop page
  const renderProducts = () => {
    const productsContainer = document.querySelector(".product-container");
    if (!productsContainer) return;

    // Example products - You should replace with dynamic or backend content
    const products = [
      { id: 1, name: "T-Shirt", price: 29.99, image: "img/products/f1.jpg" },
      { id: 2, name: "Jeans", price: 49.99, image: "img/products/f2.jpg" },
      { id: 3, name: "Jacket", price: 79.99, image: "img/products/f3.jpg" },
    ];

    productsContainer.innerHTML = products.map((p) => `
      <div class="product">
        <img src="${p.image}" alt="${p.name}" />
        <h4>${p.name}</h4>
        <p>$${p.price.toFixed(2)}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `).join('');
  };

  // Add item to cart
  window.addToCart = (productId) => {
    const productMap = {
      1: { id: 1, name: "T-Shirt", price: 29.99, image: "img/products/f1.jpg" },
      2: { id: 2, name: "Jeans", price: 49.99, image: "img/products/f2.jpg" },
      3: { id: 3, name: "Jacket", price: 79.99, image: "img/products/f3.jpg" },
    };

    const cart = getCart();
    const item = cart.find(p => p.id === productId);
    if (item) {
      item.quantity += 1;
    } else {
      cart.push({ ...productMap[productId], quantity: 1 });
    }
    setCart(cart);
    alert(`${productMap[productId].name} added to cart!`);
    updateCartIcon();
  };

  // Render cart on cart page
  const renderCart = () => {
    const cartContainer = document.querySelector(".cart-items");
    if (!cartContainer) return;

    const cart = getCart();
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `).join('');

    document.querySelector(".cart-total").textContent =
      "Total: $" + cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Update quantity in cart
  window.updateQuantity = (index, quantity) => {
    const cart = getCart();
    cart[index].quantity = parseInt(quantity);
    setCart(cart);
    renderCart();
  };

  // Remove item from cart
  window.removeItem = (index) => {
    const cart = getCart();
    cart.splice(index, 1);
    setCart(cart);
    renderCart();
  };

  // Checkout total
  const renderCheckout = () => {
    const totalDisplay = document.querySelector(".checkout-total");
    if (!totalDisplay) return;
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalDisplay.textContent = "Total: $" + total.toFixed(2);
  };

  // Cart icon counter (optional)
  const updateCartIcon = () => {
    const cartCount = document.querySelector(".cart-count");
    if (!cartCount) return;
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQty;
  };

  // Run appropriate logic on each page
  renderProducts();
  renderCart();
  renderCheckout();
  updateCartIcon();
});
