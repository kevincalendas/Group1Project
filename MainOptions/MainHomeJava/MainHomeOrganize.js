// Global variable to track current category filter
let currentCategoryFilter = null;
let currentCategoryFolder = null;

function OrganizedWindowOpen() {
    const mainNoteOrganizedWindow = document.getElementById('MainNoteOrganizedTabsID');
    const OptionFrame = document.getElementById('OptionFrame');
    const MainHomeCreationUncategorizedFrameWindow = document.getElementById('MainNoteCreationframeUncategorizedID');
    const MainOptionsButton = document.getElementById('OptionButton2ID');

    if (mainNoteOrganizedWindow.style.opacity === "1") {
        mainNoteOrganizedWindow.style.opacity = "0";   
        mainNoteOrganizedWindow.style.transform = "translateX(420px)";
        mainNoteOrganizedWindow.style.zIndex = "1";
        OptionFrame.classList.toggle('optionSettings-Open');
    } else {
        mainNoteOrganizedWindow.style.opacity = "1";
        mainNoteOrganizedWindow.style.transform = "translateX(0px)";
        mainNoteOrganizedWindow.style.zIndex = "800";
        OptionFrame.classList.toggle('optionSettings-Open');
        // Load categories when opening
        loadCategories();
    }

    if (OptionFrame.style.opacity === "1") {
        OptionFrame.style.opacity = "0";
        OptionFrame.style.zIndex = "1";
        OptionFrame.style.transform = "translateX(450px)";
        OptionFrame.classList.toggle('optionSettings-Open');
    } else {
        OptionFrame.style.opacity = "1";
        OptionFrame.style.zIndex = "800";
        OptionFrame.style.transform = "translateX(0)";
        OptionFrame.classList.toggle('optionSettings-Open');
    }
}

//FOR OPENING THE ORGANIZED LIST CREATION SETUP THINGSZ//
function OpenCloseOrganizedSetup() {
    const OrganizedWindowSetup = document.getElementById('OrganizedListCreationWindowID');
    const OrganizedNextButton = document.getElementById('OrganizedListCreationButton');
    const OrganizedCancelSetupButton = document.getElementById('OrganizedListCreationCancelButton');
    const OrganizedInputText = document.getElementById('OrganizedListCreationInputID');
    const OrganizePreviewIMG1 = document.getElementById('CreateListIMGPreview1ID');
    const OrganizePreviewIMG2 = document.getElementById('CreateListIMGPreview2ID');

    if (OrganizedWindowSetup.style.opacity === "1") {
        const UncategoryWindow = document.getElementById('UncategorizedList');
        const MainUncategorylistWindow = document.getElementById('OrganizedWindows');

        MainUncategorylistWindow.style.opacity = "1";  
        OrganizedWindowSetup.style.opacity = "0";   
        OrganizedWindowSetup.style.scale = "0";
        OrganizedWindowSetup.style.zIndex = "1";
        OrganizedWindowSetup.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.05);"
        OrganizePreviewIMG1.classList.remove('AniamtionExecuteIMGPreview1');
        OrganizePreviewIMG2.classList.remove('AniamtionExecuteIMGPreview2');
        OrganizedInputText.value = '';
    } else {
        OrganizedWindowSetup.style.opacity = "1";
        OrganizedWindowSetup.style.scale = "1";
        OrganizedWindowSetup.style.zIndex = "1000";
        OrganizedWindowSetup.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.05);"
        OrganizePreviewIMG1.classList.add('AniamtionExecuteIMGPreview1');
        OrganizePreviewIMG2.classList.add('AniamtionExecuteIMGPreview2');
    }
}

