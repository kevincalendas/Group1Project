let themeEventsInitialized = false;
let currentThemeKey = 'theme1';
let currentMode = 'dark';

function ThemeChoose() {
    const BodyoftheMainHome = document.getElementById('pagebody');
    const ThemeButtonChange1 = document.getElementById('ThemeButton1');
    const ThemeButtonChange2 = document.getElementById('ThemeButton2');
    const ThemeButtonChange3 = document.getElementById('ThemeButton3');
    const ThemeButtonChange4 = document.getElementById('ThemeButton4');
    const ThemeButtonChange5 = document.getElementById('ThemeButton5');
    const ThemeButtonChange6 = document.getElementById('ThemeButton6');
    
    const ThemeWindowOpenButton = document.getElementById('OptionButton1');
    const ThemeWindow = document.getElementById('NoteThemeHomeWindowElements');
    const ThemeWindowCloseButton = document.getElementById('GobackOptionButton1');
    const notewindowopen = document.getElementById('NoteCreationWindowSetup');
    const NoteWindowButtonExec = document.getElementById('MainButtonCreateFileExecute');
    const OptionFrame = document.getElementById('OptionFrame');


    if (OptionFrame.style.opacity === "1" || OptionFrame.style.opacity === "") {
        OptionFrame.style.opacity = "0";
        OptionFrame.style.zIndex = "1";
        OptionFrame.style.transform = "translateX(450px)";
        OptionFrame.classList.toggle('optionSettings-Open');
    } else if (OptionFrame.style.opacity === "0" || OptionFrame.style.opacity === "") {
        OptionFrame.style.opacity = "1";
        OptionFrame.style.zIndex = "800";
        OptionFrame.style.scale = "1.0";
        OptionFrame.style.transform = "translateX(0)";
        OptionFrame.classList.toggle('optionSettings-Open');
    }
    
    if (ThemeWindow.style.transform === "scale(1.0)") {
        ThemeWindow.style.scale = "0.5";
        ThemeWindow.style.opacity = "0";
        ThemeWindow.style.zIndex = "1";
        ThemeWindow.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.2)"
    }

        if (ThemeWindow.style.opacity === "1") {
            NoteWindowButtonExec.disabled = false;
            ThemeWindow.style.scale = "0.5";
            ThemeWindow.style.opacity = "0";
            ThemeWindow.style.zIndex = "1";
            ThemeWindow.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.2)";
            
        } else {
            ThemeWindow.style.scale = "1.0";
            ThemeWindow.style.opacity = "1";
            ThemeWindow.style.zIndex = "300";
            ThemeWindow.style.filter = "blur(0px)";
            ThemeWindow.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.2)";
        }

        if (notewindowopen.style.opacity === "1") {
            notewindowopen.style.zIndex = "1";
            notewindowopen.style.scale = "0.5";
            notewindowopen.style.opacity = "0";
            notewindowicon.style.transition = "all 0.2s cubic-bezier(0.1, 0, 0.1, 1.0)";
            notewindowicon.style.filter = "blur(5px)"
            notewindowiconpreview.classList.remove('animateFUNCTIONPreview1');

            ThemeWindow.style.scale = "1.0";
            ThemeWindow.style.opacity = "1";
            ThemeWindow.style.zIndex = "300";
            ThemeWindow.style.filter = "blur(0px)";
            ThemeWindow.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.2)";
        }

    // Initialize theme button events only once
    if (!themeEventsInitialized) {
        themeEventsInitialized = true;

        ThemeWindowCloseButton.addEventListener("click", () => {
            NoteWindowButtonExec.disabled = false;
            ThemeWindow.style.scale = "0.5";
            ThemeWindow.style.opacity = "0";
            ThemeWindow.style.zIndex = "1";
            ThemeWindow.style.transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1.2)"
            ThemeWindow.style.zIndex = "1";
        });

        ThemeButtonChange1.addEventListener("click", async () => {
        const themeUrl = 'https://i.pinimg.com/736x/b2/bc/13/b2bc13d8b2d37fbaee9c503d0d6c1279.jpg';
        BodyoftheMainHome.style.backgroundImage = `url('${themeUrl}')`;
        BodyoftheMainHome.style.backgroundSize = "cover";
        BodyoftheMainHome.style.backgroundAttachment = "fixed";
        BodyoftheMainHome.style.backgroundPosition = "center";
        BodyoftheMainHome.style.transition = "all 0.4s cubic-bezier(0.100, 0.82, 0.110, 1.1)";

        ThemeButtonChange1.innerText = "In use";
        ThemeButtonChange2.innerText = "Select Theme";
        ThemeButtonChange3.innerText = "Select Theme";
        ThemeButtonChange4.innerText = "Select Theme";
        ThemeButtonChange5.innerText = "Select Theme";
        ThemeButtonChange6.innerText = "Select Theme";

        ThemeButtonChange1.disabled = true;
        ThemeButtonChange2.disabled = false;
        ThemeButtonChange3.disabled = false;
        ThemeButtonChange4.disabled = false;
        ThemeButtonChange5.disabled = false;
        ThemeButtonChange6.disabled = false;

        ThemeButtonChange1.classList.toggle("ButtonClicked");

        setTimeout(() => {
            ThemeButtonChange1.classList.remove("ButtonClicked");
            void ThemeButtonChange1.offsetWidth;
            ThemeButtonChange1.classList.add("ButtonClicked");
        }, 100);

            // Save theme to database
            await saveThemeToDatabase('theme1', themeUrl);
        });

        ThemeButtonChange2.addEventListener("click", async () => {
        const themeUrl = 'https://i.pinimg.com/1200x/4f/d7/ce/4fd7ce13e677485ec2849de64473c258.jpg';
        BodyoftheMainHome.style.backgroundImage = `url('${themeUrl}')`;
        BodyoftheMainHome.style.backgroundSize = "cover";
        BodyoftheMainHome.style.backgroundAttachment = "fixed";
        BodyoftheMainHome.style.backgroundPosition = "center";
        BodyoftheMainHome.style.transition = "all 0.4s cubic-bezier(0.100, 0.82, 0.110, 1.1)";

        ThemeButtonChange2.classList.toggle("ButtonClicked");

        setTimeout(() => {
            ThemeButtonChange2.classList.remove("ButtonClicked");
            void ThemeButtonChange2.offsetWidth;
            ThemeButtonChange2.classList.add("ButtonClicked");
        }, 100)

        
        ThemeButtonChange1.innerText = "Select Theme";
        ThemeButtonChange2.innerText = "In use";
        ThemeButtonChange3.innerText = "Select Theme";
        ThemeButtonChange4.innerText = "Select Theme";
        ThemeButtonChange5.innerText = "Select Theme";
        ThemeButtonChange6.innerText = "Select Theme";

        ThemeButtonChange1.disabled = false;
        ThemeButtonChange2.disabled = true;
        ThemeButtonChange3.disabled = false;
        ThemeButtonChange4.disabled = false;
        ThemeButtonChange5.disabled = false;
        ThemeButtonChange6.disabled = false;

            // Save theme to database
            await saveThemeToDatabase('theme2', themeUrl);
        });

        ThemeButtonChange3.addEventListener("click", async () => {
        const themeUrl = 'https://i.pinimg.com/1200x/76/64/1b/76641b53502d4ca601ecd3c240ad6245.jpg';
        BodyoftheMainHome.style.backgroundImage = `url('${themeUrl}')`;
        BodyoftheMainHome.style.backgroundSize = "cover";
        BodyoftheMainHome.style.backgroundAttachment = "fixed";
        BodyoftheMainHome.style.backgroundPosition = "center";
        BodyoftheMainHome.style.transition = "all 0.4s cubic-bezier(0.100, 0.82, 0.110, 1.1)";

        ThemeButtonChange3.classList.toggle("ButtonClicked");

        setTimeout(() => {
            ThemeButtonChange3.classList.remove("ButtonClicked");
            void ThemeButtonChange3.offsetWidth;
            ThemeButtonChange3.classList.add("ButtonClicked");
        }, 100)

        
        ThemeButtonChange1.innerText = "Select Theme";
        ThemeButtonChange2.innerText = "Select Theme";
        ThemeButtonChange3.innerText = "In use";
        ThemeButtonChange4.innerText = "Select Theme";
        ThemeButtonChange5.innerText = "Select Theme";
        ThemeButtonChange6.innerText = "Select Theme";

        ThemeButtonChange1.disabled = false;
        ThemeButtonChange2.disabled = false;
        ThemeButtonChange3.disabled = true;
        ThemeButtonChange4.disabled = false;
        ThemeButtonChange5.disabled = false;
        ThemeButtonChange6.disabled = false;


            // Save theme to database
            await saveThemeToDatabase('theme3', themeUrl);
        });

        ThemeButtonChange4.addEventListener("click", async () => {
        const themeUrl = 'https://i.pinimg.com/1200x/31/ba/7c/31ba7cc779eb847b2231c27ba7b2be40.jpg';
        BodyoftheMainHome.style.backgroundImage = `url('${themeUrl}')`;
        BodyoftheMainHome.style.backgroundSize = "cover";
        BodyoftheMainHome.style.backgroundAttachment = "fixed";
        BodyoftheMainHome.style.backgroundPosition = "center";
        BodyoftheMainHome.style.transition = "all 0.4s cubic-bezier(0.100, 0.82, 0.110, 1.1)";

        ThemeButtonChange4.classList.toggle("ButtonClicked");

        setTimeout(() => {
            ThemeButtonChange4.classList.remove("ButtonClicked");
            void ThemeButtonChange4.offsetWidth;
            ThemeButtonChange4.classList.add("ButtonClicked");
        }, 100)

        
        ThemeButtonChange1.innerText = "Select Theme";
        ThemeButtonChange2.innerText = "Select Theme";
        ThemeButtonChange3.innerText = "Select Theme";
        ThemeButtonChange4.innerText = "In use"
        ThemeButtonChange5.innerText = "Select Theme";
        ThemeButtonChange6.innerText = "Select Theme";

        ThemeButtonChange1.disabled = false;
        ThemeButtonChange2.disabled = false;
        ThemeButtonChange3.disabled = false;
        ThemeButtonChange4.disabled = true;
        ThemeButtonChange5.disabled = false;
        ThemeButtonChange6.disabled = false;

            // Save theme to database
            await saveThemeToDatabase('theme4', themeUrl);
        });

        ThemeButtonChange5.addEventListener("click", async () => {
        const themeUrl = 'https://i.pinimg.com/736x/09/b5/9c/09b59c2b5f192b2d1a0ffa45c75525b1.jpg';
        BodyoftheMainHome.style.backgroundImage = `url('${themeUrl}')`;
        BodyoftheMainHome.style.backgroundSize = "cover";
        BodyoftheMainHome.style.backgroundAttachment = "fixed";
        BodyoftheMainHome.style.backgroundPosition = "center";
        BodyoftheMainHome.style.transition = "all 0.4s cubic-bezier(0.100, 0.82, 0.110, 1.1)";

        ThemeButtonChange5.classList.toggle("ButtonClicked");

        setTimeout(() => {
            ThemeButtonChange5.classList.remove("ButtonClicked");
            void ThemeButtonChange5.offsetWidth;
            ThemeButtonChange5.classList.add("ButtonClicked");
        }, 100)

        
        ThemeButtonChange1.innerText = "Select Theme";
        ThemeButtonChange2.innerText = "Select Theme";
        ThemeButtonChange3.innerText = "Select Theme";
        ThemeButtonChange5.innerText = "In use";
        ThemeButtonChange4.innerText = "Select Theme"
        ThemeButtonChange6.innerText = "Select Theme";

        ThemeButtonChange1.disabled = false;
        ThemeButtonChange2.disabled = false;
        ThemeButtonChange3.disabled = false;
        ThemeButtonChange4.disabled = false;
        ThemeButtonChange5.disabled = true;
        ThemeButtonChange6.disabled = false;

            // Save theme to database
            await saveThemeToDatabase('theme5', themeUrl);
        });

        ThemeButtonChange6.addEventListener("click", async () => {
        const themeUrl = 'https://i.pinimg.com/1200x/c1/7c/d8/c17cd8ede2fb830173adac23344595d8.jpg';
        BodyoftheMainHome.style.backgroundImage = `url('${themeUrl}')`;
        BodyoftheMainHome.style.backgroundSize = "cover";
        BodyoftheMainHome.style.backgroundAttachment = "fixed";
        BodyoftheMainHome.style.backgroundPosition = "center";
        BodyoftheMainHome.style.transition = "all 0.4s cubic-bezier(0.100, 0.82, 0.110, 1.1)";

        ThemeButtonChange6.classList.toggle("ButtonClicked");

        setTimeout(() => {
            ThemeButtonChange6.classList.remove("ButtonClicked");
            void ThemeButtonChange5.offsetWidth;
            ThemeButtonChange6.classList.add("ButtonClicked");
        }, 100)

        
        ThemeButtonChange1.innerText = "Select Theme";
        ThemeButtonChange2.innerText = "Select Theme";
        ThemeButtonChange3.innerText = "Select Theme";
        ThemeButtonChange5.innerText = "Select Theme";
        ThemeButtonChange4.innerText = "Select Theme";
        ThemeButtonChange6.innerText = "In use";

        ThemeButtonChange1.disabled = false;
        ThemeButtonChange2.disabled = false;
        ThemeButtonChange3.disabled = false;
        ThemeButtonChange4.disabled = false;
        ThemeButtonChange5.disabled = false;
        ThemeButtonChange6.disabled = true;

            // Save theme to database
            await saveThemeToDatabase('theme6', themeUrl);
        });
    }

    // Ensure saved theme is applied when opening the theme window
    loadSavedTheme();
}

