// ========== GLOBAL VARIABLES ==========
// Global variable for note count - must be declared before any functions use it
let notenumbercreation = 0;
let NoListOrganizedCreated = false;

// --- Multi-window note editor state (allow up to 3 floating editors) ---
const MAX_NOTE_WINDOWS = 3;
const openNoteWindows = new Map(); // windowId -> { el, timers, noteId, tabEl }
let noteWindowCounter = 0;
let windowTopZ = 1300;

function bringWindowToFront(windowEl) {
    if (!windowEl) return;
    windowTopZ += 1;
    windowEl.style.zIndex = `${windowTopZ}`;
}

function ensureNoteWindowContainer() {
    let container = document.getElementById('NoteWindowContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'NoteWindowContainer';
        container.style.position = 'fixed';
        container.style.inset = '0';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '1200';
        document.body.appendChild(container);
    }
    return container;
}

function buildNoteWindowElement(windowId) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('NoteInterfaceCodeMain', 'NoteWindowInstance');
    wrapper.dataset.windowId = windowId;
    wrapper.style.position = 'fixed';
    wrapper.style.pointerEvents = 'auto';
    wrapper.style.top = `${100 + (openNoteWindows.size * 35)}px`;
    wrapper.style.left = `${100 + (openNoteWindows.size * 45)}px`;
    bringWindowToFront(wrapper);

    wrapper.innerHTML = `
        <h1 class="NoteCodeName" contenteditable="true">Title</h1>
        <button class="NoteFavoriteButton" aria-label="Toggle favorite">☆</button>
        <div class="NoteCategorySelector">
            <label class="CategoryLabel">Category:</label>
            <select class="CategorySelect">
                <option value="">Uncategorized</option>
            </select>
        </div>
        <textarea class="NoteCodeContent" rows="5" cols="50" placeholder="Start typing your note here..."></textarea>
        <button class="GoBackButton" aria-label="Close note">✕</button>
        <div class="NoteCodeServerStatus"></div>
        <h1 class="NoteCodeStatush1">Saved!</h1>
    `;

    return wrapper;
}

