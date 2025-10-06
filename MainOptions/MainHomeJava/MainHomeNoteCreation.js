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
    ThemeWindow.style.transform = "scale(1)";
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
    const NoteCodeContent = document.getElementById('NoteCodeContentID');
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
            const ThemeWindow = document.getElementById('NoteThemeHomeWindowElements');
            const OrganizedWindows = document.getElementById('OrganizedWindowsID');
            NoListOrganizedCreated = true;
            const NoteTab = document.createElement('button');
            const NoteTabNamee = document.createElement('h1');
            const NoteFavoriteButton = document.createElement('button');
            const NoteTabOpenButton = document.createElement('button');
            const NoteTabDeleteButton = document.createElement('button');
            const NoteTabContent = document.createElement('p');


            NoteCodeNameID.textContent = notenameinfocreation;
            NoteTabOpenButton.textContent = "Open";



            NoteTab.classList.add('NoteTab');
            NoteTabNamee.classList.add('NoteTabNamee');
            NoteTabDeleteButton.classList.add('NoteTabDeleteButton');
            NoteTabOpenButton.classList.add('NoteTabOpenButton');
            NoteTabContent.classList.add('NoteTabContent'); 

            NoteTabNamee.textContent = notenameinfocreation;
            NoteTabDeleteButton.textContent = "Delete";
            NoteTabContent.textContent = "Input";


            NoteGridLayoutWindowCreation.appendChild(NoteTab);
            NoteTab.appendChild(NoteTabOpenButton);
            NoteTab.appendChild(NoteTabContent);
            NoteTab.appendChild(NoteTabNamee);  
            NoteTab.appendChild(NoteTabDeleteButton);

            ThemeWindow.style.scale = "1.0";
            NoteTabDeleteButton.addEventListener('click', () => {
                const NoteCodeNameID = document.getElementById('NoteCodeNameID');
                const NoteCodeContentInterface = document.getElementById('NoteCodeContentID');
                const NoteInterfaceCodeMainID = document.getElementById('NoteInterfaceCodeMainID');


                NoteTab.style.scale = "0.5";
                NoteTab.style.opacity = "0";
                NoteTab.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1.0)";

                const ValueTextContent = NoteCodeContentInterface.value; 
                const ValueTitleContent = NoteCodeNameID.textContent; 

                NoteTabNamee.textContent = ValueTitleContent;
                NoteTabContent.textContent = ValueTextContent;

                setTimeout(() => {
                    NoteTab.remove();
                    notenumbercreation--;
                    NoteCodeNameID.textContent = '';
                    NoteCodeContentInterface.value = '';
                    NoteInterfaceCodeMainID.style.opacity = "0";
                    NoteInterfaceCodeMainID.style.scale = "0.9";
                    NoteInterfaceCodeMainID.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1.0)";

                    setTimeout(() => {
                        NoteInterfaceCodeMainID.scale = "0";
                    }, 400);
                }, 300);
            });

            NoteTabOpenButton.addEventListener('click', () => {
                const NoteCodeNameID = document.getElementById('NoteCodeNameID');
                const NoteCodeContent = document.getElementById('NoteCodeContentID');
                const NoteInterfaceCodeMainID = document.getElementById('NoteInterfaceCodeMainID');

                const ValueTextContent = NoteTabContent.value; 
                const ValueTitleContent = NoteTabNamee.textContent; 

                NoteCodeNameID.textContent = ValueTitleContent;
                NoteCodeContent.textContent = ValueTextContent;

                NoteInterfaceCodeMainID.style.scale = "1";
                NoteInterfaceCodeMainID.style.opacity = "1";
                NoteInterfaceCodeMainID.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1.1)";
            });

            GoBackButtonNoteInterfaceID.addEventListener('click', () => {
                const NoteCodeNameID = document.getElementById('NoteCodeNameID');   // h1 in interface
                const NoteCodeContent = document.getElementById('NoteCodeContentID'); // textarea in interface
                const NoteInterfaceCodeMainID = document.getElementById('NoteInterfaceCodeMainID');

                // ✅ Just transfer text directly to the current note tab
                NoteTabNamee.textContent = NoteCodeNameID.textContent; // h1 → h1
                NoteTabContent.textContent = NoteCodeContent.value;    // textarea → p

                // ✅ Animate closing
                NoteInterfaceCodeMainID.style.scale = "0.7";
                NoteInterfaceCodeMainID.style.opacity = "0";
                NoteInterfaceCodeMainID.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.1)";

                setTimeout(() => {
                    NoteInterfaceCodeMainID.style.scale = "0";
                }, 500);
            });


            NoteTab.style.opacity = "0";
            NoteTab.style.scale = "0.5";
            setTimeout(() => {
                const NoteInterfaceCodeMainID = document.getElementById('NoteInterfaceCodeMainID');
                NoteTab.style.opacity = "0";
                NoteTab.style.scale = "0.7";
                NoteTab.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.0)";
                NoteInterfaceCodeMainID.style.scale = "1";
                NoteInterfaceCodeMainID.style.opacity = "1";
                NoteInterfaceCodeMainID.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.1  )"
                CloseCreationSETUP();
                setTimeout(() => {
                    NoteTab.style.opacity = "1";
                    NoteTab.style.scale = "1.0";
                    NoteTab.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.0)";
                    NoteInterfaceCodeMainID.style.scale = "1";
                    NoteInterfaceCodeMainID.style.opacity = "1";
                    NoteInterfaceCodeMainID.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.1  )"
                CloseCreationSETUP();
                }, 400);
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

//Closing the MainCodeInterface //

//for opening the interface//

// Tracks whether any organized note list has been created


const indexlogininputuser = get.getElementById('Email').value;
const h1getinput = get.getElementById('ProfileName');

localStorage.setItem(indexlogininputuser);  

