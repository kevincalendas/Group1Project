// Main page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const previewButton = document.getElementById('preview-button');
    
    if (previewButton) {
        previewButton.addEventListener('click', function() {
            window.location.href = 'Login/index.html';
        });
    }
    
    // Add keyboard accessibility
    previewButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