//For Creating the organized list (Category)//
async function CreateOrganizedList() {
    const OrganizedWindowSetup = document.getElementById('OrganizedListCreationWindowID');
    const OrganizedNextButton = document.getElementById('OrganizedListCreationButton');
    const OrganizedCancelSetupButton = document.getElementById('OrganizedListCreationCancelButton');
    const HeadingWindowSetupOrganized = document.getElementById('OrganizedListCreationH1ID');
    const OrganizePreviewIMG1 = document.getElementById('CreateListIMGPreview1ID');
    const OrganizePreviewIMG2 = document.getElementById('CreateListIMGPreview2ID');
    const OrganizedInputText = document.getElementById('OrganizedListCreationInputID');
    const OrganizedLocationFolder = document.getElementById('MainNoteOrganizedListsID');
    const OrganizedWindowsMainParent = document.getElementById('OrganizedWindows');

    const categoryName = OrganizedInputText.value.trim();
    
    if (categoryName === "") {
        OrganizedInputText.style.border = "2px solid red";
        OrganizedInputText.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        setTimeout(() => {
            OrganizedInputText.style.border = "2px solid rgba(0, 0, 0, 0.3)";
            OrganizedInputText.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        }, 1000);
        return;
    }

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        alert('Please log in to create categories');
        return;
    }

    // Show loading state
    OrganizePreviewIMG1.classList.remove('AniamtionExecuteIMGPreview1');
    OrganizePreviewIMG2.classList.remove('AniamtionExecuteIMGPreview2');
    setTimeout(() => {
        HeadingWindowSetupOrganized.innerHTML = "Setting up your folder...";
        OrganizePreviewIMG1.classList.add('AniamtionExecuteIMGPreview1');
        OrganizePreviewIMG2.classList.add('AniamtionExecuteIMGPreview2');
        OrganizedCancelSetupButton.style.opacity = "0";
        HeadingWindowSetupOrganized.style.left = "20%";
        OrganizedNextButton.style.opacity = "0";
        OrganizedInputText.style.opacity = "0";
        OrganizedWindowSetup.style.height = "175px";
        HeadingWindowSetupOrganized.style.bottom = "0";

        // Save category to database
        setTimeout(async () => {
            try {
                const response = await fetch('../categories.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userEmail: userEmail,
                        name: categoryName,
                        action: 'create'
                    })
                });

                const data = await response.json();

                if (data.success) {
                    HeadingWindowSetupOrganized.innerHTML = "Done!";
                    HeadingWindowSetupOrganized.style.left = "45%";
                    
                    // Create category button in UI
                    createCategoryButton(data.categoryId, categoryName, OrganizedWindowsMainParent, OrganizedLocationFolder);
                    
                    // Reset form
                    setTimeout(() => {
                        HeadingWindowSetupOrganized.innerHTML = "Create your Organized list";
                        OrganizedCancelSetupButton.style.opacity = "1";
                        OrganizedNextButton.style.opacity = "1";
                        OrganizedInputText.style.opacity = "1";
                        OrganizedWindowSetup.style.height = "175px";
                        HeadingWindowSetupOrganized.style.bottom = "35%";
                        HeadingWindowSetupOrganized.style.left = "18%";
                        OrganizedWindowSetup.style.opacity = "0";   
                        OrganizedWindowSetup.style.scale = "0";
                        OrganizedWindowSetup.style.zIndex = "1";
                        OrganizedWindowSetup.style.transition = "all 0.3s ease-out"
                        OrganizePreviewIMG1.classList.remove('AniamtionExecuteIMGPreview1');
                        OrganizePreviewIMG2.classList.remove('AniamtionExecuteIMGPreview2');
                        OrganizedInputText.value = '';
                        OrganizedWindowSetup.style.height = "280px";
                    }, 1000);
                } else {
                    throw new Error(data.error || 'Failed to create category');
                }
            } catch (error) {
                console.error('Error creating category:', error);
                HeadingWindowSetupOrganized.innerHTML = "Error! Try again";
                HeadingWindowSetupOrganized.style.color = "#ff0000";
                setTimeout(() => {
                    HeadingWindowSetupOrganized.innerHTML = "Create your Organized list";
                    HeadingWindowSetupOrganized.style.color = "";
                    OrganizedCancelSetupButton.style.opacity = "1";
                    OrganizedNextButton.style.opacity = "1";
                    OrganizedInputText.style.opacity = "1";
                }, 2000);
            }
        }, 2000);
    }, 100);
}