async function openNoteWindowForTab(noteTab, tabNameEl, tabContentEl) {
    const existingNoteId = noteTab.getAttribute('data-note-id');
    const tabIsFavorite = noteTab.getAttribute('data-is-favorite') === '1';

    if (openNoteWindows.size >= MAX_NOTE_WINDOWS) {
        alert(`You can only open up to ${MAX_NOTE_WINDOWS} note windows at once.`);
        return;
    }

    let fullNote = {
        id: existingNoteId ? parseInt(existingNoteId) : null,
        title: (tabNameEl ? tabNameEl.textContent : '')?.replace(/^⭐\s*/, '') || '',
        content: tabContentEl ? tabContentEl.textContent : '',
        is_favorite: tabIsFavorite,
        category_id: null
    };

    if (existingNoteId) {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            try {
                const response = await fetch(`../save_note.php?userEmail=${encodeURIComponent(userEmail)}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                if (data.success && data.notes) {
                    const noteFromDb = data.notes.find(n => n.id === parseInt(existingNoteId));
                    if (noteFromDb) {
                        fullNote = noteFromDb;
                    }
                }
            } catch (error) {
                console.error('Error loading note content:', error);
            }
        }
    }

    const windowId = `note-window-${++noteWindowCounter}`;
    const container = ensureNoteWindowContainer();
    const noteWindow = buildNoteWindowElement(windowId);
    container.appendChild(noteWindow);
    openNoteWindows.set(windowId, { el: noteWindow, noteId: fullNote.id, tabEl: noteTab, saveTimer: null, isSaving: false });
    makeWindowDraggable(noteWindow);
    attachNoteWindowBehavior(windowId, fullNote, noteTab);
}

function attachNoteWindowBehavior(windowId, noteData, noteTab) {
    const state = openNoteWindows.get(windowId);
    if (!state) return;
    const el = state.el;
    el.addEventListener('mousedown', () => bringWindowToFront(el));

    const titleEl = el.querySelector('.NoteCodeName');
    const contentEl = el.querySelector('.NoteCodeContent');
    const favoriteBtn = el.querySelector('.NoteFavoriteButton');
    const categorySelect = el.querySelector('.CategorySelect');
    const closeBtn = el.querySelector('.GoBackButton');
    const statusText = el.querySelector('.NoteCodeStatush1');

    titleEl.textContent = (noteData.title || 'Untitled').replace(/^⭐\s*/, '');
    contentEl.value = noteData.content || '';

    // Load categories into this select
    loadCategoriesIntoDropdown(categorySelect).then(() => {
        const noteCategoryId = noteData.category_id ? parseInt(noteData.category_id) : null;
        categorySelect.value = noteCategoryId || '';
    });

    // Set favorite button state
    const isFavorite = noteData.is_favorite == 1 || noteData.is_favorite === true || noteData.is_favorite === '1';
    if (isFavorite) {
        favoriteBtn.classList.add('favorited');
        favoriteBtn.textContent = '⭐';
    }

    const updateTabPreview = (title, content, favorite) => {
        const tabName = noteTab.querySelector('.NoteTabNamee');
        const tabContent = noteTab.querySelector('.NoteTabContent');
        if (tabName) {
            tabName.textContent = favorite ? `⭐ ${title}` : title;
        }
        if (tabContent) {
            const preview = content ? (content.length > 100 ? content.substring(0, 100) + '...' : content) : "No content";
            tabContent.textContent = preview;
        }
        noteTab.setAttribute('data-is-favorite', favorite ? '1' : '0');
    };

    const saveNote = async (showStatus = true) => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            console.warn('Cannot save note: userEmail missing.');
            return;
        }

        const payload = {
            userEmail,
            noteId: state.noteId,
            title: titleEl.textContent || '',
            content: contentEl.value || '',
            categoryId: categorySelect && categorySelect.value ? parseInt(categorySelect.value) : null,
            isFavorite: favoriteBtn.classList.contains('favorited')
        };

        if (state.isSaving) return;
        state.isSaving = true;
        if (statusText && showStatus) {
            statusText.textContent = 'Saving...';
            statusText.style.color = '#ffa500';
        }

        try {
            const response = await fetch('../save_note.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const text = await response.text();
            const data = JSON.parse(text);
            if (data.success) {
                state.noteId = data.noteId || state.noteId;
                if (state.noteId) {
                    noteTab.setAttribute('data-note-id', state.noteId);
                }
                updateTabPreview(payload.title, payload.content, payload.isFavorite);
                if (statusText && showStatus) {
                    statusText.textContent = 'Saved!';
                    statusText.style.color = '#4caf50';
                    setTimeout(() => {
                        if (statusText.textContent === 'Saved!') {
                            statusText.textContent = 'Auto-saved';
                            statusText.style.color = '#666';
                        }
                    }, 1500);
                }
            } else {
                throw new Error(data.error || 'Failed to save note');
            }
        } catch (error) {
            console.error('Error saving note:', error);
            if (statusText && showStatus) {
                statusText.textContent = 'Save failed';
                statusText.style.color = '#f44336';
            }
        } finally {
            state.isSaving = false;
        }
    };

    const scheduleSave = () => {
        if (state.saveTimer) {
            clearTimeout(state.saveTimer);
        }
        state.saveTimer = setTimeout(() => saveNote(false), 500);
    };

    titleEl.addEventListener('input', scheduleSave);
    contentEl.addEventListener('input', scheduleSave);
    categorySelect.addEventListener('change', () => saveNote(true));

    favoriteBtn.addEventListener('click', () => {
        const wasFavorite = favoriteBtn.classList.contains('favorited');
        if (wasFavorite) {
            favoriteBtn.classList.remove('favorited');
            favoriteBtn.textContent = '☆';
        } else {
            favoriteBtn.classList.add('favorited');
            favoriteBtn.textContent = '⭐';
        }
        saveNote(true);
    });

    closeBtn.addEventListener('click', async () => {
        await saveNote(true);
        if (state.saveTimer) {
            clearTimeout(state.saveTimer);
        }
        el.remove();
        openNoteWindows.delete(windowId);
    });
}

// ========== NOTE CREATION FUNCTIONS ==========

function OpenCreationSETUP() {
    try {
        const notewindowopen = document.getElementById('NoteCreationWindowSetup');
        const notewindowicon = document.getElementById('NoteCreationWindowSetup');
        const NoteWindowSetup1 = document.getElementById('noteCreationWindowSetup1ID');
        const NoteWindowSetup2 = document.getElementById('NoteCreatingQueneID');
        const notewindowiconpreview = document.getElementById('NoteIconPreviewCreationNoteID');
        const NoteWindowButtonExec = document.getElementById('MainButtonCreateFileExecute');
        const ThemeWindow = document.getElementById('NoteThemeHomeWindowElements');
        
        // Add null checks to prevent errors
        if (!notewindowopen || !notewindowicon || !NoteWindowSetup1 || !NoteWindowSetup2 || !notewindowiconpreview || !NoteWindowButtonExec) {
            console.error('Required elements not found in OpenCreationSETUP', {
                notewindowopen: !!notewindowopen,
                notewindowicon: !!notewindowicon,
                NoteWindowSetup1: !!NoteWindowSetup1,
                NoteWindowSetup2: !!NoteWindowSetup2,
                notewindowiconpreview: !!notewindowiconpreview,
                NoteWindowButtonExec: !!NoteWindowButtonExec
            });
            return;
        }
        
        notewindowopen.style.scale = "1.0";
        notewindowopen.style.opacity = "1";
        notewindowopen.style.zIndex = "400";
        notewindowicon.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.3)";
        notewindowicon.style.filter = "blur(0px)";
        
        if (notewindowiconpreview) {
            notewindowiconpreview.classList.add('animateFUNCTIONPreview1');
        }
        
        if (ThemeWindow) {
            ThemeWindow.style.transform = "scale(1)";
            ThemeWindow.style.opacity = "0";
            ThemeWindow.style.zIndex = "1";
            ThemeWindow.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.2)";
        }
        
        NoteWindowSetup1.style.zIndex = "400";
        NoteWindowSetup1.classList.toggle('TagsFadingINAnimation');
        NoteWindowSetup2.style.zIndex = "1";
        NoteWindowButtonExec.disabled = true;
        
        setTimeout(() => {
            if (NoteWindowButtonExec) {
                NoteWindowButtonExec.disabled = true;
            }
            if (notewindowiconpreview) {
                notewindowiconpreview.classList.toggle('animateFUNCTIONPreview1');
            }
        }, 500);
    } catch (error) {
        console.error('Error in OpenCreationSETUP:', error);
    }
};

function CloseCreationSETUP() {
    const notewindowopen = document.getElementById('NoteCreationWindowSetup');
    const notewindowicon = document.getElementById('NoteCreationWindowSetup');
    const noteinputtext = document.getElementById('NoteInputSaveDataID');
    const NoteWindowButtonExec = document.getElementById('MainButtonCreateFileExecute');
    const notewindowiconpreview = document.getElementById('NoteIconPreviewCreationNoteID');
    
    // Add null checks
    if (!notewindowopen || !notewindowicon || !NoteWindowButtonExec) {
        console.error('Required elements not found in CloseCreationSETUP');
        return;
    }
    
    if (NoteWindowButtonExec) {
        NoteWindowButtonExec.disabled = false;
    }
    if (notewindowopen) {
        notewindowopen.style.zIndex = "1";
        notewindowopen.style.scale = "0.7";
        notewindowopen.style.opacity = "0";
    }
    if (noteinputtext) {
        noteinputtext.value = '';
    }
    if (notewindowicon) {
        notewindowicon.style.transition = "all 0.2s cubic-bezier(0.1, 0, 0.1, 1.0)";
        notewindowicon.style.filter = "blur(5px)";
    }
    if (notewindowiconpreview) {
        notewindowiconpreview.classList.remove('animateFUNCTIONPreview1');
    }
};

// FOR GETTING INFO OF THE TITLE OF THE NOTE KINEMERUT //

function GettingINFOEntered() {
    try {
        // Ensure notenumbercreation is defined
        if (typeof notenumbercreation === 'undefined') {
            notenumbercreation = 0;
        }
        
        const NoteWindowSetupMAIN = document.getElementById('NoteCreationWindowSetup');
        const NoteWindowSetup1 = document.getElementById('noteCreationWindowSetup1ID');
        const NoteWindowSetup2 = document.getElementById('NoteCreatingQueneID');
        const noteinputname = document.getElementById('NoteInputSaveDataID');
        const noteloadinginfoH1 = document.getElementById('infoCreationSetupH1ID');
        const NoteCodeNameID = document.getElementById('NoteCodeNameID');
        const NoteCodeContent = document.getElementById('NoteCodeContentID');
        
        // Add null checks
        if (!NoteWindowSetupMAIN || !NoteWindowSetup1 || !NoteWindowSetup2 || !noteinputname || !noteloadinginfoH1 || !NoteCodeNameID || !NoteCodeContent) {
            console.error('Required elements not found in GettingINFOEntered');
            return;
        }
        
        let notenameinfocreation = noteinputname.value;
   
    
    // closing the creation of the note window //
    



    if (noteinputname.value === "") {
        noteinputname.style.border = "2px solid red";
        setTimeout(() => {
            noteinputname.style.border = "2px solid rgba(0, 0, 0, 0.5)";
        }, 900);
    } else {
        //calling out the main window of the note lists//
        const NoteGridLayoutWindowCreation = document.getElementById('UncategorizedList');
        if (!NoteGridLayoutWindowCreation) {
            console.error('UncategorizedList element not found');
            return;
        }
        
        // Ensure notenumbercreation is defined before incrementing
        if (typeof notenumbercreation === 'undefined') {
            notenumbercreation = 0;
        }
        notenumbercreation++;
        
        // Check if a tab with this title already exists (to prevent duplicates)
        const existingTabs = document.querySelectorAll('.NoteTab');
        let existingTab = null;
        for (let tab of existingTabs) {
            const tabName = tab.querySelector('.NoteTabNamee');
            if (tabName && tabName.textContent === notenameinfocreation) {
                const tabId = tab.getAttribute('data-note-id');
                // Only match if it doesn't have an ID yet (new note)
                if (!tabId) {
                    existingTab = tab;
                    break;
                }
            }
        }
        
        // Create note tab using reusable function only if it doesn't exist
        let newNoteTab;
        if (!existingTab) {
            newNoteTab = createNoteTab(null, notenameinfocreation, '');
            if (!newNoteTab) {
                console.error('Failed to create note tab');
                return;
            }
            currentNoteTab = newNoteTab;
        } else {
            newNoteTab = existingTab;
            currentNoteTab = existingTab;
        }
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
            
            // Set the note content in the interface
            if (NoteCodeNameID) {
                NoteCodeNameID.textContent = notenameinfocreation;
            }

            // Use the note tab that was already created earlier (or find existing one)
            let NoteTab = currentNoteTab;
            if (!NoteTab) {
                // Fallback: find by title
                const allTabs = document.querySelectorAll('.NoteTab');
                for (let tab of allTabs) {
                    const tabName = tab.querySelector('.NoteTabNamee');
                    if (tabName && tabName.textContent === notenameinfocreation) {
                        const tabId = tab.getAttribute('data-note-id');
                        if (!tabId) {
                            NoteTab = tab;
                            currentNoteTab = tab;
                            break;
                        }
                    }
                }
            }
            
            if (!NoteTab) {
                console.error('Failed to find or create note tab');
                return;
            }

            if (ThemeWindow) {
                ThemeWindow.style.scale = "1.0";
            }

            // Get references to tab elements for animation
            const NoteTabNamee = NoteTab.querySelector('.NoteTabNamee');
            const NoteTabContent = NoteTab.querySelector('.NoteTabContent');

            NoteTab.style.opacity = "0";
            NoteTab.style.scale = "0.5";
            setTimeout(() => {
                NoteTab.style.opacity = "0";
                NoteTab.style.scale = "0.7";
                NoteTab.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.0)";
                CloseCreationSETUP();
                setTimeout(() => {
                    NoteTab.style.opacity = "1";
                    NoteTab.style.scale = "1.0";
                    NoteTab.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.0)";
                    CloseCreationSETUP();

                    // Automatically open the new note in a floating editor window
                    openNoteWindowForTab(NoteTab, NoteTabNamee, NoteTabContent);
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
    
        // Check for "No notes" text element (if it exists)
        // Ensure notenumbercreation is defined (defensive check)
        if (typeof notenumbercreation === 'undefined') {
            notenumbercreation = 0;
        }
        
        const NoNoteCreatedText = document.getElementById('NoNoteCreatedText');
        if (NoNoteCreatedText) {
            if (notenumbercreation === 0) {
                NoNoteCreatedText.style.opacity = "1";
            } else if (notenumbercreation > 0) {
                NoNoteCreatedText.style.opacity = "0";
            }
        }
    } catch (error) {
        console.error('Error in GettingINFOEntered:', error);
    }
}

//Closing the MainCodeInterface //

//for opening the interface//

// Tracks whether any organized note list has been created


// ========== NOTE LOADING AND DISPLAY FUNCTIONS ==========

// Function to create a note tab element (reusable)
function createNoteTab(noteId, title, content, isFavorite = false) {
    const NoteGridLayoutWindowCreation = document.getElementById('UncategorizedList');
    if (!NoteGridLayoutWindowCreation) {
        console.error('UncategorizedList element not found');
        return null;
    }

    const NoteTab = document.createElement('button');
    const NoteTabNamee = document.createElement('h1');
    const NoteTabOpenButton = document.createElement('button');
    const NoteTabDeleteButton = document.createElement('button');
    const NoteTabContent = document.createElement('p');

    NoteTab.classList.add('NoteTab');
    NoteTabNamee.classList.add('NoteTabNamee');
    NoteTabDeleteButton.classList.add('NoteTabDeleteButton');
    NoteTabOpenButton.classList.add('NoteTabOpenButton');
    NoteTabContent.classList.add('NoteTabContent');
    
    // Show star icon if favorited (visual indicator only, no button)
    // Remove any existing star from title to prevent duplication
    const cleanTitle = title.replace(/^⭐\s*/, '');
    if (isFavorite) {
        NoteTabNamee.textContent = '⭐ ' + cleanTitle;
    } else {
        NoteTabNamee.textContent = cleanTitle;
    }
    
    NoteTabOpenButton.textContent = "Open";
    NoteTabDeleteButton.textContent = "Delete";
    // Show preview of content (first 100 characters)
    const contentPreview = content ? (content.length > 100 ? content.substring(0, 100) + '...' : content) : "No content";
    NoteTabContent.textContent = contentPreview;
    
    // Store note ID and favorite state in the tab
    if (noteId) {
        NoteTab.setAttribute('data-note-id', noteId);
    }
    NoteTab.setAttribute('data-is-favorite', isFavorite ? '1' : '0');

    NoteGridLayoutWindowCreation.appendChild(NoteTab);
    NoteTab.appendChild(NoteTabOpenButton);
    NoteTab.appendChild(NoteTabContent);
    NoteTab.appendChild(NoteTabNamee);
    NoteTab.appendChild(NoteTabDeleteButton);

    // Add delete functionality
    NoteTabDeleteButton.addEventListener('click', async () => {
        const NoteCodeNameID = document.getElementById('NoteCodeNameID');
        const NoteCodeContentInterface = document.getElementById('NoteCodeContentID');
        const NoteInterfaceCodeMainID = document.getElementById('NoteInterfaceCodeMainID');

        // Stop auto-save before deleting
        stopAutoSave();

        // Delete from database if note ID exists
        const tabNoteId = NoteTab.getAttribute('data-note-id');
        if (tabNoteId) {
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                try {
                    await fetch('../delete_note.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userEmail: userEmail,
                            noteId: parseInt(tabNoteId)
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

        setTimeout(() => {
            NoteTab.remove();
            if (typeof notenumbercreation !== 'undefined' && notenumbercreation > 0) {
                notenumbercreation--;
            }
            if (NoteCodeNameID) {
                NoteCodeNameID.textContent = '';
            }
            if (NoteCodeContentInterface) {
                NoteCodeContentInterface.value = '';
            }
            if (NoteInterfaceCodeMainID) {
                NoteInterfaceCodeMainID.style.opacity = "0";
                NoteInterfaceCodeMainID.style.scale = "0.9";
                NoteInterfaceCodeMainID.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1.0)";

                setTimeout(() => {
                    NoteInterfaceCodeMainID.style.scale = "0";
                }, 400);
            }
        }, 300);
    });

    // Add open functionality (now spawns a floating editor window; up to 3 at once)
    NoteTabOpenButton.addEventListener('click', async () => {
        await openNoteWindowForTab(NoteTab, NoteTabNamee, NoteTabContent);
    });

    // Add go back button functionality
    const GoBackButtonNoteInterfaceID = document.getElementById('GoBackButtonNoteInterfaceID');
    if (GoBackButtonNoteInterfaceID) {
        // Remove existing listeners by cloning (or use a flag)
        const newGoBackButton = GoBackButtonNoteInterfaceID.cloneNode(true);
        GoBackButtonNoteInterfaceID.parentNode.replaceChild(newGoBackButton, GoBackButtonNoteInterfaceID);
        
        newGoBackButton.addEventListener('click', () => {
            const NoteCodeNameID = document.getElementById('NoteCodeNameID');
            const NoteCodeContent = document.getElementById('NoteCodeContentID');
            const NoteInterfaceCodeMainID = document.getElementById('NoteInterfaceCodeMainID');

            // Save before closing
            stopAutoSave();

            // Update note tab with current content
            if (NoteCodeNameID && NoteTabNamee) {
                NoteTabNamee.textContent = NoteCodeNameID.textContent;
            }
            if (NoteCodeContent && NoteTabContent) {
                const content = NoteCodeContent.value;
                // Show preview of content (first 100 characters)
                const contentPreview = content ? (content.length > 100 ? content.substring(0, 100) + '...' : content) : "No content";
                NoteTabContent.textContent = contentPreview;
            }

            // Animate closing
            if (NoteInterfaceCodeMainID) {
                NoteInterfaceCodeMainID.style.scale = "0.7";
                NoteInterfaceCodeMainID.style.opacity = "0";
                NoteInterfaceCodeMainID.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1.1)";

                setTimeout(() => {
                    NoteInterfaceCodeMainID.style.scale = "0";
                }, 500);
            }
        });
    }

    return NoteTab;
}

// Function to load notes from database
async function loadNotesFromDatabase(categoryId = null) {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        console.warn('Cannot load notes: userEmail not found in localStorage');
        return;
    }

    try {
        // Build URL with optional category filter
        let url = `../save_note.php?userEmail=${encodeURIComponent(userEmail)}`;
        if (categoryId !== null && categoryId !== undefined) {
            url += `&categoryId=${categoryId}`;
        }
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        if (!text) {
            throw new Error('Empty response from server');
        }

        let data;
        try {
            data = JSON.parse(text);
        } catch (parseError) {
            console.error('Failed to parse JSON response:', text);
            return;
        }

        if (data.success && data.notes && Array.isArray(data.notes)) {
            const NoteGridLayoutWindowCreation = document.getElementById('UncategorizedList');
            if (!NoteGridLayoutWindowCreation) {
                console.error('UncategorizedList element not found');
                return;
            }

            // Clear ALL existing notes in this container when loading filtered notes
            // Use fade-out animation for better UX
            const existingTabs = NoteGridLayoutWindowCreation.querySelectorAll('.NoteTab');
            existingTabs.forEach((tab, index) => {
                tab.style.transition = "all 0.2s ease-out";
                tab.style.opacity = "0";
                tab.style.transform = "scale(0.9)";
                setTimeout(() => tab.remove(), 200 + (index * 10));
            });

            // Wait for fade-out before adding new notes
            setTimeout(() => {
                // Filter notes by category if categoryId is specified
                let notesToDisplay = data.notes;
                if (categoryId !== null && categoryId !== undefined && categoryId !== 'favorites') {
                    // Filter to show only notes in this category
                    notesToDisplay = data.notes.filter(note => {
                        const noteCategoryId = note.category_id ? parseInt(note.category_id) : null;
                        return noteCategoryId === parseInt(categoryId);
                    });
                } else if (categoryId === null || categoryId === undefined) {
                    // Show only uncategorized notes (no category_id or null category_id)
                    notesToDisplay = data.notes.filter(note => {
                        const noteCategoryId = note.category_id;
                        return !noteCategoryId || noteCategoryId === null || noteCategoryId === '' || noteCategoryId === 0;
                    });
                }

                // Sort notes: favorites first, then by updated_at DESC
                const sortedNotes = [...notesToDisplay].sort((a, b) => {
                    // Favorites first - handle different data types
                    const aFavorite = (a.is_favorite == 1 || a.is_favorite === true || a.is_favorite === 1 || a.is_favorite === '1') ? 1 : 0;
                    const bFavorite = (b.is_favorite == 1 || b.is_favorite === true || b.is_favorite === 1 || b.is_favorite === '1') ? 1 : 0;
                    if (aFavorite !== bFavorite) {
                        return bFavorite - aFavorite; // Favorites come first
                    }
                    // Then by updated_at DESC
                    const aDate = new Date(a.updated_at || a.created_at || 0);
                    const bDate = new Date(b.updated_at || b.created_at || 0);
                    return bDate - aDate;
                });

                // Load each note with fade-in animation
                sortedNotes.forEach((note, index) => {
                    // Check if note already exists in THIS container (not globally)
                    const existingTab = NoteGridLayoutWindowCreation.querySelector(`[data-note-id="${note.id}"]`);
                    if (!existingTab) {
                        // Determine if note is favorited - handle different data types
                        const isFav = note.is_favorite;
                        const isFavorite = isFav == 1 || isFav === true || isFav === 1 || isFav === '1' || (typeof isFav === 'string' && isFav.toLowerCase() === 'true');
                        const noteTab = createNoteTab(note.id, note.title, note.content, isFavorite);
                        if (noteTab) {
                            // Start with hidden state for fade-in
                            noteTab.style.opacity = "0";
                            noteTab.style.transform = "scale(0.9)";
                            setTimeout(() => {
                                noteTab.style.transition = "all 0.3s ease-out";
                                noteTab.style.opacity = "1";
                                noteTab.style.transform = "scale(1)";
                            }, index * 30); // Stagger animation
                            notenumbercreation++;
                        }
                    }
                });

                console.log(`Loaded ${sortedNotes.length} notes from database (filtered from ${data.notes.length} total)`);
            }, 250);
        } else {
            console.warn('No notes found or invalid response:', data);
        }
    } catch (error) {
        console.error('Error loading notes from database:', error);
    }
}

// Function to load categories into a dropdown selector (can accept a specific select)
async function loadCategoriesIntoDropdown(targetSelect = document.getElementById('NoteCategorySelect')) {
    const categorySelect = targetSelect;
    if (!categorySelect) {
        return;
    }

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        return;
    }

    try {
        const response = await fetch(`../categories.php?userEmail=${encodeURIComponent(userEmail)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        if (data.success && data.categories) {
            // Clear existing options except "Uncategorized"
            categorySelect.innerHTML = '<option value="">Uncategorized</option>';
            
            // Add each category as an option
            data.categories.forEach((category) => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading categories into dropdown:', error);
    }
}

// Floating window helpers removed; existing interface is now draggable

// Store user info in localStorage (if available)
// This runs when the page loads to initialize user data
document.addEventListener('DOMContentLoaded', function() {
    // Try to get email from various possible sources
    const emailInput = document.getElementById('Email');
    const profileEmailElement = document.querySelector('.ProfileEmail');
    const profileNameElement = document.getElementById('ProfileName');
    
    // Check if userEmail already exists in localStorage
    if (!localStorage.getItem('userEmail')) {
        // Try to get from email input
        if (emailInput && emailInput.value) {
            localStorage.setItem('userEmail', emailInput.value);
        }
        // Try to get from profile email element
        else if (profileEmailElement && profileEmailElement.textContent) {
            const email = profileEmailElement.textContent.trim();
            if (email && email !== 'User@email.com') {
                localStorage.setItem('userEmail', email);
            }
        }
    }
    
    // Store profile name if available
    if (profileNameElement && profileNameElement.textContent) {
        const profileName = profileNameElement.textContent.trim();
        if (profileName && profileName !== 'User') {
            localStorage.setItem('profileName', profileName);
        }
    }
    
    // Load categories into dropdown
    setTimeout(() => {
        loadCategoriesIntoDropdown();
    }, 300);
    
    // Load notes from database after a short delay to ensure DOM is ready
    setTimeout(() => {
        // Check if we're viewing a category
        const categoryId = (typeof currentCategoryFilter !== 'undefined' && currentCategoryFilter !== null) ? currentCategoryFilter : null;
        loadNotesFromDatabase(categoryId);
    }, 500);
    
    // Add event listener to category dropdown to save when changed
    setTimeout(() => {
        const categorySelect = document.getElementById('NoteCategorySelect');
        if (categorySelect) {
            // Store the old category value - will be updated when note is opened
            let oldCategoryId = categorySelect.value || null;
            
            // Update oldCategoryId when note is opened (this will be called from the open handler)
            const updateOldCategoryId = () => {
                if (categorySelect) {
                    oldCategoryId = categorySelect.value || null;
                }
            };
            
            categorySelect.addEventListener('change', async () => {
                // Get the new category value
                const newCategoryId = categorySelect.value ? parseInt(categorySelect.value) : null;
                
                // Save note with new category
                const NoteCodeNameID = document.getElementById('NoteCodeNameID');
                const NoteCodeContent = document.getElementById('NoteCodeContentID');
                if (NoteCodeNameID && NoteCodeContent && currentNoteId) {
                    const currentTitle = NoteCodeNameID.textContent || '';
                    const currentContent = NoteCodeContent.value || '';
                    
                    // Save the note with new category
                    const saveResult = await saveNoteToDatabase(currentNoteId, currentTitle, currentContent, true).catch(error => {
                        console.error('Error saving category change:', error);
                        return null;
                    });
                    
                    if (saveResult === null) {
                        // Save failed, revert dropdown
                        categorySelect.value = oldCategoryId || '';
                        return;
                    }
                    
                    // Remove note from current view if it no longer belongs to the current category
                    const currentFilter = (typeof currentCategoryFilter !== 'undefined' && currentCategoryFilter !== null && currentCategoryFilter !== 'favorites') ? parseInt(currentCategoryFilter) : null;
                    const oldCategoryIdInt = oldCategoryId ? parseInt(oldCategoryId) : null;
                    
                    // If viewing a specific category and note was moved to a different category, remove it
                    if (currentFilter !== null && oldCategoryIdInt === currentFilter && newCategoryId !== currentFilter) {
                        // Remove the note tab from the current view
                        const noteTab = document.querySelector(`[data-note-id="${currentNoteId}"]`);
                        if (noteTab) {
                            noteTab.style.transition = "all 0.3s ease-out";
                            noteTab.style.opacity = "0";
                            noteTab.style.transform = "scale(0.8)";
                            setTimeout(() => {
                                noteTab.remove();
                                if (typeof notenumbercreation !== 'undefined' && notenumbercreation > 0) {
                                    notenumbercreation--;
                                }
                            }, 300);
                        }
                    }
                    // If viewing uncategorized (null) and note was moved to a category, remove it
                    else if (currentFilter === null && oldCategoryIdInt === null && newCategoryId !== null) {
                        const noteTab = document.querySelector(`[data-note-id="${currentNoteId}"]`);
                        if (noteTab) {
                            noteTab.style.transition = "all 0.3s ease-out";
                            noteTab.style.opacity = "0";
                            noteTab.style.transform = "scale(0.8)";
                            setTimeout(() => {
                                noteTab.remove();
                                if (typeof notenumbercreation !== 'undefined' && notenumbercreation > 0) {
                                    notenumbercreation--;
                                }
                            }, 300);
                        }
                    }
                    
                    // Reload notes for the current category view to ensure accuracy
                    if (currentCategoryFilter === 'favorites') {
                        if (typeof loadFavoriteNotes === 'function') {
                            loadFavoriteNotes();
                        }
                    } else {
                        loadNotesFromDatabase(currentFilter);
                    }
                    
                    // Update old category ID for next change
                    oldCategoryId = newCategoryId;
                }
            });
            
            // Store the update function globally so it can be called when note is opened
            window.updateOldCategoryId = updateOldCategoryId;
        }
        
        // Add event listener to favorite button
        const favoriteButton = document.getElementById('NoteFavoriteButton');
        if (favoriteButton) {
            // Store original favorite state
            let originalFavoriteState = favoriteButton.classList.contains('favorited');
            
            // Update original state when note is opened
            const updateOriginalFavoriteState = () => {
                if (favoriteButton) {
                    originalFavoriteState = favoriteButton.classList.contains('favorited');
                }
            };
            
            favoriteButton.addEventListener('click', async (e) => {
                e.stopPropagation(); // Prevent any bubbling
                
                const NoteCodeNameID = document.getElementById('NoteCodeNameID');
                const NoteCodeContent = document.getElementById('NoteCodeContentID');
                if (NoteCodeNameID && NoteCodeContent && currentNoteId) {
                    const currentTitle = NoteCodeNameID.textContent || '';
                    const currentContent = NoteCodeContent.value || '';
                    const wasFavorite = favoriteButton.classList.contains('favorited');
                    
                    // Toggle favorite state in UI immediately for better UX
                    if (wasFavorite) {
                        favoriteButton.classList.remove('favorited');
                        favoriteButton.textContent = '☆';
                    } else {
                        favoriteButton.classList.add('favorited');
                        favoriteButton.textContent = '⭐';
                    }
                    
                    // Save to database
                    const saveResult = await saveNoteToDatabase(currentNoteId, currentTitle, currentContent, true).catch(error => {
                        console.error('Error saving favorite status:', error);
                        return null;
                    });
                    
                    if (saveResult === null) {
                        // Save failed, revert button state
                        if (wasFavorite) {
                            favoriteButton.classList.add('favorited');
                            favoriteButton.textContent = '⭐';
                        } else {
                            favoriteButton.classList.remove('favorited');
                            favoriteButton.textContent = '☆';
                        }
                        return;
                    }
                    
                    // Update note tab star indicator
                    const noteTab = document.querySelector(`[data-note-id="${currentNoteId}"]`);
                    if (noteTab) {
                        const tabName = noteTab.querySelector('.NoteTabNamee');
                        if (tabName) {
                            if (!wasFavorite) {
                                // Now favorited - add star to title
                                if (!tabName.textContent.startsWith('⭐')) {
                                    tabName.textContent = '⭐ ' + tabName.textContent;
                                }
                            } else {
                                // No longer favorited - remove star from title
                                tabName.textContent = tabName.textContent.replace(/^⭐\s*/, '');
                            }
                        }
                        noteTab.setAttribute('data-is-favorite', !wasFavorite ? '1' : '0');
                    }
                    
                    // If viewing favorites and note was unfavorited, remove it immediately
                    if (currentCategoryFilter === 'favorites' && wasFavorite) {
                        const noteTab = document.querySelector(`[data-note-id="${currentNoteId}"]`);
                        if (noteTab) {
                            noteTab.style.transition = "all 0.3s ease-out";
                            noteTab.style.opacity = "0";
                            noteTab.style.transform = "scale(0.8)";
                            setTimeout(() => {
                                noteTab.remove();
                                if (typeof notenumbercreation !== 'undefined' && notenumbercreation > 0) {
                                    notenumbercreation--;
                                }
                            }, 300);
                        }
                    } else {
                        // Reload notes to update sorting and ensure consistency
                        if (currentCategoryFilter === 'favorites') {
                            if (typeof loadFavoriteNotes === 'function') {
                                loadFavoriteNotes();
                            }
                        } else {
                            const categoryId = (typeof currentCategoryFilter !== 'undefined' && currentCategoryFilter !== null) ? currentCategoryFilter : null;
                            loadNotesFromDatabase(categoryId);
                        }
                    }
                    
                    // Update original state
                    originalFavoriteState = !wasFavorite;
                }
            });
            
            // Store the update function globally
            window.updateOriginalFavoriteState = updateOriginalFavoriteState;
        }
    }, 500);
    
    // Add refresh button functionality (if refresh button exists)
    const refreshButton = document.getElementById('RefreshNotesButton');
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            loadNotesFromDatabase();
        });
    }
    
    // Auto-refresh notes every 30 seconds (optional)
    setInterval(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            loadNotesFromDatabase();
        }
    }, 30000);

    // Make the main note interface draggable (uses the existing UI only)
    makeNoteInterfaceDraggable();
});

