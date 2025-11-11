function MainOpenWindowAbout() {
    const aboutWindow = document.querySelector('.AboutWindow');
    aboutWindow.style.display = 'flex';
    setTimeout(() => {
        aboutWindow.style.scale = '1';
        aboutWindow.style.opacity = '1';  
        aboutWindow.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
    }, 10);
    
}

function MainCloseWindowAbout() {
    const aboutWindow = document.querySelector('.AboutWindow');
    aboutWindow.style.scale = '0.7';
    aboutWindow.style.opacity = '0';  
    aboutWindow.style.transition = 'all 0.2s ease-in-out';
    setTimeout(() => {
        aboutWindow.style.display = 'none';
    }, 300);

}