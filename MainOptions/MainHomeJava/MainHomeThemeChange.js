function ThemeChoose() {
    const BodyoftheMainHome = document.getElementById('pagebody');
    const ThemeButtonChange1 = document.getElementById('ThemeButton1');
    const ThemeButtonChange2 = document.getElementById('ThemeButton2');
    const ThemeButtonChange3 = document.getElementById('ThemeButton3');
    const ThemeWindowOpenButton = document.getElementById('OptionButton1');
    const ThemeWindow = document.getElementById('NoteThemeHomeWindowElements');
    const ThemeWindowCloseButton = document.getElementById('GobackOptionButton1');

    if (ThemeWindow.style.transform === "scale(1.0)") {
        ThemeWindow.style.transform = "scale(0.5)";
        ThemeWindow.style.opacity = "0";
        ThemeWindow.style.zIndex = "1";
        ThemeWindow.style.filter = "blur(30px)";
        ThemeWindow.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.2)"
    }

    ThemeWindowOpenButton.addEventListener("click", () => {
        ThemeWindow.style.transform = "scale(1.0)";
        ThemeWindow.style.opacity = "1";
        ThemeWindow.style.zIndex = "13";
        ThemeWindow.style.filter = "blur(0px)";
        ThemeWindow.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.2)"
    });

    ThemeWindowCloseButton.addEventListener("click", () => {
        ThemeWindow.style.transform = "scale(0.5)";
        ThemeWindow.style.opacity = "0";
        ThemeWindow.style.zIndex = "1";
        ThemeWindow.style.filter = "blur(30px)";
        ThemeWindow.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.2)"
    })

    ThemeButtonChange1.addEventListener("click", () => {
        BodyoftheMainHome.style.backgroundImage = "url('https://i.pinimg.com/736x/b2/bc/13/b2bc13d8b2d37fbaee9c503d0d6c1279.jpg')";
        BodyoftheMainHome.style.backgroundSize = "cover";
        BodyoftheMainHome.style.backgroundAttachment = "fixed";
        BodyoftheMainHome.style.backgroundPosition = "center";
        BodyoftheMainHome.style.transition = "all 0.4s cubic-bezier(0.100, 0.82, 0.110, 1.1)";

        ThemeButtonChange1.innerText = "In use ✅";
        ThemeButtonChange2.innerText = "Select Theme";
        ThemeButtonChange3.innerText = "Select Theme";

        ThemeButtonChange1.disabled = true;
        ThemeButtonChange2.disabled = false;
        ThemeButtonChange3.disabled = false;
        ThemeButtonChange1.innerText = "In use ✅";

        ThemeButtonChange1.classList.toggle("ButtonClicked");

        setTimeout(() => {
            ThemeButtonChange1.classList.remove("ButtonClicked");
            void ThemeButtonChange1.offsetWidth;
            ThemeButtonChange1.classList.add("ButtonClicked");
        }, 100)

    });
    ThemeButtonChange2.addEventListener("click", () => {
        BodyoftheMainHome.style.backgroundImage = "url('https://i.pinimg.com/1200x/4f/d7/ce/4fd7ce13e677485ec2849de64473c258.jpg')";
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

        ThemeButtonChange1.disabled = false;
        ThemeButtonChange2.disabled = true;
        ThemeButtonChange3.disabled = false;
    });

    ThemeButtonChange3.addEventListener("click", () => {
        BodyoftheMainHome.style.backgroundImage = "url('https://i.pinimg.com/1200x/76/64/1b/76641b53502d4ca601ecd3c240ad6245.jpg')";
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

        ThemeButtonChange1.disabled = false;
        ThemeButtonChange2.disabled = false;
        ThemeButtonChange3.disabled = true;
    });


}