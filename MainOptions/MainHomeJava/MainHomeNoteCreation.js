function OpenCreationSETUP() {
    const notewindowopen = document.getElementById('NoteCreationWindowSetup');
    const notewindowicon = document.getElementById('NoteCreationWindowSetup');
    const NoteWindowSetup1 = document.getElementById('noteCreationWindowSetup1');
    const NoteWindowSetup2 = document.getElementById('NoteCreatingQueneID');
    const notewindowiconpreview = document.getElementById('NoteIconPreviewCreationNoteID');
    const NoteWindowButtonExec = document.getElementById('MainButtonCreateFileExecute');
    const ThemeWindow = document.getElementById('NoteThemeHomeWindowElements');
    notewindowopen.style.scale = "1.0";
    notewindowopen.style.opacity = "1";
    notewindowopen.style.zIndex = "400";
    notewindowicon.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.3)";
    notewindowicon.style.filter = "blur(0px)"
    notewindowiconpreview.classList.add('animateFUNCTIONPreview1');
    ThemeWindow.style.transform = "scale(0.5)";
    ThemeWindow.style.opacity = "0";
    ThemeWindow.style.zIndex = "1";
    ThemeWindow.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.2)"
    NoteWindowSetup1.style.zIndex = "400";
    NoteWindowSetup1.classList.toggle('TagsFadingINAnimation');
    NoteWindowSetup2.style.zIndex = "1";
    
    setTimeout(() => {
        NoteWindowButtonExec.disabled = true;
        notewindowiconpreview.classList.toggle('animateFUNCTIONPreview1');
    }, 500)
};

function CloseCreationSETUP() {
    const notewindowopen = document.getElementById('NoteCreationWindowSetup');
    const notewindowicon = document.getElementById('NoteCreationWindowSetup');
    const noteinputtext = document.getElementById('NoteInputSaveDataID');
    const NoteWindowButtonExec = document.getElementById('MainButtonCreateFileExecute');
    const notewindowiconpreview = document.getElementById('NoteIconPreviewCreationNoteID');
    NoteWindowButtonExec.disabled = false;
    notewindowopen.style.zIndex = "1";
    noteinputtext.value = '';
    notewindowopen.style.scale = "0.7";
    notewindowopen.style.opacity = "0";
    notewindowicon.style.transition = "all 0.2s cubic-bezier(0.1, 0, 0.1, 1.0)";
    notewindowicon.style.filter = "blur(5px)"
    notewindowiconpreview.classList.remove('animateFUNCTIONPreview1');
};

// FOR GETTING INFO OF THE TITLE OF THE NOTE KINEMERUT //

function GettingINFOEntered() {
    const NoteWindowSetupMAIN = document.getElementById('NoteCreationWindowSetup')
    const NoteWindowSetup1 = document.getElementById('noteCreationWindowSetup1ID');
    const NoteWindowSetup2 = document.getElementById('NoteCreatingQueneID');
    const noteinputname = document.getElementById('NoteInputSaveDataID');
    const noteloadinginfoH1 = document.getElementById('infoCreationSetupH1ID');
    notenameinfocreation = noteinputname.value;
    
    // closing the creation of the note window //
    
    if (noteinputname.value === "") {
        noteinputname.style.border = "2px solid red";
        setTimeout(() => {
            noteinputname.style.border = "2px solid rgba(0, 0, 0, 0.5)";
        }, 900);
    } else {
        NoteWindowSetup1.style.opacity = "0";
        NoteWindowSetup1.style.zIndex = "1";
        setTimeout(() => {
            NoteWindowSetup2.style.opacity = "1";
            NoteWindowSetup2.style.scale = "0.7";
            NoteWindowSetupMAIN.style.width = "350px";
            noteloadinginfoH1.textContent = "Creating " + noteinputname.value + " interface";
        }, 300)

        setTimeout(() => {
            NoteWindowSetup2.style.opacity = "1";
            NoteWindowSetupMAIN.style.width = "350px";
            noteloadinginfoH1.textContent = "Created! Directing...";
            noteinputname.value = '';
        }, 2200)

        setTimeout(() => {
            window.location.href="https://keep.google.com"
            
        }, 2400);
    }
}