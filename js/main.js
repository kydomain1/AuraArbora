// ============================================
// Global Variables
// ============================================
let allArticles = [];
let currentPage = 1;
const articlesPerPage = 6;
let filteredArticles = [];

// ============================================
// DOM Elements
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const articlesGrid = document.getElementById('articlesGrid');
const pagination = document.getElementById('pagination');

// ============================================
// Event Listeners
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
    initializeEventListeners();
});

function initializeEventListeners() {
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }

    // Search toggle
    if (searchToggle) {
        searchToggle.addEventListener('click', () => {
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active')) {
                searchInput.focus();
            }
        });
    }

    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            alert('Thank you for subscribing! We\'ll keep you updated at ' + email);
            e.target.reset();
        });
    }

    // Dropdown menu for mobile
    const dropdowns = document.querySelectorAll('.dropdown > .nav-link');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = dropdown.parentElement;
                parent.classList.toggle('active');
            }
        });
    });
}

// ============================================
// Load Articles
// ============================================
function loadArticles() {
    try {
        // Use embedded articles data instead of fetching from JSON
        allArticles = ARTICLES_DATA;
        filteredArticles = [...allArticles];
        
        // Check if we're on a category page
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('cat');
        
        if (category) {
            filterByCategory(category);
        } else {
            displayArticles();
        }
    } catch (error) {
        console.error('Error loading articles:', error);
        if (articlesGrid) {
            articlesGrid.innerHTML = '<p style="text-align: center; color: var(--text-light);">Unable to load articles at this time.</p>';
        }
    }
}

// ============================================
// Display Articles
// ============================================
function displayArticles() {
    if (!articlesGrid) return;
    
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToShow = filteredArticles.slice(startIndex, endIndex);
    
    if (articlesToShow.length === 0) {
        articlesGrid.innerHTML = '<p style="text-align: center; color: var(--text-light); grid-column: 1/-1;">No articles found.</p>';
        return;
    }
    
    articlesGrid.innerHTML = articlesToShow.map(article => createArticleCard(article)).join('');
    displayPagination();
    
    // Animate article cards
    const cards = document.querySelectorAll('.article-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ============================================
// Create Article Card
// ============================================
function createArticleCard(article) {
    return `
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
    `;
}

// ============================================
// Pagination
// ============================================
function displayPagination() {
    if (!pagination) return;
    
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span style="padding: 10px; color: var(--text-light);">...</span>`;
        }
    }
    
    // Next button
    paginationHTML += `
        <button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayArticles();
    
    // Smooth scroll to articles
    const featuredSection = document.getElementById('featured');
    if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ============================================
// Search Functionality
// ============================================
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        filteredArticles = [...allArticles];
    } else {
        filteredArticles = allArticles.filter(article => 
            article.title.toLowerCase().includes(searchTerm) ||
            article.excerpt.toLowerCase().includes(searchTerm) ||
            article.content.toLowerCase().includes(searchTerm) ||
            getCategoryName(article.category).toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    displayArticles();
}

// ============================================
// Filter by Category
// ============================================
function filterByCategory(category) {
    filteredArticles = allArticles.filter(article => article.category === category);
    currentPage = 1;
    displayArticles();
    
    // Update page title
    const categoryTitle = document.querySelector('.category-title');
    if (categoryTitle) {
        categoryTitle.textContent = getCategoryName(category);
    }
}

// ============================================
// Utility Functions
// ============================================
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

// ============================================
// Scroll Effects
// ============================================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