// Function to save theme to database
async function saveThemeToDatabase(themeName, themeUrl) {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        console.warn('Cannot save theme: userEmail not found');
        return;
    }

    // Track current theme & mode
    currentThemeKey = themeName || currentThemeKey || 'theme1';
    const body = document.body;
    currentMode = body.classList.contains('Toggle-Light-Mode-Window') ? 'light' : 'dark';

    try {
        const response = await fetch('../user_settings.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: userEmail,
                theme: themeName,
                mode: currentMode
            })
        });

        const data = await response.json();
        if (!data.success) {
            console.error('Error saving theme:', data.error);
        }
    } catch (error) {
        console.error('Error saving theme:', error);
    }
}

// Function to load saved theme
async function loadSavedTheme() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        return;
    }

    try {
        const response = await fetch(`../user_settings.php?userEmail=${encodeURIComponent(userEmail)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        if (data.success && data.theme) {
            const BodyoftheMainHome = document.getElementById('pagebody');
            const ThemeButtonChange1 = document.getElementById('ThemeButton1');
            const ThemeButtonChange2 = document.getElementById('ThemeButton2');
            const ThemeButtonChange3 = document.getElementById('ThemeButton3');
            const ThemeButtonChange4 = document.getElementById('ThemeButton4');
            const ThemeButtonChange5 = document.getElementById('ThemeButton5');
            const ThemeButtonChange6 = document.getElementById('ThemeButton6');

            const themes = {
                'theme1': {
                    url: 'https://i.pinimg.com/736x/b2/bc/13/b2bc13d8b2d37fbaee9c503d0d6c1279.jpg',
                    button: ThemeButtonChange1
                },
                'theme2': {
                    url: 'https://i.pinimg.com/1200x/4f/d7/ce/4fd7ce13e677485ec2849de64473c258.jpg',
                    button: ThemeButtonChange2
                },
                'theme3': {
                    url: 'https://i.pinimg.com/1200x/76/64/1b/76641b53502d4ca601ecd3c240ad6245.jpg',
                    button: ThemeButtonChange3
                },
                'theme4': {
                    url: 'https://i.pinimg.com/1200x/47/82/3a/47823a30f1bba5c3a9351e2bc137b9b2.jpg',
                    button: ThemeButtonChange4
                },
                'theme5': {
                    url: 'https://i.pinimg.com/1200x/09/b5/9c/09b59c2b5f192b2d1a0ffa45c75525b1.jpg',
                    button: ThemeButtonChange5
                },
                'theme6': {
                    url: 'https://i.pinimg.com/1200x/c1/7c/d8/c17cd8ede2fb830173adac23344595d8.jpg',
                    button: ThemeButtonChange6
                },
            };

            const selectedTheme = themes[data.theme];
            if (selectedTheme && BodyoftheMainHome) {
                BodyoftheMainHome.style.backgroundImage = `url('${selectedTheme.url}')`;
                BodyoftheMainHome.style.backgroundSize = "cover";
                BodyoftheMainHome.style.backgroundAttachment = "fixed";
                BodyoftheMainHome.style.backgroundPosition = "center";

                // Track current theme
                currentThemeKey = data.theme;

                // Update button states
                Object.keys(themes).forEach((themeKey, index) => {
                    const theme = themes[themeKey];
                    if (theme.button) {
                        if (themeKey === data.theme) {
                            theme.button.innerText = "In use";
                            theme.button.disabled = true;
                        } else {
                            theme.button.innerText = "Select Theme";
                            theme.button.disabled = false;
                        }
                    }
                });

                // Apply saved light/dark mode if present
                const body = document.body;
                const ColorModeButton1 = document.getElementById('ColorModeButton1');
                const savedMode = data.mode === 'light' ? 'light' : 'dark';
                currentMode = savedMode;

                if (savedMode === 'light') {
                    body.classList.add('Toggle-Light-Mode-Window');
                    body.classList.remove('Toggle-Dark-Mode-Window');
                    if (ColorModeButton1) {
                        ColorModeButton1.textContent = " Switch to Dark Mode ";
                    }
                } else {
                    body.classList.remove('Toggle-Light-Mode-Window');
                    body.classList.add('Toggle-Dark-Mode-Window');
                    if (ColorModeButton1) {
                        ColorModeButton1.textContent = " Switch to Light Mode ";
                    }
                }
            }
        } else if (data.success && !data.theme) {
            // No theme saved yet for this user: apply and save a default theme
            const BodyoftheMainHome = document.getElementById('pagebody');
            const defaultThemeKey = 'theme1';
            const defaultThemeUrl = 'https://i.pinimg.com/736x/b2/bc/13/b2bc13d8b2d37fbaee9c503d0d6c1279.jpg';

            if (BodyoftheMainHome) {
                BodyoftheMainHome.style.backgroundImage = `url('${defaultThemeUrl}')`;
                BodyoftheMainHome.style.backgroundSize = "cover";
                BodyoftheMainHome.style.backgroundAttachment = "fixed";
                BodyoftheMainHome.style.backgroundPosition = "center";
            }

            // Persist default theme for this new user so that on next login
            // it is already stored in user_settings
            await saveThemeToDatabase(defaultThemeKey, defaultThemeUrl);
        }
    } catch (error) {
        console.error('Error loading theme:', error);
    }
}

function ColorModeWindowChooseLight() {
    const ColorModeButton1 = document.getElementById('ColorModeButton1');
    const body = document.body;

    const isDarkModeActive = body.classList.contains('Toggle-Dark-Mode-Window');
    const isLightModeActive = body.classList.contains('Toggle-Light-Mode-Window');

    if (isDarkModeActive || !isLightModeActive) {
        body.classList.add('Toggle-Light-Mode-Window');
        body.classList.remove('Toggle-Dark-Mode-Window');
        ColorModeButton1.textContent = " Switch to Dark Mode ";
        currentMode = 'light';
    } else  {
        body.classList.remove('Toggle-Light-Mode-Window');
        body.classList.add('Toggle-Dark-Mode-Window');
        ColorModeButton1.textContent = " Switch to Light Mode ";
        currentMode = 'dark';
    }

    // Save color mode + current theme in database
    saveColorModeToDatabase(currentMode);
}

async function saveColorModeToDatabase(mode) {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        console.warn('Cannot save color mode: userEmail not found');
        return;
    }

    const themeToPersist = currentThemeKey || 'theme1';
    currentMode = mode === 'light' ? 'light' : 'dark';

    try {
        await fetch('../user_settings.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: userEmail,
                theme: themeToPersist,
                mode: currentMode
            })
        });
    } catch (error) {
        console.error('Error saving color mode:', error);
    }
}

// Apply saved theme automatically when the page loads,
// and refresh it periodically so changes from the database
// reflect in "real time" (e.g. if changed from another device/tab).
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (typeof loadSavedTheme === 'function') {
            loadSavedTheme();
        }
    }, 300);

    setInterval(() => {
        if (typeof loadSavedTheme === 'function') {
            loadSavedTheme();
        }
    }, 15000); // every 15 seconds
});
