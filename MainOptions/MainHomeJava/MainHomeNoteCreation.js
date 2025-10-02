function OpenCreationSETUP() {
    const notewindowopen = document.getElementById('NoteCreationWindowSetup');
    const notewindowicon = document.getElementById('NoteCreationWindowSetup');
    const notewindowiconpreview = document.getElementById('NoteIconPreviewCreationNoteID');
    const NoteWindowButtonExec = document.getElementById('MainButtonCreateFileExecute');
    notewindowopen.style.scale = "1.0";
    notewindowopen.style.opacity = "1";
    notewindowicon.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.3)";
    notewindowicon.style.filter = "blur(0px)"
    notewindowiconpreview.classList.add('animateFUNCTIONPreview1');
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
    noteinputtext.value = '';
    notewindowopen.style.scale = "0.7";
    notewindowopen.style.opacity = "0";
    notewindowicon.style.transition = "all 0.2s cubic-bezier(0.1, 0, 0.1, 1.0)";
    notewindowicon.style.filter = "blur(5px)"
    notewindowiconpreview.classList.remove('animateFUNCTIONPreview1');
};