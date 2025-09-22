function NoteOpenCreationSetup() {
    const MainButtonNoteCreationOpen = document.getElementById('MainButtonCreateFileExecute');
    const MainWindowOpen = document.getElementById('NoteCreationWindowSetup');
    const NoteNameCreationSetup1A = document.getElementById('NoteInputHeading1');
        MainButtonNoteCreationOpen.addEventListener("click", function () {
            if (MainWindowOpen.classList.contains('OpenNoteCodeCreation-Hide')) {
                MainWindowOpen.classList.remove('OpenNoteCodeCreation-Hide');
                MainWindowOpen.classList.add('OpenNoteCodeCreation-Open');
            } else {
                MainWindowOpen.classList.add('OpenNoteCodeCreation-Hide');
                MainWindowOpen.classList.remove('OpenNoteCodeCreation-Open');
                void MainWindowOpen.offsetWidth;
            }
        });
}