// ========== AUTO-SAVE FUNCTIONALITY ==========

// Global variables for auto-save
let autoSaveInterval = null;
let currentNoteId = null;
let currentNoteTab = null; // Track the current note tab element
let lastSavedContent = '';
let lastSavedTitle = '';
let isSaving = false;
let inputEventListeners = new Map(); // Track input listeners to prevent duplicates

// Function to save note to database
async function saveNoteToDatabase(noteId, title, content, showStatus = true) {
    if (isSaving) return; // Prevent concurrent saves
    
    let userEmail = localStorage.getItem('userEmail');
    
    // If userEmail is not in localStorage, try to get it from the page
    if (!userEmail) {
        const emailInput = document.getElementById('Email');
        const profileEmailElement = document.querySelector('.ProfileEmail');
        
        if (emailInput && emailInput.value) {
            userEmail = emailInput.value;
            localStorage.setItem('userEmail', userEmail);
        } else if (profileEmailElement && profileEmailElement.textContent) {
            const email = profileEmailElement.textContent.trim();
            if (email && email !== 'User@email.com') {
                userEmail = email;
                localStorage.setItem('userEmail', userEmail);
            }
        }
    }
    
    if (!userEmail) {
        console.warn('User email not found in localStorage or page elements. Note will not be saved to database.');
        // Still allow the note to be created locally, just won't save to DB
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
        // Path to save_note.php (it's in the root, MainHomeSection.html is in MainOptions/)
        // Get category from dropdown selector
        const categorySelect = document.getElementById('NoteCategorySelect');
        let categoryId = null;
        if (categorySelect && categorySelect.value) {
            const selectedValue = categorySelect.value;
            categoryId = selectedValue ? parseInt(selectedValue) : null;
        } else {
            // Fallback to current category filter if dropdown not available
            categoryId = (typeof currentCategoryFilter !== 'undefined' && currentCategoryFilter !== null) ? currentCategoryFilter : null;
        }
        
        // Get favorite status from button
        const favoriteButton = document.getElementById('NoteFavoriteButton');
        let isFavorite = false;
        if (favoriteButton) {
            isFavorite = favoriteButton.classList.contains('favorited');
        }
        
        const response = await fetch('../save_note.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: userEmail,
                noteId: noteId,
                title: title,
                content: content,
                categoryId: categoryId,
                isFavorite: isFavorite
            })
        });

        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if response has content
        const text = await response.text();
        if (!text) {
            throw new Error('Empty response from server');
        }

        let data;
        try {
            data = JSON.parse(text);
        } catch (parseError) {
            console.error('Failed to parse JSON response:', text);
            throw new Error('Invalid JSON response from server');
        }

        if (data.success) {
            // Update note ID if it's a new note
            const savedNoteId = data.noteId;
            
            if (!noteId && savedNoteId) {
                currentNoteId = savedNoteId;
                // Update the current note tab with the new ID
                if (currentNoteTab) {
                    currentNoteTab.setAttribute('data-note-id', savedNoteId);
                } else {
                    // Find the NoteTab that matches (by checking if it's the currently active one)
                    const NoteCodeNameID = document.getElementById('NoteCodeNameID');
                    if (NoteCodeNameID) {
                        const noteTitle = NoteCodeNameID.textContent;
                        // Find tab by matching current title and no ID, or use currentNoteTab
                        const allNoteTabs = document.querySelectorAll('.NoteTab');
                        for (let tab of allNoteTabs) {
                            const tabName = tab.querySelector('.NoteTabNamee');
                            const tabId = tab.getAttribute('data-note-id');
                            // Match by title and ensure it doesn't already have an ID
                            if (tabName && tabName.textContent === noteTitle && !tabId) {
                                tab.setAttribute('data-note-id', savedNoteId);
                                currentNoteTab = tab;
                                break;
                            }
                        }
                    }
                }
            } else if (savedNoteId) {
                currentNoteId = savedNoteId;
            }
            
            // Update the note tab content preview after saving (always use currentNoteTab or find by ID)
            const NoteCodeNameID = document.getElementById('NoteCodeNameID');
            const NoteCodeContent = document.getElementById('NoteCodeContentID');
            
            if (NoteCodeNameID && NoteCodeContent) {
                const noteTitle = NoteCodeNameID.textContent;
                const noteContent = NoteCodeContent.value;
                
                // Use currentNoteTab if available, otherwise find by ID
                let tabToUpdate = currentNoteTab;
                
                if (!tabToUpdate && currentNoteId) {
                    // Find by ID
                    tabToUpdate = document.querySelector(`[data-note-id="${currentNoteId}"]`);
                }
                
                if (!tabToUpdate) {
                    // Fallback: find by title (only if no ID exists)
                    const allNoteTabs = document.querySelectorAll('.NoteTab');
                    for (let tab of allNoteTabs) {
                        const tabName = tab.querySelector('.NoteTabNamee');
                        const tabId = tab.getAttribute('data-note-id');
                        if (tabName && tabName.textContent === noteTitle && !tabId) {
                            tabToUpdate = tab;
                            break;
                        }
                    }
                }
                
                // Update the tab if found
                if (tabToUpdate) {
                    const tabName = tabToUpdate.querySelector('.NoteTabNamee');
                    const tabContent = tabToUpdate.querySelector('.NoteTabContent');
                    
                    if (tabName) {
                        tabName.textContent = noteTitle;
                    }
                    if (tabContent) {
                        const contentPreview = noteContent ? (noteContent.length > 100 ? noteContent.substring(0, 100) + '...' : noteContent) : "No content";
                        tabContent.textContent = contentPreview;
                    }
                    // Ensure ID is set
                    if (currentNoteId && !tabToUpdate.getAttribute('data-note-id')) {
                        tabToUpdate.setAttribute('data-note-id', currentNoteId);
                    }
                    currentNoteTab = tabToUpdate;
                }
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
    
    // Find and set current note tab
    if (noteId) {
        currentNoteTab = document.querySelector(`[data-note-id="${noteId}"]`);
    } else {
        // Find by title if no ID yet
        const allTabs = document.querySelectorAll('.NoteTab');
        for (let tab of allTabs) {
            const tabName = tab.querySelector('.NoteTabNamee');
            if (tabName && tabName.textContent === title) {
                const tabId = tab.getAttribute('data-note-id');
                if (!tabId) {
                    currentNoteTab = tab;
                    break;
                }
            }
        }
    }

    // Save immediately (don't await, let it run in background)
    saveNoteToDatabase(noteId, title, content, true).catch(error => {
        console.error('Error in initial save:', error);
    });

    // Set up periodic auto-save (every 3 seconds)
    autoSaveInterval = setInterval(() => {
        try {
            const NoteCodeNameID = document.getElementById('NoteCodeNameID');
            const NoteCodeContent = document.getElementById('NoteCodeContentID');
            
            if (NoteCodeNameID && NoteCodeContent) {
                const currentTitle = NoteCodeNameID.textContent || '';
                const currentContent = NoteCodeContent.value || '';
                
                // Only save if content has changed
                if (currentTitle !== lastSavedTitle || currentContent !== lastSavedContent) {
                    saveNoteToDatabase(currentNoteId, currentTitle, currentContent, false).catch(error => {
                        console.error('Error in auto-save:', error);
                    });
                }
            }
        } catch (error) {
            console.error('Error in auto-save interval:', error);
        }
    }, 3000);

    // Set up event listeners for immediate save on change
    const NoteCodeNameID = document.getElementById('NoteCodeNameID');
    const NoteCodeContent = document.getElementById('NoteCodeContentID');

    // Remove any existing listeners for this element
    if (NoteCodeContent && inputEventListeners.has(NoteCodeContent)) {
        const oldHandler = inputEventListeners.get(NoteCodeContent);
        NoteCodeContent.removeEventListener('input', oldHandler);
    }

    if (NoteCodeContent) {
        // Save on every input change (no debounce for immediate saving)
        const handleInput = () => {
            try {
                const currentTitle = NoteCodeNameID ? NoteCodeNameID.textContent : '';
                const currentContent = NoteCodeContent.value || '';
                // Save immediately on every input
                saveNoteToDatabase(currentNoteId, currentTitle, currentContent, false).catch(error => {
                    console.error('Error in input save:', error);
                });
            } catch (error) {
                console.error('Error in input handler:', error);
            }
        };
        NoteCodeContent.addEventListener('input', handleInput);
        inputEventListeners.set(NoteCodeContent, handleInput);
    }
    
    // Also save when title changes (if it's editable)
    if (NoteCodeNameID && NoteCodeNameID.contentEditable !== 'false') {
        const handleTitleChange = () => {
            try {
                const currentTitle = NoteCodeNameID.textContent || '';
                const NoteCodeContent = document.getElementById('NoteCodeContentID');
                const currentContent = NoteCodeContent ? NoteCodeContent.value : '';
                saveNoteToDatabase(currentNoteId, currentTitle, currentContent, false).catch(error => {
                    console.error('Error in title save:', error);
                });
            } catch (error) {
                console.error('Error in title handler:', error);
            }
        };
        NoteCodeNameID.addEventListener('input', handleTitleChange);
        NoteCodeNameID.addEventListener('blur', handleTitleChange);
    }
}

// Function to stop auto-save
function stopAutoSave() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    }
    
    // Save one final time before stopping
    try {
        const NoteCodeNameID = document.getElementById('NoteCodeNameID');
        const NoteCodeContent = document.getElementById('NoteCodeContentID');
        
        if (NoteCodeNameID && NoteCodeContent) {
            const currentTitle = NoteCodeNameID.textContent || '';
            const currentContent = NoteCodeContent.value || '';
            if (currentTitle || currentContent) {
                saveNoteToDatabase(currentNoteId, currentTitle, currentContent, true).catch(error => {
                    console.error('Error in final save:', error);
                });
            }
        }
    } catch (error) {
        console.error('Error in stopAutoSave:', error);
    }
}

