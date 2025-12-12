// Login page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    const loginButton = document.getElementById('button1');
    const signupButton = document.getElementById('signup-button');
    const emailInput = document.getElementById('Email');
    const passwordInput = document.getElementById('password');
    
    // Signup button navigation
    if (signupButton) {
        signupButton.addEventListener('click', function() {
            // Check for both uppercase and lowercase filenames
            const signupPath = './SIGNUP.HTML';
            window.location.href = signupPath;
        });
        
        signupButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Form validation before submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            if (!validateLoginForm()) {
                e.preventDefault();
                return false;
            }
        });
    }
    
    // Login button click handler
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            if (!validateLoginForm()) {
                e.preventDefault();
                return false;
            }
        });
    }
    
    // Real-time validation feedback
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', clearError);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', validatePassword);
        passwordInput.addEventListener('input', clearError);
    }
    
    // Validate login form
    function validateLoginForm() {
        const email = emailInput?.value.trim();
        const password = passwordInput?.value;
        
        if (!email || !password) {
            showError('Please fill in all fields');
            return false;
        }
        
        if (!validateEmail()) {
            return false;
        }
        
        if (!validatePassword()) {
            return false;
        }
        
        return true;
    }
    
    // Validate email format
    function validateEmail() {
        const email = emailInput?.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showError('Email is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address');
            return false;
        }
        
        clearError();
        return true;
    }
    
    // Validate password
    function validatePassword() {
        const password = passwordInput?.value;
        
        if (!password) {
            showError('Password is required');
            return false;
        }
        
        if (password.length < 6) {
            showError('Password must be at least 6 characters long');
            return false;
        }
        
        clearError();
        return true;
    }
    
    // Show error message
    function showError(message) {
        clearError();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'color: #ff4444; font-size: 14px; margin-top: 10px; text-align: center; font-weight: bold;';
        
        const form = document.querySelector('form');
        if (form) {
            form.insertBefore(errorDiv, form.firstChild);
        }
    }
    
    // Clear error message
    function clearError() {
        const errorDiv = document.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // Legacy function for backward compatibility
    function ifloginempty() {
        return validateLoginForm();
    }
    
    // Make function globally available
    window.ifloginempty = ifloginempty;
});

