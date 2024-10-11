document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products');
    const searchInput = document.getElementById('search-input'); // Assuming you have an input field with this ID

    // Fetch products from the Fake Store API
    async function fetchProducts(category = '') {
        let url = 'https://fakestoreapi.com/products';
        if (category) {
            url += `/category/${category}`;
        }

        const response = await fetch(url);
        const products = await response.json();
        displayProducts(products);
    }
    document.getElementById('menu-toggle').addEventListener('click', function() {
        const categoryList = document.getElementById('category-list');
        categoryList.classList.toggle('show'); // Toggle the visibility of the menu
    });
    
    // Function to fetch products and handle "not available" text
    async function fetchProducts(category) {
        let url = 'https://fakestoreapi.com/products';
        if (category) {
            url += `/category/${category}`;
        }
    
        const response = await fetch(url);
        const products = await response.json();
    
        // Check if products are available
        if (products.length === 0) {
            productsContainer.innerHTML = '<p class="not-available">Products not available</p>'; // Show message
        } else {
            displayProducts(products);
        }
    }
    

   // Display products in the grid
// Display products in the grid
function displayProducts(products) {
    productsContainer.innerHTML = ''; // Clear existing products

    if (products.length === 0) {
        // Show message if no products are found
        const noProductsMessage = document.createElement('p');
        noProductsMessage.textContent = 'Not Available';
        
        // Style the message
        noProductsMessage.style.textAlign = 'center'; // Center align the message
        noProductsMessage.style.color = '#888'; // Light gray color for the message
        noProductsMessage.style.fontSize = '2em'; // Increase font size
        noProductsMessage.style.margin = '20px 0'; // Add some vertical spacing
        
        productsContainer.appendChild(noProductsMessage);
        return; // Exit the function
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">$${product.price}</p>
            <p class="size">Size: M</p> <!-- Adjust size dynamically as needed -->
            <button class="view-button" onclick="viewDetails(${product.id})">View Details</button>
        `;
        productsContainer.appendChild(productCard);
    });
}



    // Fetch all products on initial load
    fetchProducts();

    // Handle category selection
    document.querySelectorAll('#category-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            fetchProducts(category); // Fetch products based on selected category
        });
    });

    // Handle search functionality
    searchInput.addEventListener('input', async function () {
        const query = searchInput.value.toLowerCase(); // Get the search input
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();

        // Filter products based on the search query
        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(query)
        );

        displayProducts(filteredProducts); // Display filtered products
    });
});

// Function to view product details
function viewDetails(productId) {
    window.location.href = `product.html?id=${productId}`; // Redirect to product details page
}
