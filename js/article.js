// ============================================
// Article Page JavaScript
// ============================================

let currentArticle = null;
let allArticlesData = [];

// Load article on page load
document.addEventListener('DOMContentLoaded', () => {
    loadArticleData();
});

function loadArticleData() {
    try {
        // Use embedded articles data instead of fetching from JSON
        allArticlesData = ARTICLES_DATA;
        
        // Get article ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = parseInt(urlParams.get('id'));
        
        // Find article by ID
        currentArticle = allArticlesData.find(article => article.id === articleId);
        
        if (currentArticle) {
            displayArticle(currentArticle);
            displayProducts(currentArticle.products);
            displayRelatedArticles(currentArticle);
        } else {
            document.querySelector('.article-page').innerHTML = `
                <div class="container" style="text-align: center; padding: 100px 20px;">
                    <h1>Article Not Found</h1>
                    <p>Sorry, the article you're looking for doesn't exist.</p>
                    <a href="index.html" class="btn btn-primary" style="margin-top: 20px;">Back to Home</a>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading article:', error);
    }
}

function displayArticle(article) {
    // Update page title
    document.getElementById('pageTitle').textContent = `${article.title} - AuraArbora`;
    
    // Update article header
    document.getElementById('articleCategory').textContent = getCategoryName(article.category);
    document.getElementById('articleCategory').href = `category.html?cat=${article.category}`;
    document.getElementById('articleDate').innerHTML = `<i class="far fa-calendar"></i> ${formatDate(article.date)}`;
    document.getElementById('articleTitle').textContent = article.title;
    document.getElementById('articleAuthor').textContent = `By ${article.author}`;
    
    // Update featured image
    document.getElementById('articleImage').src = article.image;
    document.getElementById('articleImage').alt = article.title;
    
    // Update article content
    document.getElementById('articleContent').innerHTML = article.content;
}

function displayProducts(products) {
    if (!products || products.length === 0) {
        document.getElementById('productsSection').style.display = 'none';
        return;
    }
    
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <p class="product-description">${product.description}</p>
                <a href="${product.link}" class="product-link" target="_blank">View Product</a>
            </div>
        </div>
    `).join('');
}

function displayRelatedArticles(currentArticle) {
    // Filter articles by same category, excluding current article
    const relatedArticles = allArticlesData
        .filter(article => article.category === currentArticle.category && article.id !== currentArticle.id)
        .slice(0, 3);
    
    // If not enough articles in same category, add articles from other categories
    if (relatedArticles.length < 3) {
        const additionalArticles = allArticlesData
            .filter(article => article.id !== currentArticle.id && !relatedArticles.includes(article))
            .slice(0, 3 - relatedArticles.length);
        relatedArticles.push(...additionalArticles);
    }
    
    const relatedGrid = document.getElementById('relatedGrid');
    relatedGrid.innerHTML = relatedArticles.map(article => `
        <article class="article-card">
            <div class="article-image-container">
                <img src="${article.image}" alt="${article.title}" class="article-image">
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span class="article-category">${getCategoryName(article.category)}</span>
                    <span class="article-date">
                        <i class="far fa-calendar"></i>
                        ${formatDate(article.date)}
                    </span>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <a href="article.html?id=${article.id}" class="read-more">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');
}

// Share functionality
function shareOnSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(currentArticle.title);
    const text = encodeURIComponent(currentArticle.excerpt);
    
    let shareUrl;
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        case 'pinterest':
            const image = encodeURIComponent(currentArticle.image);
            shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${title}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Utility functions
function getCategoryName(category) {
    const categories = {
        'fashion': 'Fashion & Accessories',
        'beauty': 'Health & Beauty',
        'home': 'Home & Garden',
        'travel': 'Travel & Accommodation',
        'finance': 'Finance & Insurance',
        'food': 'Food & Beverage'
    };
    return categories[category] || category;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

