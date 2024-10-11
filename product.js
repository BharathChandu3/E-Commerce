// product.js

// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fetch product details based on ID
async function fetchProductDetails(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
    return product;
}

// Display product details
async function displayProductDetails() {
    const productId = getUrlParameter('id');
    const product = await fetchProductDetails(productId);

    const productDetailsSection = document.getElementById('product-details');
    productDetailsSection.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Category:</strong> ${product.category}</p>
    `;
}

// Load product details on page load
displayProductDetails();
