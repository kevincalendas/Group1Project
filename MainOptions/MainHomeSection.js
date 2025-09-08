// This function is for show/hide the more options with animations.//
function showOptions() {
    const OptionsButton = document.getElementById('OptionsButton');
    OptionsButton.classList.toggle('OptionButtonAnimate');
    const OptionFrame = document.getElementById('OptionFrame');
    OptionFrame.classList.toggle('optionSettings-Open');
    OptionFrame.classList.toggle('optionSettings-Hide');
}

//This Function is for show/hide the NewNoteSetup window with animations.//
function showNewNoteSetup() {
    const NewNoteSetupWindow = document.getElementById('NewNoteSetupWindow');
    NewNoteSetupWindow.classList.toggle('NewNoteSetupMain1Window-Open');
    const MainButtonCreateFileExecute = document.getElementById('MainButtonCreateFileExecute');
    MainButtonCreateFileExecute.classList.toggle('ButtonClickedAnimationNewNoteSetup');
    
}

//this function is for show the NoNoteCreatedyetwindow if the user click the create note button without having any notes created yet.//
function NoteCodeNotCreatedYet() {
    const OpacityofMainSectionNoteTab = getComputedStyle(document.getElementById('NoteTabMainSection')).opacity;
    const NoNoteCreatedyetwindow = document.getElementById('NoNoteCreatedyetwindow');
    const MainButtonCreateFileExecute = document.getElementById('MainButtonCreateFileExecute');
    const IconNewNoteSetup1 = document.getElementById('IconNewNoteSetup1');
    MainButtonCreateFileExecute.classList.toggle('ButtonClickedAnimationNewNoteSetup');
    
    if (OpacityofMainSectionNoteTab ==="1") {
        NoNoteCreatedyetwindow.style.opacity = "1";
        NoNoteCreatedyetwindow.style.transition = "all 0.4s cubic-bezier(0.100, 0.82, 0.110, 1.2)";
        NoNoteCreatedyetwindow.style.scale = "1";
        setTimeout(() => {
            IconNewNoteSetup1.style.opacity = "1";
            IconNewNoteSetup1.style.transition = "all 0.4s cubic-bezier(0.100, 0.82, 0.110, 1.2)";
        }, 10);
    } else if (OpacityofMainSectionNoteTab ==="0") {
        showNewNoteSetup();
    }
}

function NoteCodeNotCreatedYetYesandNOButton() {
    const NoNoteCreatedyetwindowYesButton = document.querySelector('.NoNoteCreatedyetwindowYesButton');
    const NoNoteCreatedyetwindow = document.getElementById('NoNoteCreatedyetwindow');
    if (NoNoteCreatedyetwindowYesButton === document.activeElement) {
        NoNoteCreatedyetwindow.style.opacity = "0";
        NoNoteCreatedyetwindow.style.transition = "all 0.4s cubic-bezier(0.100, 0.82, 0.110, 1.2)";
        NoNoteCreatedyetwindow.style.scale = "0.8";
        setTimeout(() => {
            showNewNoteSetup();
        }, 200);

    } else if (OpacityofMainSectionNoteTab ==="0") {
        showNewNoteSetup();
    }
}
