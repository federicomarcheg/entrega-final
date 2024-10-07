let cartItems = [];
let cartCount = 0;

function toggleCart() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';

};

function addToCart(item) {
    cartItems.push(item);
    cartCount += 1;
    document.getElementById('cart-count').textContent = cartCount;
    updateCartDisplay();
};

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
     cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - $${item.price}`;
        cartItemsContainer.appendChild(itemElement);
     });
     if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Tu carrito esta vacio.</p>'
     }

    }

    function validateCard() {
        const cardInput = document.getElementById('card');
        const cardValue = cardInput.value;
        const isValue = /^\d{16}$/.test(cardValue);
        if (!isValid) {
            cardInput.setCustomValidity('');
        }
    }

    document.getElementById('checkout-form').addEventListener('submit', function(event) {
       event.preventDefault();
       alert('Compra realizada con éxito'); 
    })

     const products = [
        { televisor: 'Producto 1', price: 400000 },
        { teclado: 'producto 2', price: 30000},
        { iphone: 'producto 3', price: 1000000,},
        { computadora: 'producto 4', price: 50000},
        { tablet: 'Producto 5', price: 20000},
        { heladera: 'Producto 6', price: 80000},
        { smartwatch: 'Producto 7', price: 15000},
        { reloj: 'Producto 8', price: 3500},
        { mouse: 'Producto 9', price: 2000},
        {airpods: 'producto 10', price: 100000},
        {microondas: 'producto 11', price: 70000},
        {estereo: 'producto 12', price: 90000},
        {monopatinelectrico: 'producto 13', price: 300000},
        { bicicleta: 'Producto 14', price: 15000},
        { piano: 'Producto 15', price: 45000},
        { guitarra: 'Producto 16', price: 60000},
        { violin: 'Producto 17', price: 120000},
        { bajo: 'Producto 18', price: 500},
     ];

     function searchProducts() {
        const query = document.getElementById('search-bar').value.toLowerCase();
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';


        if (query.length > 0) {
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
            filteredProducts.forEach(product => {
                const item = document.createElement('div');
                item.classList.add('search-item');
                item.textContent = `${product.name} - $${product.price}`;
                searchResults.appendChild(item);

            });
        }

     }