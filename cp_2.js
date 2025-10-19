// Step One: Product Dashboard 
const API_URL = 'https://www.course-api.com/javascript-store-products';

//Step Two: Reusable error handler 

function handleError(error) {
    console.error('An error occurred:', error?.message || error); 
    const status = document.getElementById('status');
    if (status) status.textContent = 'An error has occurred:' + (error?.message || error); 
} 
// Step Three: Helpers to extract product data 
function getName(p) {
    return p?.fields?.name || 'Unnamed Product';
} 
function getImage(p) {
    return p?.fields?.image?.[0]?.url || '';
}
function getPrice(p) {
    const cents = p?.fields?.price ?? 0; 
    return`$${(cents / 100).toFixed(2)}`;
} 
// Step Four: Fetch product data 
function fetchProductsThen() {
    fetch(API_URL)
        .then((res) => {
            if (!res.ok) throw new Error(`Network response was not ok: ${res.statusText}`);
            return res.json();
        }) 
        .then((products) => {
            products.forEach((p,i) => {
                console.log(`[then] Product ${i + 1}:`, getName(p)); 
            });
        })
        .catch(handleError); 
    } 

// Step Five: Async/await with try/catch 
async function fetchProductsAsync() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('HTTP' + res.status);
        const products = await res.json(); 
        displayProducts(products); 
        const status = document.getElementById('status'); 
        if (status) status.textContent = 'Loaded products successfully.';
    } catch (error) {
        handleError(error);
    }
}  
// Step Six: Display of products in container
function displayProducts (products) { 
    const container = document.getElementById('product-container'); 
    container.innerHTML = '';

    products.slice(0,5).forEach((p) => {
        const card = document.createElement('div');
        card.className = 'card'; 

        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = getPrice(p);

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);

        container.appendChild(card);
    }); 
}
// Step Seven: Call both methods 

