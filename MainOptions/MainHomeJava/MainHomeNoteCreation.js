let notenumbercreation = 0;
let currentOpenNoteId = null;
let currentOpenNoteTab = null;

function debounce(fn, delay = 700) {
    let t;
    return function(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), delay);
    };
}

function OpenCreationSETUP() {
    const notewindowopen = document.getElementById('NoteCreationWindowSetup');
    const notewindowicon = document.getElementById('NoteCreationWindowSetup');
    const NoteWindowSetup1 = document.getElementById('noteCreationWindowSetup1ID');
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
        // increment global note counter
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

        setTimeout(async () => {
            NoteWindowSetup2.style.opacity = "1";
            NoteWindowSetupMAIN.style.width = "350px";
            noteloadinginfoH1.textContent = "Created! Directing...";
            noteinputname.value = '';
        }, 2200)

        setTimeout(async () => {
            const ThemeWindow = document.getElementById('NoteThemeHomeWindowElements');
            const OrganizedWindows = document.getElementById('OrganizedWindowsID');
            NoListOrganizedCreated = true;
            const NoteTab = document.createElement('button');
            const NoteTabNamee = document.createElement('h1');
            const NoteFavoriteButton = document.createElement('button');
            const NoteTabOpenButton = document.createElement('button');
            const NoteTabDeleteButton = document.createElement('button');
            const NoteTabContent = document.createElement('p');
            NoteTabOpenButton.type = 'button';
            NoteTabDeleteButton.type = 'button';
            // prevent inner buttons from initiating drag operations
            NoteTabOpenButton.draggable = false;
            NoteTabDeleteButton.draggable = false;
            NoteTabOpenButton.ondragstart = (e) => e.preventDefault();
            NoteTabDeleteButton.ondragstart = (e) => e.preventDefault();


            NoteCodeNameID.textContent = notenameinfocreation;
            NoteTabOpenButton.textContent = "Open";



            NoteTab.classList.add('NoteTab');
            NoteTabNamee.classList.add('NoteTabNamee');
            NoteTabDeleteButton.classList.add('NoteTabDeleteButton');
            NoteTabOpenButton.classList.add('NoteTabOpenButton');
            NoteTabContent.classList.add('NoteTabContent'); 

            // add grab handle for dragging
            const grabHandle = document.createElement('div');
            grabHandle.className = 'grab-handle';
            grabHandle.innerHTML = '&#x2630;';
            grabHandle.ondragstart = (e) => { /* allow parent drag */ };
            NoteTab.appendChild(grabHandle);

            NoteTabNamee.textContent = notenameinfocreation;
            NoteTabDeleteButton.textContent = "Delete";
            NoteTabContent.textContent = "Input";


            NoteGridLayoutWindowCreation.appendChild(NoteTab);
            NoteTab.appendChild(NoteTabOpenButton);
            NoteTab.appendChild(NoteTabContent);
            NoteTab.appendChild(NoteTabNamee);  
            NoteTab.appendChild(NoteTabDeleteButton);

            // Save new note to Firebase (if logged in)
            try {
                const uid = localStorage.getItem('currentUid');
                if (uid && typeof firebase !== 'undefined') {
                    const newRef = firebase.database().ref(`users/${uid}/notes`).push();
                    const orderVal = Date.now();
                    await newRef.set({
                        title: notenameinfocreation,
                        content: '',
                        createdAt: Date.now(),
                        order: orderVal
                    });
                    // attach firebase note id to DOM element for later updates
                    NoteTab.setAttribute('data-note-id', newRef.key);
                    // make draggable
                    NoteTab.draggable = true;
                    NoteTab.classList.add('draggable');
                    NoteTab.addEventListener('dragstart', (ev) => {
                        if (ev.dataTransfer) {
                            ev.dataTransfer.setData('text/plain', newRef.key);
                            ev.dataTransfer.effectAllowed = 'move';
                            try { ev.dataTransfer.setDragImage(NoteTab, 16, 16); } catch(e) {}
                        }
                        NoteTab.classList.add('dragging');
                    });
                    NoteTab.addEventListener('dragend', () => {
                        NoteTab.classList.remove('dragging');
                    });
                    // update orders in firebase after adding
                    updateOrdersInFirebase(uid);
                    // add a tab to the global tabs bar
                    try {
                        const tabsBar = document.getElementById('NoteTabsBarGlobal') || document.getElementById('NoteTabsBar');
                        if (tabsBar) {
                            const tab = document.createElement('div');
                            tab.className = 'tab active';
                            tab.textContent = notenameinfocreation || 'Untitled';
                            tab.dataset.noteId = newRef.key;
                            // deactivate others
                            [...tabsBar.children].forEach(c => c.classList.remove('active'));
                            tab.addEventListener('click', () => {
                                        // open as a floating editor instead of the main static interface
                                        createFloatingEditor(newRef.key, notenameinfocreation || 'Untitled', '');
                                        currentOpenNoteId = newRef.key;
                                        currentOpenNoteTab = NoteTab;
                                        [...tabsBar.children].forEach(c => c.classList.remove('active'));
                                        tab.classList.add('active');
                                        try { tabsBar.style.display = 'flex'; localStorage.setItem('lastOpenedNote', newRef.key); } catch(e) {}
                                    });
                            tabsBar.appendChild(tab);
                        }
                    } catch (e) {}
                }
            } catch (e) {
                console.warn('Firebase save skipped:', e);
            }

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

                    setTimeout(async () => {
                    NoteTab.remove();
                    notenumbercreation--;
                    NoteCodeNameID.textContent = '';
                    NoteCodeContentInterface.value = '';
                    NoteInterfaceCodeMainID.style.opacity = "0";
                    NoteInterfaceCodeMainID.style.scale = "0.9";
                    NoteInterfaceCodeMainID.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1.0)";

                    // remove from firebase if exists
                    try {
                        const uid = localStorage.getItem('currentUid');
                        const noteId = NoteTab.getAttribute('data-note-id');
                        if (uid && noteId && typeof firebase !== 'undefined') {
                            await firebase.database().ref(`users/${uid}/notes/${noteId}`).remove();
                            // update orders after delete
                            updateOrdersInFirebase(uid);
                        }
                    } catch (e) {
                        console.warn('Firebase delete skipped:', e);
                    }

                    // remove tab from global tabs bar
                    try {
                        const tabsBar = document.getElementById('NoteTabsBarGlobal') || document.getElementById('NoteTabsBar');
                        const noteId = NoteTab.getAttribute('data-note-id');
                        if (tabsBar && noteId) {
                            const t = tabsBar.querySelector(`[data-note-id="${noteId}"]`);
                            if (t) t.remove();
                        }
                    } catch (e) {}

                    setTimeout(() => {
                        NoteInterfaceCodeMainID.scale = "0";
                    }, 400);
                }, 300);
            });

            NoteTabOpenButton.addEventListener('click', () => {
                const key = NoteTab.getAttribute('data-note-id');
                createFloatingEditor(key, NoteTabNamee.textContent, NoteTabContent.textContent);
                // show tabs bar in dock and mark active
                try {
                    const tabsBar = document.getElementById('NoteTabsBarGlobal') || document.getElementById('NoteTabsBar');
                    if (tabsBar) {
                        tabsBar.style.display = 'flex';
                        [...tabsBar.children].forEach(c => c.classList.remove('active'));
                        const matching = tabsBar.querySelector(`[data-note-id="${key}"]`);
                        if (matching) matching.classList.add('active');
                        try { localStorage.setItem('lastOpenedNote', key); } catch (e) {}
                    }
                } catch (e) {}
            });

            // Do not attach a per-tab close handler here; a single global close handler
            // below will handle saving/closing the currently-open note.


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

