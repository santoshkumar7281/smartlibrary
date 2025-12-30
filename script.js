// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const closeLogin = document.getElementById('closeLogin');
const closeSignup = document.getElementById('closeSignup');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginFormElement = document.getElementById('loginFormElement');
const signupFormElement = document.getElementById('signupFormElement');
const bookRequestForm = document.getElementById('bookRequestForm');

// User state
let currentUser = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadUserFromStorage();
});

// Load user from localStorage
function loadUserFromStorage() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        updateNavbarWithUser(currentUser);
    }
}

// Update navbar when user logs in/signs up
function updateNavbarWithUser(user) {
    const userActionsDiv = document.querySelector('.user-actions');
    userActionsDiv.innerHTML = `
        <div class="user-profile" style="display: flex; align-items: center; gap: 1rem; color: white;">
            <span><i class="fas fa-user-circle"></i> ${user.name}</span>
            <button class="btn btn-secondary" id="logoutBtn">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        </div>
    `;
    
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', logoutUser);
}

// Logout user
function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    location.reload();
}

// Navigation - Open/Close Login Form
loginBtn.addEventListener('click', () => {
    loginForm.classList.add('active');
});

// Navigation - Open/Close Signup Form
signupBtn.addEventListener('click', () => {
    signupForm.classList.add('active');
});

// Close Login Form
closeLogin.addEventListener('click', () => {
    loginForm.classList.remove('active');
});

// Close Signup Form
closeSignup.addEventListener('click', () => {
    signupForm.classList.remove('active');
});

// Toggle between Login and Signup
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
});

// Login Form Submission
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const userName = email.split('@')[0];
    
    if (email && password) {
        currentUser = { name: userName, email: email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert(`Login successful! Welcome back, ${userName}`);
        loginForm.classList.remove('active');
        loginFormElement.reset();
        updateNavbarWithUser(currentUser);
    } else {
        alert('Please fill in all fields.');
    }
});

// Signup Form Submission
signupFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const studentId = document.getElementById('signupStudentId').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (name && email && studentId && password && confirmPassword) {
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        currentUser = { name: name, email: email, studentId: studentId };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert(`Account created successfully! Welcome ${name}.`);
        signupForm.classList.remove('active');
        signupFormElement.reset();
        updateNavbarWithUser(currentUser);
    } else {
        alert('Please fill in all fields.');
    }
});

// Book Request Form Submission
bookRequestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const category = document.getElementById('bookCategory').value;
    const reason = document.getElementById('requestReason').value;
    
    if (title && author && category && reason) {
        alert(`Book request submitted successfully!\n\nTitle: ${title}\nAuthor: ${author}`);
        bookRequestForm.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        alert('Please fill in all required fields.');
    }
});

// Request book button - Redirect to request form
function requestSpecificBook(bookTitle) {
    document.getElementById('bookTitle').value = bookTitle;
    document.getElementById('request').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('bookAuthor').focus();
}

// Hero section buttons
function initializeHeroButtons() {
    const exploreBooks = document.getElementById('exploreBooks');
    const requestBookBtn = document.getElementById('requestBookBtn');
    
    if (exploreBooks) {
        exploreBooks.addEventListener('click', () => {
            const booksSection = document.getElementById('books');
            if (booksSection) {
                booksSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (requestBookBtn) {
        requestBookBtn.addEventListener('click', () => {
            const requestSection = document.getElementById('request');
            if (requestSection) {
                requestSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Mobile Navigation
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu
                if (navLinks && window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
    
    // Initialize hero buttons
    initializeHeroButtons();
}