// Save before page unload
window.addEventListener('beforeunload', () => {
    stopAutoSave();
});

// Drag support for the existing note interface window
function makeNoteInterfaceDraggable() {
    const noteEl = document.getElementById('NoteInterfaceCodeMainID');
    if (!noteEl) return;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const onMouseMove = (e) => {
        if (!isDragging) return;
        const newLeft = e.clientX - offsetX;
        const newTop = e.clientY - offsetY;
        noteEl.style.left = `${newLeft}px`;
        noteEl.style.top = `${newTop}px`;
        noteEl.style.translate = '0 0';
    };

    const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    noteEl.addEventListener('mousedown', (e) => {
        // ignore drags that start on inputs/textareas to keep editing easy
        const target = e.target;
        if (target && (target.tagName === 'TEXTAREA' || target.isContentEditable || target.tagName === 'SELECT' || target.tagName === 'BUTTON' || target.tagName === 'OPTION')) {
            return;
        }
        isDragging = true;
        const rect = noteEl.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        // ensure positioning uses current screen coordinates
        noteEl.style.position = 'absolute';
        noteEl.style.left = `${rect.left}px`;
        noteEl.style.top = `${rect.top}px`;
        noteEl.style.translate = '0 0';
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}

// Reusable drag helper for floating windows
function makeWindowDraggable(windowEl) {
    if (!windowEl) return;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const onMouseMove = (e) => {
        if (!isDragging) return;
        const newLeft = e.clientX - offsetX;
        const newTop = e.clientY - offsetY;
        windowEl.style.left = `${newLeft}px`;
        windowEl.style.top = `${newTop}px`;
        windowEl.style.translate = '0 0';
    };

    const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    windowEl.addEventListener('mousedown', (e) => {
        const target = e.target;
        if (target && (target.tagName === 'TEXTAREA' || target.isContentEditable || target.tagName === 'SELECT' || target.tagName === 'BUTTON' || target.tagName === 'OPTION' || target.tagName === 'INPUT' || target.closest('.CategorySelect'))) {
            return;
        }
        bringWindowToFront(windowEl);
        isDragging = true;
        const rect = windowEl.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        windowEl.style.position = 'fixed';
        windowEl.style.left = `${rect.left}px`;
        windowEl.style.top = `${rect.top}px`;
        windowEl.style.translate = '0 0';
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}

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

