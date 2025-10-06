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







// OPEN LIST THINGS SETUP //


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


//For Creating the organized list//
function CreateOrganizedList() {
    const OrganizedWindowSetup = document.getElementById('OrganizedListCreationWindowID');
    const OrganizedNextButton = document.getElementById('OrganizedListCreationButton');
    const OrganizedCancelSetupButton = document.getElementById('OrganizedListCreationCancelButton');
    const HeadingWindowSetupOrganized = document.getElementById('OrganizedListCreationH1ID');
    const OrganizePreviewIMG1 = document.getElementById('CreateListIMGPreview1ID');
    const OrganizePreviewIMG2 = document.getElementById('CreateListIMGPreview2ID');
    const OrganizedInputText = document.getElementById('OrganizedListCreationInputID');

    const OrganizedLocationFolder = document.getElementById('MainNoteOrganizedListsID');
    const OrganizedWindowsMainParent = document.getElementById('OrganizedWindows');
    organizednameinfo = OrganizedInputText.value;
    if (OrganizedInputText.value === "") {
        OrganizedInputText.style.border = "2px solid red";
        OrganizedInputText.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        setTimeout(() => {
            OrganizedInputText.style.border = "2px solid rgba(0, 0, 0, 0.3)";
            OrganizedInputText.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        }, 1000);
    } else if (OrganizedInputText.value === OrganizedInputText.value) {
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


            setTimeout(() => {
                HeadingWindowSetupOrganized.innerHTML = "Done!";
                let OrganizedInfosNumber = 1;
                const NewOrganizedList = document.createElement('button');
                const NewOrganizedRemove = document.createElement('button');
                const OrganizedFolder = document.createElement('div');

                NewOrganizedList.classList.add('NewOrganizedList');
                NewOrganizedRemove.classList.add('NewOrganizedRemove');
                OrganizedFolder.classList.add('OrganizedFolder');

                NewOrganizedList.textContent = organizednameinfo;   
                NewOrganizedRemove.textContent = "Delete";
                HeadingWindowSetupOrganized.style.left = "45%";
                

                OrganizedInfosNumber++
                
                NewOrganizedRemove.addEventListener('click', () => {
                    NewOrganizedList.style.scale = "0";
                    NewOrganizedList.style.opacity = "0";

                    setTimeout(() => {
                        NewOrganizedList.remove();
                    }, 300);
                });

                NewOrganizedList.appendChild(NewOrganizedRemove);
                OrganizedWindowsMainParent.appendChild(NewOrganizedList);
                OrganizedLocationFolder.appendChild(OrganizedFolder);

                NewOrganizedList.style.scale = "0.5";
                NewOrganizedList.style.opacity = "0";
                setTimeout(() => {
                    NewOrganizedList.style.scale = "1";
                    NewOrganizedList.style.opacity = "1";
                    NewOrganizedList.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.15)"
                }, 400);
            }, 2000);
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
            }, 2100);
        }, 100);
        
    }


}


function OpenNoteUncateg() {
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
    
}

function CloseNoteUncateg() {
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