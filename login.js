// --- UI & Animation Logic ---
const typedTextElement = document.getElementById('typedText');
const cursorElement = document.getElementById('cursor');
const textArray = [
    "Cloudana analyzes your spending patterns to uncover hidden costs and inefficiencies.",
    "Our platform provides actionable insights to help you reduce expenditure by up to 40%.",
    "Achieve financial clarity and optimize your cloud infrastructure with ease."
];
const typingDelay = 70;
const erasingDelay = 40;
const newTextDelay = 2500;

let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        updateCursorPosition();
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        updateCursorPosition();
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        setTimeout(type, 1000);
    }
}

function updateCursorPosition() {
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.fontFamily = 'Poppins, sans-serif';
    tempSpan.style.fontSize = '1.2rem';
    tempSpan.style.lineHeight = '1.6';
    tempSpan.style.whiteSpace = 'pre-wrap';
    tempSpan.textContent = typedTextElement.textContent;
    document.body.appendChild(tempSpan);

    const rect = tempSpan.getBoundingClientRect();
    cursorElement.style.left = rect.right + 'px';
    cursorElement.style.top = (rect.bottom + rect.top) / 2 + 'px';
    document.body.removeChild(tempSpan);
}

// --- Custom Message Box ---
const messageBox = document.getElementById('messageBox');

function showMessage(message, type = 'success') {
    messageBox.textContent = message;
    messageBox.className = `message-box message-box--${type} show`;
    setTimeout(() => {
        messageBox.classList.remove('show');
    }, 4000);
}

// --- Authentication UI & Functionality ---
const authContainer = document.getElementById('authContainer');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupLink = document.getElementById('showSignupLink');
const showLoginLink = document.getElementById('showLoginLink');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const closeModal = document.getElementById('closeModal');

showSignupLink.addEventListener('click', function(e) {
    e.preventDefault();
    switchToSignup();
});

showLoginLink.addEventListener('click', function(e) {
    e.preventDefault();
    switchToLogin();
});

forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    forgotPasswordModal.style.display = 'block';
});

closeModal.addEventListener('click', function() {
    forgotPasswordModal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target == forgotPasswordModal) {
        forgotPasswordModal.style.display = 'none';
    }
});

function switchToSignup() {
    authContainer.classList.add('flipped');
    loginForm.classList.add('hidden');
    setTimeout(() => {
        signupForm.classList.remove('hidden');
    }, 300);
}

function switchToLogin() {
    signupForm.classList.add('hidden');
    setTimeout(() => {
        authContainer.classList.remove('flipped');
        loginForm.classList.remove('hidden');
    }, 300);
}

// --- Form Submission Logic ---
signupForm.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        showMessage("Passwords do not match.", 'error');
        return;
    }

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        if (response.ok) {
            showMessage(data.message, 'success');
            // Optionally switch to login form after successful registration
            setTimeout(switchToLogin, 1500);
        } else {
            showMessage(data.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage("An error occurred. Please try again later.", 'error');
    }
});

loginForm.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.ok) {
            showMessage(data.message, 'success');
            // Store user data in localStorage for dashboard access
            localStorage.setItem('user', JSON.stringify(data.user));
            // Redirect to the dashboard on successful login
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 1000); // Small delay to show success message
        } else {
            showMessage(data.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage("An error occurred. Please try again later.", 'error');
    }
});

// Initialize typing animation on page load
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(type, 1500);
});