// Function to create a category button
function createCategoryButton(categoryId, categoryName, parentElement, folderElement) {
    const NewOrganizedList = document.createElement('button');
    const NewOrganizedRemove = document.createElement('button');
    const OrganizedFolder = document.createElement('div');

    NewOrganizedList.classList.add('NewOrganizedList', 'OrganizedList');
    NewOrganizedRemove.classList.add('NewOrganizedRemove');
    OrganizedFolder.classList.add('OrganizedFolder');
    OrganizedFolder.id = `category-folder-${categoryId}`;

    NewOrganizedList.textContent = categoryName;
    NewOrganizedList.setAttribute('data-category-id', categoryId);
    NewOrganizedRemove.textContent = "Delete";
    
    // Click handler to filter notes by category
    NewOrganizedList.addEventListener('click', () => {
        filterNotesByCategory(categoryId, categoryName, OrganizedFolder);
    });

    // Delete category handler
    NewOrganizedRemove.addEventListener('click', async (e) => {
        e.stopPropagation(); // Prevent triggering the category click
        if (confirm(`Delete category "${categoryName}"? Notes in this category will become uncategorized.`)) {
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                try {
                    const response = await fetch('../categories.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userEmail: userEmail,
                            categoryId: categoryId,
                            action: 'delete'
                        })
                    });

                    const data = await response.json();
                    if (data.success) {
                        NewOrganizedList.style.scale = "0";
                        NewOrganizedList.style.opacity = "0";
                        setTimeout(() => {
                            NewOrganizedList.remove();
                            OrganizedFolder.remove();
                            // If this was the current filter, reset to show all notes
                            if (currentCategoryFilter === categoryId) {
                                currentCategoryFilter = null;
                                currentCategoryFolder = null;
                                loadNotesFromDatabase();
                            }
                        }, 300);
                    } else {
                        alert('Failed to delete category: ' + (data.error || 'Unknown error'));
                    }
                } catch (error) {
                    console.error('Error deleting category:', error);
                    alert('Error deleting category');
                }
            }
        }
    });

    NewOrganizedList.appendChild(NewOrganizedRemove);
    parentElement.appendChild(NewOrganizedList);
    folderElement.appendChild(OrganizedFolder);

    NewOrganizedList.style.scale = "0.5";
    NewOrganizedList.style.opacity = "0";
    setTimeout(() => {
        NewOrganizedList.style.scale = "1";
        NewOrganizedList.style.opacity = "1";
        NewOrganizedList.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.15)";
    }, 400);
}

