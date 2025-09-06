// This function is for show/hide the more options with animations.//
function showOptions() {
    const ButtonAnim = document.getElementById('OptionsButton');
    OptionsButton.classList.toggle('OptionButtonAnimate');
    const options = document.getElementById('OptionFrame');
    OptionFrame.classList.toggle('optionSettings-Open');
    OptionFrame.classList.toggle('optionSettings-Hide');
}

function showNewNoteSetup() {
    const SetupOpenCloseWindow = document.getElementById('NewNoteSetupWindow');
    NewNoteSetupWindow.classList.toggle('NewNoteSetupMain1Window-Open');
    const SetupButtonClicked = document.getElementById('MainButtonCreateFileExecute');
    MainButtonCreateFileExecute.classList.toggle('ButtonClickedAnimationNewNoteSetup');
    
}
