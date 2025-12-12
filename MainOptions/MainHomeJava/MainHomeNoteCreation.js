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
            NoteTabDeleteButton.addEventListener('click', async () => {
                const NoteCodeNameID = document.getElementById('NoteCodeNameID');
                const NoteCodeContentInterface = document.getElementById('NoteCodeContentID');
                const NoteInterfaceCodeMainID = document.getElementById('NoteInterfaceCodeMainID');

                // Stop auto-save before deleting
                stopAutoSave();

                // Delete from database if note ID exists
                const noteId = NoteTab.getAttribute('data-note-id');
                if (noteId) {
                    const userEmail = localStorage.getItem('userEmail');
                    if (userEmail) {
                        try {
                            await fetch('delete_note.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    userEmail: userEmail,
                                    noteId: parseInt(noteId)
                                })
                            });
                        } catch (error) {
                            console.error('Error deleting note from database:', error);
                        }
                    }
                }

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

                const ValueTextContent = NoteTabContent.textContent; 
                const ValueTitleContent = NoteTabNamee.textContent; 

                // Get note ID from NoteTab if it exists
                const existingNoteId = NoteTab.getAttribute('data-note-id');
                const noteId = existingNoteId ? parseInt(existingNoteId) : null;

                NoteCodeNameID.textContent = ValueTitleContent;
                NoteCodeContent.value = ValueTextContent;

                NoteInterfaceCodeMainID.style.scale = "1";
                NoteInterfaceCodeMainID.style.opacity = "1";
                NoteInterfaceCodeMainID.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1.1)";
                
                // Start auto-save for this note
                startAutoSave(noteId, ValueTitleContent, ValueTextContent);
            });

            GoBackButtonNoteInterfaceID.addEventListener('click', () => {
                const NoteCodeNameID = document.getElementById('NoteCodeNameID');   // h1 in interface
                const NoteCodeContent = document.getElementById('NoteCodeContentID'); // textarea in interface
                const NoteInterfaceCodeMainID = document.getElementById('NoteInterfaceCodeMainID');

                // Save before closing
                stopAutoSave();

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
                
                // Start auto-save after note interface is fully opened
                setTimeout(() => {
                    const NoteCodeNameID = document.getElementById('NoteCodeNameID');
                    const NoteCodeContent = document.getElementById('NoteCodeContentID');
                    if (NoteCodeNameID && NoteCodeContent) {
                        const title = NoteCodeNameID.textContent || '';
                        const content = NoteCodeContent.value || '';
                        // Start auto-save (noteId will be set after first save)
                        startAutoSave(null, title, content);
                    }
                }, 500);
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


// Store user info in localStorage (if available)
const emailInput = document.getElementById('Email');
const profileNameElement = document.getElementById('ProfileName');

if (emailInput) {
    const userEmail = emailInput.value;
    if (userEmail) {
        localStorage.setItem('userEmail', userEmail);
    }
}

if (profileNameElement) {
    const profileName = profileNameElement.textContent;
    if (profileName) {
        localStorage.setItem('profileName', profileName);
    }
}

// ========== AUTO-SAVE FUNCTIONALITY ==========

// Global variables for auto-save
let autoSaveInterval = null;
let currentNoteId = null;
let lastSavedContent = '';
let lastSavedTitle = '';
let isSaving = false;

// Function to save note to database
async function saveNoteToDatabase(noteId, title, content, showStatus = true) {
    if (isSaving) return; // Prevent concurrent saves
    
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        console.warn('User email not found in localStorage');
        return;
    }

    // Skip if content hasn't changed
    if (noteId && title === lastSavedTitle && content === lastSavedContent) {
        return;
    }

    isSaving = true;
    const statusElement = document.getElementById('NoteCodeStatush1ID');
    
    if (statusElement && showStatus) {
        statusElement.textContent = 'Saving...';
        statusElement.style.color = '#ffa500';
    }

    try {
        const response = await fetch('save_note.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: userEmail,
                noteId: noteId,
                title: title,
                content: content
            })
        });

        const data = await response.json();

        if (data.success) {
            // Update note ID if it's a new note
            if (!noteId && data.noteId) {
                currentNoteId = data.noteId;
                // Store note ID in the NoteTab element
                const NoteCodeNameID = document.getElementById('NoteCodeNameID');
                if (NoteCodeNameID) {
                    const noteTitle = NoteCodeNameID.textContent;
                    // Find the NoteTab with matching title
                    const allNoteTabs = document.querySelectorAll('.NoteTab');
                    for (let tab of allNoteTabs) {
                        const tabName = tab.querySelector('.NoteTabNamee');
                        if (tabName && tabName.textContent === noteTitle) {
                            tab.setAttribute('data-note-id', data.noteId);
                            break;
                        }
                    }
                }
            } else if (data.noteId) {
                currentNoteId = data.noteId;
            }

            lastSavedContent = content;
            lastSavedTitle = title;

            if (statusElement && showStatus) {
                statusElement.textContent = 'Saved!';
                statusElement.style.color = '#4caf50';
                
                // Reset to default after 2 seconds
                setTimeout(() => {
                    if (statusElement.textContent === 'Saved!') {
                        statusElement.textContent = 'Auto-saved';
                        statusElement.style.color = '#666';
                    }
                }, 2000);
            }
        } else {
            throw new Error(data.error || 'Failed to save note');
        }
    } catch (error) {
        console.error('Error saving note:', error);
        if (statusElement && showStatus) {
            statusElement.textContent = 'Save failed!';
            statusElement.style.color = '#f44336';
        }
    } finally {
        isSaving = false;
    }
}