// Function to load categories from database
async function loadCategories() {
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
            const OrganizedWindowsMainParent = document.getElementById('OrganizedWindows');
            const OrganizedLocationFolder = document.getElementById('MainNoteOrganizedListsID');
            
            if (OrganizedWindowsMainParent && OrganizedLocationFolder) {
                // Clear existing category buttons (except Favorites and Uncategorized)
                const existingButtons = OrganizedWindowsMainParent.querySelectorAll('.NewOrganizedList');
                existingButtons.forEach(btn => {
                    const categoryId = btn.getAttribute('data-category-id');
                    if (categoryId) {
                        btn.remove();
                    }
                });

                // Get note counts for each category and sort by least to most
                const categoriesWithCounts = await Promise.all(
                    data.categories.map(async (category) => {
                        try {
                            const notesResponse = await fetch(`../save_note.php?userEmail=${encodeURIComponent(userEmail)}&categoryId=${category.id}`, {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' }
                            });
                            const notesData = await notesResponse.json();
                            return {
                                ...category,
                                noteCount: notesData.success && notesData.notes ? notesData.notes.length : 0
                            };
                        } catch (error) {
                            return { ...category, noteCount: 0 };
                        }
                    })
                );

                // Sort by note count (least to most)
                categoriesWithCounts.sort((a, b) => a.noteCount - b.noteCount);

                // Load each category in sorted order
                categoriesWithCounts.forEach((category) => {
                    createCategoryButton(category.id, category.name, OrganizedWindowsMainParent, OrganizedLocationFolder);
                });
            }
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Function to filter notes by category
function filterNotesByCategory(categoryId, categoryName, folderElement) {
    currentCategoryFilter = categoryId;
    currentCategoryFolder = folderElement;
    
    // Update UI
    const UncategoryWindow = document.getElementById('MainNoteOrganizedListsID');
    const MainUncategorylistWindow = document.getElementById('OrganizedWindows');
    const GObackListID = document.getElementById('GObackListID');

    GObackListID.style.visibility = "visible";
    GObackListID.style.opacity = "1";
    GObackListID.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1)";
    UncategoryWindow.style.opacity = "1";
    UncategoryWindow.style.scale = "1";
    UncategoryWindow.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1)";
    MainUncategorylistWindow.style.opacity = "0";  
    MainUncategorylistWindow.style.scale = "0";
    MainUncategorylistWindow.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1)";
    
    // Clear current notes and load filtered notes
    const UncategorizedList = document.getElementById('UncategorizedList');
    if (UncategorizedList) {
        // Clear existing notes
        const existingTabs = UncategorizedList.querySelectorAll('.NoteTab');
        existingTabs.forEach(tab => tab.remove());
        
        // Load notes for this category using the main load function
        if (typeof loadNotesFromDatabase === 'function') {
            loadNotesFromDatabase(categoryId);
        } else {
            // Fallback to category-specific loader
            loadNotesForCategory(categoryId, folderElement);
        }
    }
}

