// User Profile Management
let profileWindowOpen = false;

function openUserProfile() {
    const profileWindow = document.getElementById('UserProfileWindow');
    const OptionFrame = document.getElementById('OptionFrame');
    
    if (!profileWindow) {
        console.error('UserProfileWindow not found');
        return;
    }
    
    // Close options frame if open
    if (OptionFrame && OptionFrame.style.opacity === "1") {
        OptionFrame.style.opacity = "0";
        OptionFrame.style.zIndex = "1";
        OptionFrame.style.transform = "translateX(450px)";
    }
    
    // Load user profile data
    loadUserProfile();
    
    // Show profile window
    profileWindow.style.display = 'flex';
    setTimeout(() => {
        profileWindow.style.opacity = '1';
        profileWindow.style.scale = '1';
        profileWindow.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
    }, 10);
    
    profileWindowOpen = true;
}

function closeUserProfile() {
    const profileWindow = document.getElementById('UserProfileWindow');
    if (!profileWindow) return;
    
    profileWindow.style.scale = '0.9';
    profileWindow.style.opacity = '0';
    profileWindow.style.transition = 'all 0.2s ease-in-out';
    
    setTimeout(() => {
        profileWindow.style.display = 'none';
    }, 200);
    
    profileWindowOpen = false;
}

async function loadUserProfile() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        console.error('User email not found');
        return;
    }
    
    try {
        const response = await fetch(`../user_profile.php?userEmail=${encodeURIComponent(userEmail)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const data = await response.json();
        if (data.success && data.user) {
            const user = data.user;
            
            // Update profile display
            const profileUsername = document.getElementById('ProfileWindowUsername');
            const profileEmail = document.getElementById('ProfileWindowEmail');
            const profileNoteCount = document.getElementById('ProfileWindowNoteCount');
            const profileCategoryCount = document.getElementById('ProfileWindowCategoryCount');
            const profileJoinDate = document.getElementById('ProfileWindowJoinDate');
            
            if (profileUsername) profileUsername.textContent = user.username || 'User';
            if (profileEmail) profileEmail.textContent = user.email || 'No email';
            if (profileNoteCount) profileNoteCount.textContent = user.note_count || 0;
            if (profileCategoryCount) profileCategoryCount.textContent = user.category_count || 0;
            
            if (profileJoinDate && user.created_at) {
                const joinDate = new Date(user.created_at);
                profileJoinDate.textContent = joinDate.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
            }
        } else {
            console.error('Error loading profile:', data.error);
        }
    } catch (error) {
        console.error('Error loading user profile:', error);
    }
}

async function deleteUserAccount() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        alert('User email not found');
        return;
    }
    
    const password = prompt('Enter your password to confirm account deletion:');
    if (!password) {
        return;
    }
    
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone. All your notes, categories, and data will be permanently deleted.')) {
        return;
    }
    
    try {
        const response = await fetch('../user_profile.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: userEmail,
                password: password
            })
        });
        
        const data = await response.json();
        if (data.success) {
            alert('Account deleted successfully');
            // Clear localStorage and redirect to login
            localStorage.clear();
            window.location.href = '../Login/index.html';
        } else {
            alert('Error deleting account: ' + (data.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account. Please try again.');
    }
}

// Make profile section clickable
document.addEventListener('DOMContentLoaded', function() {
    const profileSection = document.querySelector('.ProfileOptionSection');
    if (profileSection) {
        profileSection.style.cursor = 'pointer';
        profileSection.addEventListener('click', openUserProfile);
    }
});


