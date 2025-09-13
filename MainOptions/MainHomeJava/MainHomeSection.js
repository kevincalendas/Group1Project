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
    MainButtonCreateFileExecute.disabled = true;
}

//This Function if the ThemeWindow is open it automatically close to avoid overlapping windows//

function showNewNoteSetupExit() {
    const NewNoteSetupWindow = document.getElementById('NewNoteSetupWindow');
    NewNoteSetupWindow.classList.toggle('NewNoteSetupMain1Window-Open');
    const MainButtonCreateFileExecute = document.getElementById('MainButtonCreateFileExecute');
    MainButtonCreateFileExecute.classList.toggle('ButtonClickedAnimationNewNoteSetup');
    MainButtonCreateFileExecute.disabled = false;
    
}
//this function is for show the NoNoteCreatedyetwindow if the user click the create note button without having any notes created yet.//
function NoteCodeNotCreatedYet() {
    const NewNoteSetupWindow = document.getElementById('NewNoteSetupWindow');
    const OpacityofMainSectionNoteTab = getComputedStyle(document.getElementById('NoteTabMainSection')).opacity;
    const NoNoteCreatedyetwindow = document.getElementById('NoNoteCreatedyetwindow');
    const MainButtonCreateFileExecute = document.getElementById('MainButtonCreateFileExecute');
    const NoNoteCreatedyetwindowIMG = document.getElementById('NoNoteCreatedyetwindowIMG');
    MainButtonCreateFileExecute.classList.toggle('ButtonClickedAnimationNewNoteSetup');
    if (OpacityofMainSectionNoteTab ==="1") {
        NoNoteCreatedyetwindow.style.opacity = "1";
        NoNoteCreatedyetwindow.style.transition = "all 0.4s cubic-bezier(0.100, 0.82, 0.110, 1.2)";
        NoNoteCreatedyetwindow.style.transform = "scale(1.1)";
        NoNoteCreatedyetwindowIMG.style.top = "20%";
        NoNoteCreatedyetwindowIMG.style.opacity = "1";
        NoNoteCreatedyetwindowIMG.style.transition = "all 1s cubic-bezier(0,-0.01,0,1)";
    } else if (OpacityofMainSectionNoteTab ==="0") {
        showNewNoteSetup();
        MainButtonCreateFileExecute.disabled = true;
    } 

    const ThemeWindow = document.getElementById('NoteThemeHomeWindowElements');
    const CurrentOpacityofWindow = getComputedStyle(ThemeWindow).opacity;
        ThemeWindow.style.transform = "scale(0.5)";
        ThemeWindow.style.opacity = "0";
        ThemeWindow.style.zIndex = "1";
        ThemeWindow.style.filter = "blur(30px)";
        ThemeWindow.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.2)"

}



function NoteCodeNotCreatedYetYesButton() {
    const NoNoteCreatedyetwindowYesButton = document.getElementById('NoNoteCreatedyetwindowYesButton');
    const NoNoteCreatedyetwindowNoButton = document.getElementById('NoNoteCreatedyetwindowNoButton');
    const NoNoteCreatedyetwindow = document.getElementById('NoNoteCreatedyetwindow');
    const NoNoteCreatedyetwindowIMG = document.getElementById('NoNoteCreatedyetwindowIMG');
    const MainButtonCreateFileExecute = document.getElementById('MainButtonCreateFileExecute');

    NoNoteCreatedyetwindow.style.opacity = "0";
    NoNoteCreatedyetwindow.style.transition = "all 0.4s cubic-bezier(0.100, 0.82, 0.110, 1.2)";
    NoNoteCreatedyetwindow.style.transform = "scale(0.8)";
    NoNoteCreatedyetwindowIMG.style.top = "30%";
    NoNoteCreatedyetwindowIMG.style.opacity = "0";
    NoNoteCreatedyetwindowIMG.style.transition = "all 1s cubic-bezier(0,-0.01,0,1)";
     MainButtonCreateFileExecute.disabled = true;
    setTimeout(() => {
        showNewNoteSetup();
    }, 200);
}

function NoteCodeNotCreatedYetNoButton() {
    const NoNoteCreatedyetwindowYesButton = document.getElementById('NoNoteCreatedyetwindowYesButton');
    const NoNoteCreatedyetwindowNoButton = document.getElementById('NoNoteCreatedyetwindowNoButton');
    const NoNoteCreatedyetwindow = document.getElementById('NoNoteCreatedyetwindow');
    const NoNoteCreatedyetwindowIMG = document.getElementById('NoNoteCreatedyetwindowIMG');
    const MainButtonCreateFileExecute = document.getElementById('MainButtonCreateFileExecute');

    NoNoteCreatedyetwindow.style.opacity = "0";
    NoNoteCreatedyetwindow.style.transition = "all 0.4s cubic-bezier(0.100, 0.82, 0.110, 1.2)";
    NoNoteCreatedyetwindow.style.transform = "scale(0.8)";
    NoNoteCreatedyetwindowIMG.style.top = "30%";
    NoNoteCreatedyetwindowIMG.style.opacity = "0";
    NoNoteCreatedyetwindowIMG.style.transition = "all 1s cubic-bezier(0,-0.01,0,1)";
}
