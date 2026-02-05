// This function is for show/hide the more options with animations.//
function showOptions() {
    const OptionsButton = document.getElementById('OptionsButton');
    OptionsButton.classList.toggle('OptionButtonAnimate');
    const OptionFrame = document.getElementById('OptionFrame');
    const OptionSection = document.getElementById('OptionSection');
    if (OptionFrame.style.opacity === "1" || OptionFrame.style.opacity === "") {
        OptionFrame.style.opacity = "0";
        OptionFrame.style.zIndex = "1";
        OptionFrame.style.transform = "translateX(450px)";
        OptionFrame.style.transition = "all 1s cubic-bezier(0.175, 0.885, 0.32, 1.05)";
        OptionFrame.classList.toggle('optionSettings-Close');
        setTimeout(() => {
            OptionFrame.style.display = "none";
        }, 200);
    } else if (OptionFrame.style.opacity === "0" || OptionFrame.style.opacity === "") {
        setTimeout(() => {
            OptionFrame.style.opacity = "1";
            OptionFrame.style.zIndex = "1000";
            OptionFrame.style.transform = "translateX(0px)";
            OptionFrame.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.05)";
            OptionFrame.classList.toggle('optionSettings-Open');
        }, 100);
        OptionFrame.style.display = "block";
    }
}