// Auto-save on content change (debounced) and load notes for user
document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('NoteCodeContentID');
    if (contentArea) {
        const saveFn = debounce(async function() {
            try {
                const uid = localStorage.getItem('currentUid');
                const noteId = currentOpenNoteId;
                if (uid && noteId && typeof firebase !== 'undefined') {
                    await firebase.database().ref(`users/${uid}/notes/${noteId}`).update({
                        content: contentArea.value,
                        updatedAt: Date.now()
                    });
                    // also update the open tab preview text
                    if (currentOpenNoteTab) {
                        const p = currentOpenNoteTab.querySelector('.NoteTabContent');
                        if (p) p.textContent = contentArea.value;
                    }
                }
            } catch (e) {
                console.warn('Auto-save skipped:', e);
            }
        }, 800);

        contentArea.addEventListener('input', saveFn);
    }

    // If firebase is available, load notes after auth
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                loadNotesForUser(user.uid);
            } else {
                // clear notes UI
                const grid = document.getElementById('UncategorizedList');
                if (grid) grid.innerHTML = '';
            }
        });
    }
});

async function loadNotesForUser(uid) {
    try {
        const snapshot = await firebase.database().ref(`users/${uid}/notes`).once('value');
        const notes = snapshot.val();
        const NoteGridLayoutWindowCreation = document.getElementById('UncategorizedList');
        if (!NoteGridLayoutWindowCreation) return;
        NoteGridLayoutWindowCreation.innerHTML = '';
        if (!notes) return;
        // sort notes by `order` (or createdAt) so positions persist
        const getOrderValue = (v) => {
            if (!v) return 0;
            if (typeof v.order === 'number') return v.order;
            if (typeof v.createdAt === 'number') return v.createdAt;
            // createdAt may be a string timestamp
            const parsed = Number(v.createdAt);
            return Number.isFinite(parsed) ? parsed : 0;
        };

        const entries = Object.entries(notes).sort((a, b) => {
            const A = a[1];
            const B = b[1];
            return getOrderValue(A) - getOrderValue(B);
        });

        // render a tabs bar so user can quickly switch between notes
        const tabsBar = document.getElementById('NoteTabsBarGlobal') || document.getElementById('NoteTabsBar');
        if (tabsBar) {
            tabsBar.innerHTML = '';
            // hide initially; will be shown when a note is opened
            tabsBar.style.display = 'none';
        }

            entries.forEach(([key, note]) => {
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
            NoteTabNamee.textContent = note.title || 'Untitled';
            NoteTabContent.textContent = note.content || '';
            NoteTabOpenButton.textContent = 'Open';
            NoteTabDeleteButton.textContent = 'Delete';
            NoteTabOpenButton.type = 'button';
            NoteTabDeleteButton.type = 'button';
            // prevent inner buttons from initiating drag operations
            NoteTabOpenButton.draggable = false;
            NoteTabDeleteButton.draggable = false;
            NoteTabOpenButton.ondragstart = (e) => e.preventDefault();
            NoteTabDeleteButton.ondragstart = (e) => e.preventDefault();
            NoteTab.setAttribute('data-note-id', key);
            // add grab handle for dragging
            const grabHandle = document.createElement('div');
            grabHandle.className = 'grab-handle';
            grabHandle.innerHTML = '&#x2630;';
            grabHandle.ondragstart = (e) => { /* allow parent drag */ };
            NoteTab.appendChild(grabHandle);
            NoteTab.draggable = true;
            NoteTab.classList.add('draggable');
            NoteTab.addEventListener('dragstart', (ev) => {
                if (ev.dataTransfer) {
                    ev.dataTransfer.setData('text/plain', key);
                    ev.dataTransfer.effectAllowed = 'move';
                    try { ev.dataTransfer.setDragImage(NoteTab, 16, 16); } catch(e) {}
                }
                NoteTab.classList.add('dragging');
            });
            NoteTab.addEventListener('dragend', () => {
                NoteTab.classList.remove('dragging');
                // after drag ends, update order
                updateOrdersInFirebase(uid);
            });
            NoteTab.appendChild(NoteTabOpenButton);
            NoteTab.appendChild(NoteTabContent);
            NoteTab.appendChild(NoteTabNamee);
            NoteTab.appendChild(NoteTabDeleteButton);
            NoteGridLayoutWindowCreation.appendChild(NoteTab);

            // create tab in top tabs bar
            if (tabsBar) {
                const tab = document.createElement('div');
                tab.className = 'tab';
                tab.textContent = note.title || 'Untitled';
                tab.dataset.noteId = key;
                tab.addEventListener('click', () => {
                    // open note as a floating editor so multiple notes can be opened
                    createFloatingEditor(key, note.title || 'Untitled', note.content || '');
                    currentOpenNoteId = key;
                    // set active class
                    [...tabsBar.children].forEach(c => c.classList.remove('active'));
                    tab.classList.add('active');
                    // show bar in dock
                    tabsBar.style.display = 'flex';
                    // persist last opened
                    try { localStorage.setItem('lastOpenedNote', key); } catch (e) {}
                    // find corresponding card and set currentOpenNoteTab
                    const card = document.querySelector(`[data-note-id="${key}"]`);
                    if (card) currentOpenNoteTab = card;
                });
                tabsBar.appendChild(tab);
                // if this note was left open previously, restore its floating window and position
                try {
                    if (note && note.open) {
                        // open floating editor and apply stored position
                        createFloatingEditor(key, note.title || 'Untitled', note.content || '', note.position || null);
                        tabsBar.style.display = 'flex';
                        tab.classList.add('active');
                    }
                } catch (e) { console.warn('Failed to restore open note:', e); }
            }


            // after rendering tabs, if there's a last opened note, open it automatically
            try {
                const last = localStorage.getItem('lastOpenedNote');
                if (last && tabsBar) {
                    const auto = tabsBar.querySelector(`[data-note-id="${last}"]`);
                    if (auto) {
                        auto.click();
                    }
                }
            } catch (e) {}
            NoteTabOpenButton.addEventListener('click', () => {
                const key = NoteTab.getAttribute('data-note-id');
                createFloatingEditor(key, NoteTabNamee.textContent, NoteTabContent.textContent);
                // mark active tab in global bar
                const tabsBarGlobal = document.getElementById('NoteTabsBarGlobal') || document.getElementById('NoteTabsBar');
                if (tabsBarGlobal) {
                    [...tabsBarGlobal.children].forEach(c => c.classList.remove('active'));
                    const matching = tabsBarGlobal.querySelector(`[data-note-id="${key}"]`);
                    if (matching) matching.classList.add('active');
                    tabsBarGlobal.style.display = 'flex';
                    try { localStorage.setItem('lastOpenedNote', key); } catch (e) {}
                }
            });

            NoteTabDeleteButton.addEventListener('click', async () => {
                NoteTab.remove();
                notenumbercreation--;
                try {
                    await firebase.database().ref(`users/${uid}/notes/${key}`).remove();
                } catch (e) {
                    console.warn('Firebase delete skipped:', e);
                }
                // remove tab from global tabs bar
                try {
                    const tabsBar = document.getElementById('NoteTabsBarGlobal') || document.getElementById('NoteTabsBar');
                    if (tabsBar) {
                        const t = tabsBar.querySelector(`[data-note-id="${key}"]`);
                        if (t) t.remove();
                    }
                } catch (e) {}
            });
        });
    } catch (e) {
        console.warn('Failed to load notes:', e);
    }
}

