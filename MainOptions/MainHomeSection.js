// This function is for show/hide the more options with animations.//
function showOptions() {
    const ButtonAnim = document.getElementById('OptionsButton');
    OptionsButton.classList.toggle('OptionButtonAnimate');
    OptionsButton.classList.toggle('OptionButtonAnimateClose');
    const options = document.getElementById('OptionFrame');
    OptionFrame.classList.toggle('optionSettings-Open');
    OptionFrame.classList.toggle('optionSettings-Hide');
}