// Function to start auto-save for a note
function startAutoSave(noteId, title, content) {
    // Stop any existing auto-save
    stopAutoSave();

    currentNoteId = noteId;
    lastSavedContent = content;
    lastSavedTitle = title;

    // Save immediately
    saveNoteToDatabase(noteId, title, content, true);

    // Set up periodic auto-save (every 3 seconds)
    autoSaveInterval = setInterval(() => {
        const NoteCodeNameID = document.getElementById('NoteCodeNameID');
        const NoteCodeContent = document.getElementById('NoteCodeContentID');
        
        if (NoteCodeNameID && NoteCodeContent) {
            const currentTitle = NoteCodeNameID.textContent || '';
            const currentContent = NoteCodeContent.value || '';
            
            // Only save if content has changed
            if (currentTitle !== lastSavedTitle || currentContent !== lastSavedContent) {
                saveNoteToDatabase(currentNoteId, currentTitle, currentContent, false);
            }
        }
    }, 3000);

    // Set up event listeners for immediate save on change
    const NoteCodeNameID = document.getElementById('NoteCodeNameID');
    const NoteCodeContent = document.getElementById('NoteCodeContentID');

    if (NoteCodeContent) {
        // Debounced save on input (save 1 second after user stops typing)
        let inputTimeout = null;
        NoteCodeContent.addEventListener('input', () => {
            clearTimeout(inputTimeout);
            inputTimeout = setTimeout(() => {
                const currentTitle = NoteCodeNameID ? NoteCodeNameID.textContent : '';
                const currentContent = NoteCodeContent.value || '';
                saveNoteToDatabase(currentNoteId, currentTitle, currentContent, false);
            }, 1000);
        });
    }
}

// Function to stop auto-save
function stopAutoSave() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    }
    
    // Save one final time before stopping
    const NoteCodeNameID = document.getElementById('NoteCodeNameID');
    const NoteCodeContent = document.getElementById('NoteCodeContentID');
    
    if (NoteCodeNameID && NoteCodeContent) {
        const currentTitle = NoteCodeNameID.textContent || '';
        const currentContent = NoteCodeContent.value || '';
        if (currentTitle || currentContent) {
            saveNoteToDatabase(currentNoteId, currentTitle, currentContent, true);
        }
    }
}

// Save before page unload
window.addEventListener('beforeunload', () => {
    stopAutoSave();
});

// Initialize auto-save when note interface is opened
// This will be called after note creation animation completes
setTimeout(() => {
    // Check if there's a note interface visible and start auto-save
    const NoteInterfaceCodeMainID = document.getElementById('NoteInterfaceCodeMainID');
    if (NoteInterfaceCodeMainID && NoteInterfaceCodeMainID.style.opacity === "1") {
        const NoteCodeNameID = document.getElementById('NoteCodeNameID');
        const NoteCodeContent = document.getElementById('NoteCodeContentID');
        
        if (NoteCodeNameID && NoteCodeContent) {
            const title = NoteCodeNameID.textContent || '';
            const content = NoteCodeContent.value || '';
            
            // Try to get note ID from the last NoteTab
            const lastNoteTab = document.querySelector('.NoteTab:last-child');
            const noteId = lastNoteTab ? (lastNoteTab.getAttribute('data-note-id') ? parseInt(lastNoteTab.getAttribute('data-note-id')) : null) : null;
            
            if (title || content) {
                startAutoSave(noteId, title, content);
            }
        }
    }
}, 3000);