// Function to load notes for a specific category
async function loadNotesForCategory(categoryId, targetFolder) {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        return;
    }

    try {
        const response = await fetch(`../save_note.php?userEmail=${encodeURIComponent(userEmail)}&categoryId=${categoryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        if (data.success && data.notes) {
            const UncategorizedList = document.getElementById('UncategorizedList');
            if (!UncategorizedList) {
                // Use the category folder if UncategorizedList doesn't exist
                if (targetFolder) {
                    data.notes.forEach((note) => {
                        const existingTab = document.querySelector(`[data-note-id="${note.id}"]`);
                        if (!existingTab) {
                            // Use the createNoteTab function from MainHomeNoteCreation.js
                            if (typeof createNoteTab === 'function') {
                                const noteTab = createNoteTab(note.id, note.title, note.content);
                                if (noteTab && targetFolder) {
                                    targetFolder.appendChild(noteTab);
                                }
                            }
                        }
                    });
                }
            } else {
                // Load into UncategorizedList
                data.notes.forEach((note) => {
                    const existingTab = document.querySelector(`[data-note-id="${note.id}"]`);
                    if (!existingTab) {
                        if (typeof createNoteTab === 'function') {
                            createNoteTab(note.id, note.title, note.content);
                        }
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error loading notes for category:', error);
    }
}

function OpenNoteUncateg() {
    currentCategoryFilter = null;
    currentCategoryFolder = null;
    
    const UncategoryWindow = document.getElementById('MainNoteOrganizedListsID');
    const MainUncategorylistWindow = document.getElementById('OrganizedWindows');
    const GObackListID = document.getElementById('GObackListID');
    
    GObackListID.style.visibility = "visible";
    GObackListID.style.opacity = "1";
    GObackListID.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1)";
    UncategoryWindow.style.opacity = "1";
    UncategoryWindow.style.scale = "1";
    UncategoryWindow.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1)";
    MainUncategorylistWindow.style.opacity = "0";  
    MainUncategorylistWindow.style.scale = "0";
    MainUncategorylistWindow.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1)";
    
    // Reload all notes (uncategorized) - clear category filter
    currentCategoryFilter = null;
    if (typeof loadNotesFromDatabase === 'function') {
        loadNotesFromDatabase(null);
    }
}

function CloseNoteUncateg() {
    // Reset favorites filter if it was set
    if (currentCategoryFilter === 'favorites') {
        currentCategoryFilter = null;
    } else {
        currentCategoryFilter = null;
    }
    currentCategoryFolder = null;
    
    const UncategoryWindow = document.getElementById('MainNoteOrganizedListsID');
    const MainUncategorylistWindow = document.getElementById('OrganizedWindows');
    const GObackListID = document.getElementById('GObackListID');

    GObackListID.style.visibility = "hidden";
    GObackListID.style.opacity = "0";
    GObackListID.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1)";
    UncategoryWindow.style.opacity = "0";
    UncategoryWindow.style.scale = "0";
    UncategoryWindow.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1)";
    MainUncategorylistWindow.style.opacity = "1";  
    MainUncategorylistWindow.style.scale = "1";
    MainUncategorylistWindow.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1)";
}

// Function to open favorites list
function OpenOrganizedList() {
    // Set a special flag to indicate we're viewing favorites
    currentCategoryFilter = 'favorites';
    currentCategoryFolder = null;
    
    // Update UI
    const UncategoryWindow = document.getElementById('MainNoteOrganizedListsID');
    const MainUncategorylistWindow = document.getElementById('OrganizedWindows');
    const GObackListID = document.getElementById('GObackListID');

    GObackListID.style.visibility = "visible";
    GObackListID.style.opacity = "1";
    GObackListID.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1)";
    UncategoryWindow.style.opacity = "1";
    UncategoryWindow.style.scale = "1";
    UncategoryWindow.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1)";
    MainUncategorylistWindow.style.opacity = "0";  
    MainUncategorylistWindow.style.scale = "0";
    MainUncategorylistWindow.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1)";
    
    // Load favorite notes
    loadFavoriteNotes();
}

// Function to load favorite notes
async function loadFavoriteNotes() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        return;
    }

    try {
        // Load all notes and filter for favorites
        const response = await fetch(`../save_note.php?userEmail=${encodeURIComponent(userEmail)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        if (data.success && data.notes) {
            const UncategorizedList = document.getElementById('UncategorizedList');
            if (!UncategorizedList) {
                console.error('UncategorizedList element not found');
                return;
            }

            // Clear existing notes with fade-out animation
            const existingTabs = UncategorizedList.querySelectorAll('.NoteTab');
            existingTabs.forEach((tab, index) => {
                tab.style.transition = "all 0.2s ease-out";
                tab.style.opacity = "0";
                tab.style.transform = "scale(0.9)";
                setTimeout(() => tab.remove(), 200 + (index * 10));
            });

            // Wait for fade-out before adding new notes
            setTimeout(() => {
                // Filter for favorites only - handle different data types
                const favoriteNotes = data.notes.filter(note => {
                    const isFav = note.is_favorite;
                    return isFav == 1 || isFav === true || isFav === 1 || isFav === '1' || (typeof isFav === 'string' && isFav.toLowerCase() === 'true');
                });

                // Sort favorites: by updated_at DESC
                const sortedFavorites = [...favoriteNotes].sort((a, b) => {
                    const aDate = new Date(a.updated_at || a.created_at || 0);
                    const bDate = new Date(b.updated_at || b.created_at || 0);
                    return bDate - aDate;
                });

                // Load each favorite note with fade-in animation
                sortedFavorites.forEach((note, index) => {
                    const existingTab = UncategorizedList.querySelector(`[data-note-id="${note.id}"]`);
                    if (!existingTab) {
                        if (typeof createNoteTab === 'function') {
                            // Ensure note is marked as favorite
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
                                if (typeof notenumbercreation !== 'undefined') {
                                    notenumbercreation++;
                                }
                            }
                        }
                    }
                });

                console.log(`Loaded ${favoriteNotes.length} favorite notes`);
            }, 250);
        } else {
            console.warn('No notes found or invalid response:', data);
        }
    } catch (error) {
        console.error('Error loading favorite notes:', error);
    }
}

// Load categories on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        loadCategories();
    }, 1000);
});
