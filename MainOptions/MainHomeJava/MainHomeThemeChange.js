function ThemeChoose() {
    const BodyoftheMainHome = document.getElementById('pagebody');
    const ThemeButtonChange1 = document.getElementById('ThemeButton1');
    const ThemeButtonChange2 = document.getElementById('ThemeButton2');
    const ThemeButtonChange3 = document.getElementById('ThemeButton3');
    const ThemeButtonChange4 = document.getElementById('ThemeButton4');
    
    const ThemeWindowOpenButton = document.getElementById('OptionButton1');
    const ThemeWindow = document.getElementById('NoteThemeHomeWindowElements');
    const ThemeWindowCloseButton = document.getElementById('GobackOptionButton1');
    const notewindowopen = document.getElementById('NoteCreationWindowSetup');
    const NoteWindowButtonExec = document.getElementById('MainButtonCreateFileExecute');
    const OptionFrame = document.getElementById('OptionFrame');


    if (OptionFrame.style.opacity === "1") {
        OptionFrame.style.opacity = "0";
        OptionFrame.style.zIndex = "1";
        OptionFrame.style.transform = "translateX(450px)";
        OptionFrame.classList.toggle('optionSettings-Open');
    } else {
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

    ThemeWindowOpenButton.addEventListener("click", () => {
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
    });

    ThemeWindowCloseButton.addEventListener("click", () => {
        NoteWindowButtonExec.disabled = false;
        ThemeWindow.style.scale = "0.5";
        ThemeWindow.style.opacity = "0";
        ThemeWindow.style.zIndex = "1";
        ThemeWindow.style.transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1.2)"
        ThemeWindow.style.zIndex = "1";
    })

    ThemeButtonChange1.addEventListener("click", async () => {
        const themeUrl = 'https://i.pinimg.com/736x/b2/bc/13/b2bc13d8b2d37fbaee9c503d0d6c1279.jpg';
        BodyoftheMainHome.style.backgroundImage = `url('${themeUrl}')`;
        BodyoftheMainHome.style.backgroundSize = "cover";
        BodyoftheMainHome.style.backgroundAttachment = "fixed";
        BodyoftheMainHome.style.backgroundPosition = "center";
        BodyoftheMainHome.style.transition = "all 0.4s cubic-bezier(0.100, 0.82, 0.110, 1.1)";

        ThemeButtonChange1.innerText = "In use ✅";
        ThemeButtonChange2.innerText = "Select Theme";
        ThemeButtonChange3.innerText = "Select Theme";
        ThemeButtonChange4.innerText = "Select Theme";

        ThemeButtonChange1.disabled = true;
        ThemeButtonChange2.disabled = false;
        ThemeButtonChange3.disabled = false;
        ThemeButtonChange4.disabled = false;

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
        ThemeButtonChange2.innerText = "In use ✅";
        ThemeButtonChange3.innerText = "Select Theme";
        ThemeButtonChange4.innerText = "Select Theme";

        ThemeButtonChange1.disabled = false;
        ThemeButtonChange2.disabled = true;
        ThemeButtonChange3.disabled = false;
        ThemeButtonChange4.disabled = false;

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
        ThemeButtonChange3.innerText = "In use ✅";
        ThemeButtonChange4.innerText = "Select Theme";

        ThemeButtonChange1.disabled = false;
        ThemeButtonChange2.disabled = false;
        ThemeButtonChange3.disabled = true;
        ThemeButtonChange4.disabled = false;

        // Save theme to database
        await saveThemeToDatabase('theme3', themeUrl);
    });

    ThemeButtonChange4.addEventListener("click", async () => {
        const themeUrl = 'https://i.pinimg.com/1200x/47/82/3a/47823a30f1bba5c3a9351e2bc137b9b2.jpg';
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
        ThemeButtonChange3.innerText = "Select Themes";
        ThemeButtonChange4.innerText = "In use ✅"

        ThemeButtonChange1.disabled = false;
        ThemeButtonChange2.disabled = false;
        ThemeButtonChange3.disabled = false;
        ThemeButtonChange4.disabled = true;

        // Save theme to database
        await saveThemeToDatabase('theme4', themeUrl);
    });

    // Load saved theme on page load
    loadSavedTheme();
}

// Function to save theme to database
async function saveThemeToDatabase(themeName, themeUrl) {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        console.warn('Cannot save theme: userEmail not found');
        return;
    }

    try {
        const response = await fetch('../user_settings.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: userEmail,
                theme: themeName
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
                }
            };

            const selectedTheme = themes[data.theme];
            if (selectedTheme && BodyoftheMainHome) {
                BodyoftheMainHome.style.backgroundImage = `url('${selectedTheme.url}')`;
                BodyoftheMainHome.style.backgroundSize = "cover";
                BodyoftheMainHome.style.backgroundAttachment = "fixed";
                BodyoftheMainHome.style.backgroundPosition = "center";

                // Update button states
                Object.keys(themes).forEach((themeKey, index) => {
                    const theme = themes[themeKey];
                    if (theme.button) {
                        if (themeKey === data.theme) {
                            theme.button.innerText = "In use ✅";
                            theme.button.disabled = true;
                        } else {
                            theme.button.innerText = "Select Theme";
                            theme.button.disabled = false;
                        }
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error loading theme:', error);
    }
}


