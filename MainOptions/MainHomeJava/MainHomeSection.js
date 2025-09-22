// This function is for show/hide the more options with animations.//
function showOptions() {
    const OptionsButton = document.getElementById('OptionsButton');
    OptionsButton.classList.toggle('OptionButtonAnimate');
    const OptionFrame = document.getElementById('OptionFrame');
    OptionFrame.classList.toggle('optionSettings-Open');
    OptionFrame.classList.toggle('optionSettings-Hide');
}