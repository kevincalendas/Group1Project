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
    NoteWindowButtonExec.disabled = true;
    
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
    const NoteCodeNameID = document.getElementById('NoteCodeNameID');
    notenameinfocreation = noteinputname.value;
   
    
    // closing the creation of the note window //
    


    if (noteinputname.value === "") {
        noteinputname.style.border = "2px solid red";
        setTimeout(() => {
            noteinputname.style.border = "2px solid rgba(0, 0, 0, 0.5)";
        }, 900);
    } else {
        //calling out the main window of the note lists//
        let notenumbercreation = 0;
        const NoteGridLayoutWindowCreation = document.getElementById('UncategorizedList');
        notenumbercreation++
        //disable the opacity of note window setup1
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
            const OrganizedWindows = document.getElementById('OrganizedWindowsID');
            NoListOrganizedCreated = true;
            const NoteTab = document.createElement('div');
            const NoteTabNamee = document.createElement('h1');
            const NoteTabDeleteButton = document.createElement('button');
            const NoteTabContent = document.createElement('p');

            NoteCodeNameID.textContent = notenameinfocreation;

            NoteTab.classList.add('NoteTab');
            NoteTabNamee.classList.add('NoteTabName');
            NoteTabDeleteButton.classList.add('NoteTabDeleteButton');
            NoteTabContent.classList.add('NoteTabContent'); 

            NoteTabNamee.textContent = notenameinfocreation;
            NoteTabDeleteButton.textContent = "Delete";
            


            NoteGridLayoutWindowCreation.appendChild(NoteTab);
            NoteTab.appendChild(NoteTabContent);
            NoteTab.appendChild(NoteTabNamee);  
            NoteTab.appendChild(NoteTabDeleteButton);

            NoteTabDeleteButton.addEventListener('click', () => {
                NoteTab.style.scale = "0.5";
                NoteTab.style.opacity = "0";
                NoteTab.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1.0)";
                setTimeout(() => {
                    NoteTab.remove();
                    notenumbercreation--
                    const NoteInterfaceCodeMainID = document.getElementById('NoteInterfaceCodeMainID'); 
                    NoteInterfaceCodeMainID.style.opacity = "0";
                    NoteInterfaceCodeMainID.style.scale = "0";
                    NoteInterfaceCodeMainID.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1.0)"
                }, 300);
            });

            NoteTab.style.opacity = "0";
            NoteTab.style.scale = "0.5";
            setTimeout(() => {
                const NoteInterfaceCodeMainID = document.getElementById('NoteInterfaceCodeMainID');
                NoteTab.style.opacity = "1";
                NoteTab.style.scale = "1.0";
                NoteTab.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.0)";
                NoteInterfaceCodeMainID.style.scale = "1";
                NoteInterfaceCodeMainID.style.opacity = "1";
                NoteInterfaceCodeMainID.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.1  )"
                CloseCreationSETUP();
            }, 300);
            
            //closing the note creation window setup2 and going back to main note window//
            NoteWindowSetup2.style.opacity = "0";
            NoteWindowSetup2.style.scale = "0";
            NoteWindowSetup2.style.zIndex = "1";
            NoteWindowSetup1.style.zIndex = "1";
            NoteWindowSetupMAIN.style.width = "500px";
            NoteWindowSetupMAIN.style.scale = "0";
            noteloadinginfoH1.textContent = "Enter the name of your note";
            
            setTimeout(() => {
                NoteWindowSetup1.style.opacity = "1";
                NoteWindowSetup1.style.zIndex = "400";
            }, 500);
        }, 2400);


    }
    if (notenumbercreation === 0) {
        NoNoteCreatedText.style.opacity = "1";
    }   else if (notenumbercreation > 1) {
            oNoteCreatedText.style.opacity = "0";
    }

}

// Tracks whether any organized note list has been created


const indexlogininputuser = get.getElementById('Email').value;
const h1getinput = get.getElementById('ProfileName');

localStorage.setItem(indexlogininputuser);  

