const mainNoteOrganizedWindow = document.getElementById('MainNoteOrganizedTabsID');
const MainHomeCreationUncategorizedFrameWindow = document.getElementById('MainNoteCreationframeUncategorizedID');
const MainOptionsButton = document.getElementById('OptionsButton');


function OrganizedWindowOpen() {
    mainNoteOrganizedWindow.style.opacity = '1';
    MainOptionsButton.disabled = true;
}

function OrganizedWindowClose() {
    mainNoteOrganizedWindow.style.opacity = '0';
}