// Create a floating editor window for a note (allows multiple open)
async function createFloatingEditor(noteId, title = '', content = '', position = null) {
    // fetch latest note from Firebase first so we open the freshest copy
    try {
        const uid = localStorage.getItem('currentUid');
        if (uid && noteId && typeof firebase !== 'undefined') {
            const snap = await firebase.database().ref(`users/${uid}/notes/${noteId}`).once('value');
            const d = snap.val();
            if (d) {
                if (d.title != null) title = d.title;
                if (d.content != null) content = d.content;
                if (d.position != null) position = d.position;
            }
        }
    } catch (e) { console.warn('Failed to fetch latest note for open:', e); }

    const existing = document.querySelector(`.FloatingNote[data-note-id="${noteId}"]`);
    if (existing) {
        existing.style.zIndex = String(Number(existing.style.zIndex || 1200) + 1);
        return existing;
    }

    const win = document.createElement('div');
    win.className = 'FloatingNote';
    win.setAttribute('data-note-id', noteId);
    // default centered position
    win.style.left = (window.innerWidth / 2 - 260) + 'px';
    win.style.top = (window.innerHeight / 2 - 180) + 'px';
    // apply saved position if provided
    if (position && typeof position === 'object') {
        if (position.left != null) win.style.left = (Number(position.left) || 0) + 'px';
        if (position.top != null) win.style.top = (Number(position.top) || 0) + 'px';
    }

    const header = document.createElement('div');
    header.className = 'FloatingHeader';
    const titleEl = document.createElement('div');
    titleEl.className = 'title';
    titleEl.textContent = title || 'Untitled';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = '×';
    header.appendChild(titleEl);
    header.appendChild(closeBtn);

    const contentWrap = document.createElement('div');
    contentWrap.className = 'FloatingContent';
    const ta = document.createElement('textarea');
    ta.value = content || '';
    contentWrap.appendChild(ta);

    win.appendChild(header);
    win.appendChild(contentWrap);
    document.body.appendChild(win);

    // drag/move support for window via header
    let isDown = false;
    let startX = 0, startY = 0, origLeft = 0, origTop = 0;
    header.addEventListener('pointerdown', (e) => {
        if (e.target.closest && e.target.closest('.close-btn')) return;
        isDown = true;
        try { header.setPointerCapture(e.pointerId); } catch (err) {}
        startX = e.clientX;
        startY = e.clientY;
        origLeft = parseInt(win.style.left || 0, 10);
        origTop = parseInt(win.style.top || 0, 10);
        win.style.zIndex = String(2000);
        header.style.cursor = 'grabbing';
    });
    document.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        win.style.left = (origLeft + dx) + 'px';
        win.style.top = (origTop + dy) + 'px';
    });
    document.addEventListener('pointerup', async (e) => {
        if (!isDown) return;
        isDown = false;
        try { header.releasePointerCapture(e.pointerId); } catch (err) {}
        header.style.cursor = 'grab';
        // persist position
        try {
            const uid = localStorage.getItem('currentUid');
            if (uid && noteId && typeof firebase !== 'undefined') {
                const l = parseInt(win.style.left || '0', 10) || Math.round(win.getBoundingClientRect().left);
                const t = parseInt(win.style.top || '0', 10) || Math.round(win.getBoundingClientRect().top);
                await firebase.database().ref(`users/${uid}/notes/${noteId}`).update({ position: { left: l, top: t }, updatedAt: Date.now() });
            }
        } catch (err) { console.warn('Failed to save floating position:', err); }
    });

    // ensure pointer events on the close button don't bubble up and start a drag
    closeBtn.addEventListener('pointerdown', (e) => { e.stopPropagation(); });

    // realtime listener: update editor when DB changes (only when textarea not focused)
    let noteRef = null;
    let noteListener = null;
    try {
        const uid = localStorage.getItem('currentUid');
        if (uid && noteId && typeof firebase !== 'undefined') {
            noteRef = firebase.database().ref(`users/${uid}/notes/${noteId}`);
            noteListener = noteRef.on('value', (snap) => {
                const val = snap.val();
                if (!val) return;
                try {
                    if (val.title != null && titleEl.textContent !== val.title) titleEl.textContent = val.title;
                    if (val.content != null && document.activeElement !== ta) {
                        ta.value = val.content;
                        const card = document.querySelector(`.NoteTab[data-note-id="${noteId}"]`);
                        if (card) {
                            const p = card.querySelector('.NoteTabContent');
                            if (p) p.textContent = val.content;
                        }
                    }
                    // if position changed externally and user is not dragging, apply it
                    if (val.position && !isDown) {
                        if (val.position.left != null) win.style.left = Number(val.position.left) + 'px';
                        if (val.position.top != null) win.style.top = Number(val.position.top) + 'px';
                    }
                } catch (e) { console.warn('Realtime update applied failed:', e); }
            });
        }
    } catch (e) { console.warn('Failed to attach realtime listener:', e); }

    // close button saves and removes
    closeBtn.addEventListener('click', async (ev) => {
        try {
            const uid = localStorage.getItem('currentUid');
            if (uid && noteId && typeof firebase !== 'undefined') {
                await firebase.database().ref(`users/${uid}/notes/${noteId}`).update({
                    content: ta.value,
                    title: titleEl.textContent,
                    updatedAt: Date.now(),
                    open: false
                });
            }
        } catch (e) {
            console.warn('Save on close skipped:', e);
        }
        // detach realtime listener
        try { if (noteRef && noteListener) noteRef.off('value', noteListener); } catch (e) {}
        win.remove();
        try {
            const any = document.querySelectorAll('.FloatingNote');
            const tabsBar = document.getElementById('NoteTabsBarGlobal') || document.getElementById('NoteTabsBar');
            if ((!any || any.length === 0) && tabsBar) tabsBar.style.display = 'none';
        } catch (e) {}
    });

    // autosave debounced
    const saveDeb = debounce(async () => {
        try {
            const uid = localStorage.getItem('currentUid');
            if (uid && noteId && typeof firebase !== 'undefined') {
                await firebase.database().ref(`users/${uid}/notes/${noteId}`).update({
                    content: ta.value,
                    updatedAt: Date.now()
                });
                const card = document.querySelector(`.NoteTab[data-note-id="${noteId}"]`);
                if (card) {
                    const p = card.querySelector('.NoteTabContent');
                    if (p) p.textContent = ta.value;
                }
            }
        } catch (e) { console.warn('Autosave failed:', e); }
    }, 800);
    ta.addEventListener('input', saveDeb);

    // mark this note as open in firebase so it can be restored
    try {
        const uid = localStorage.getItem('currentUid');
        if (uid && noteId && typeof firebase !== 'undefined') {
            await firebase.database().ref(`users/${uid}/notes/${noteId}`).update({ open: true });
        }
    } catch (e) { console.warn('Failed to mark note open:', e); }

    return win;
}


