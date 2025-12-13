// Main page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const previewButton = document.getElementById('preview-button');
    
    if (previewButton) {
        previewButton.addEventListener('click', function() {
            // Check if user is logged in (check localStorage)
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                // User is logged in, redirect to main interface
                window.location.href = 'MainOptions/MainHomeSection.html';
            } else {
                // User is not logged in, redirect to login/signup
                window.location.href = 'Login/index.html';
            }
        });
    }
    
    // Add keyboard accessibility
    if (previewButton) {
        previewButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
});