function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.NoteTab:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

async function updateOrdersInFirebase(uid) {
    try {
        const container = document.getElementById('UncategorizedList');
        if (!container) return;
        const tabs = [...container.querySelectorAll('.NoteTab')];
        const updates = {};
        tabs.forEach((tab, idx) => {
            const id = tab.getAttribute('data-note-id');
            if (id) updates[id] = { order: idx };
        });
        // push individual updates
        const ref = firebase.database().ref(`users/${uid}/notes`);
        for (const id of Object.keys(updates)) {
            await ref.child(id).update(updates[id]);
        }
    } catch (e) {
        console.warn('Failed to update orders:', e);
    }
}

// enable drag/drop behavior on the container
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('UncategorizedList');
    if (!container) return;
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggingId = e.dataTransfer && e.dataTransfer.getData('text/plain');
        const draggingEl = draggingId ? container.querySelector(`[data-note-id="${draggingId}"]`) : null;
        if (!draggingEl) return;
        if (afterElement == null) {
            container.appendChild(draggingEl);
        } else {
            container.insertBefore(draggingEl, afterElement);
        }
    });

    container.addEventListener('drop', async (e) => {
        e.preventDefault();
        const uid = localStorage.getItem('currentUid');
        if (uid) await updateOrdersInFirebase(uid);
    });
});

// Global handler for closing the note interface and saving current note
document.addEventListener('DOMContentLoaded', () => {
    const goBackBtn = document.getElementById('GoBackButtonNoteInterfaceID');
    if (!goBackBtn) return;
    goBackBtn.addEventListener('click', async () => {
        const NoteCodeNameID = document.getElementById('NoteCodeNameID');
        const NoteCodeContent = document.getElementById('NoteCodeContentID');
        const NoteInterfaceCodeMainID = document.getElementById('NoteInterfaceCodeMainID');

        if (!currentOpenNoteTab) {
            // nothing is open
            NoteInterfaceCodeMainID.style.scale = '0';
            NoteInterfaceCodeMainID.style.opacity = '0';
            return;
        }

        // update DOM for the open tab
        const nameElem = currentOpenNoteTab.querySelector('.NoteTabNamee');
        const contentElem = currentOpenNoteTab.querySelector('.NoteTabContent');
        if (nameElem) nameElem.textContent = NoteCodeNameID.textContent;
        if (contentElem) contentElem.textContent = NoteCodeContent.value;

        // save/update to firebase if available
        try {
            const uid = localStorage.getItem('currentUid');
            const noteId = currentOpenNoteTab.getAttribute('data-note-id');
            if (uid && noteId && typeof firebase !== 'undefined') {
                await firebase.database().ref(`users/${uid}/notes/${noteId}`).update({
                    title: nameElem ? nameElem.textContent : NoteCodeNameID.textContent,
                    content: NoteCodeContent.value,
                    updatedAt: Date.now()
                });
            }
        } catch (e) {
            console.warn('Firebase update skipped:', e);
        }

        // animate close
        NoteInterfaceCodeMainID.style.scale = '0.7';
        NoteInterfaceCodeMainID.style.opacity = '0';
        NoteInterfaceCodeMainID.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1.1)';
        setTimeout(() => {
            NoteInterfaceCodeMainID.style.scale = '0';
        }, 500);

        currentOpenNoteId = null;
        currentOpenNoteTab = null;
        // hide tabs bar in dock when closed
        try {
            const tabsBar = document.getElementById('NoteTabsBarGlobal') || document.getElementById('NoteTabsBar');
            if (tabsBar) tabsBar.style.display = 'none';
        } catch (e) {}
    });
});

// Make the single `NoteInterfaceCodeMain` draggable by its title for users who use the main editor
(function makeMainInterfaceDraggable(){
    const main = document.getElementById('NoteInterfaceCodeMainID');
    const title = document.getElementById('NoteCodeNameID');
    if (!main || !title) return;
    let dragging = false, sX=0, sY=0, oL=0, oT=0;
    title.style.cursor = 'grab';
    title.addEventListener('pointerdown', (e)=>{
        dragging = true;
        sX = e.clientX; sY = e.clientY;
        oL = parseInt(main.style.left || (main.getBoundingClientRect().left)) || 0;
        oT = parseInt(main.style.top || (main.getBoundingClientRect().top)) || 0;
        title.setPointerCapture(e.pointerId);
    });
    document.addEventListener('pointermove', (e)=>{
        if(!dragging) return;
        const dx = e.clientX - sX; const dy = e.clientY - sY;
        main.style.left = (oL + dx) + 'px';
        main.style.top = (oT + dy) + 'px';
        main.style.position = 'absolute';
        main.style.transform = 'none';
    });
    document.addEventListener('pointerup', (e)=>{
        if(!dragging) return; dragging = false;
        try{ title.releasePointerCapture(e.pointerId); }catch(e){}
    });
})();

//Closing the MainCodeInterface //

//for opening the interface//

// Tracks whether any organized note list has been created


const indexlogininputuser = (document.getElementById('Email') || {}).value || '';
const h1getinput = (document.getElementById('ProfileName') || {}).textContent || '';

localStorage.setItem('indexlogininputuser', indexlogininputuser);
localStorage.setItem('profileName', h1getinput);

