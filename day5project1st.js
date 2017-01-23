
var readlineSync = require('readline-sync');
var menu = [
    'Show current folder',
    'Go to another folder and show contents',//move to another folder
    'Create file or folder',
    'Delete file or folder',
    'Open file',
    'Quit program'
];
var currentFolder = 0;
var namesOfFolders = [];
var kids = [];
var currentSon= 0;
var whereTo= 0;
var fileExists= 0;
var fsStorage = [

    [0, 0, 'root'],
    [1, 0, 'subfolder1'],
    [2, 0, 'subfolder2'],
    [3, 0, 'subfolder3'],
    [4, 0, 'subfolder4'],
    [5, 0, 'subfolder5'],
    [6, 5, 'file1', 'content'],
    [7, 5, 'file2', 'content'],
    [8, 4, 'folder'],
    [9, 4, 'folder2'],
    [10, 4, 'dadafrom4', 'content'],
    [11, 3, 'didifrom3', 'content']

];

//function readMe presents menu and offers to choose next action
function readMenu() {
    
    var answer = readlineSync.keyInSelect(menu, 'choose from menu\n');
    switch (answer) {
        
        case 0:                                                         //see file-system content
            console.log('you chose to see file content');
            isFather(currentFolder);
            break;
        case 1:                                                         //move to another folder
            console.log('You chose to move to another folder');
            isFather(currentFolder);
            whereTo = readlineSync.question('where would you like to go?\n', answer)
            //################################################
            for(x=0; x<fsStorage.length; x++){            //creates a temporary array of the folder names
                namesOfFolders.push(fsStorage[x][2]);}
            index = namesOfFolders.indexOf(whereTo);     //checks if such a name exists
            if (index ==-1) {console.log('Sorry, no such file or folder');
                break;}
            else{
                if(whereTo.includes('.') && (!whereTo.includes('..'))){
                    console.log('Sorry, this is not a folder');}
                else{
                    findItem(whereTo);
                    } isFather(currentFolder);
                                                      //goes to requested folder
            break;}
            //################################################

           case 2:                                                        //create file or folder
            newItem = readlineSync.question('enter name of file to create? ', answer);
            for(x=0; x<fsStorage.length; x++){            //creates a temporary array of the folder names
                namesOfFolders.push(fsStorage[x][2]);}
            index = namesOfFolders.indexOf(newItem);     //checks if such a name exists
            if (index !=-1) {console.log('Sorry, this name is taken please choose another'); //if exists
                break;}
            else{
                if(newItem.includes('.')){
                    fsStorage.push([fsStorage.length, currentFolder, newItem, 'content'])}    //add file to fs array
                else{
                    fsStorage.push([fsStorage.length, currentFolder, newItem]);      //adds folder to fs array
             } }   isFather(currentFolder);                                    //goes to show result
                    break;
        case 3:                                                     //delete a file or folder
            isFather(currentFolder);
            console.log('you chose to delete a file or folder');
            itemToDelete = readlineSync.question('enter name of file?\n', answer);

           for(x=0; x<fsStorage.length; x++){            //creates a temporary array of the folder names
                namesOfFolders.push(fsStorage[x][2]);}
            index = namesOfFolders.indexOf(itemToDelete);     //checks index number of item
            if (index ==-1) {console.log('Sorry, no such file or folder to delete');   //if doesn't exist
            break;}
            else if(index==0){console.log('Sorry, you cannot delete this directory');} //if it is root
            else{
                fsStorage.splice(index, 1);                          //deletes the item in index location
                for(u=index; u<(fsStorage.length); u++){             //updates array to avoid hole
                fsStorage[u][0] = u;
                     }
                namesOfFolders.length = 0;                         //empties temporary list of names
                isFather(currentFolder);
            }                                                //goes to show new file system
            break;
        case 4:                                                //open a text file
            isFather(currentFolder);                            //show location for easier choice
            console.log('you chose to open a text file');
            openMe = readlineSync.question('enter name of file to open?\n', answer);
            var readMe = require('read-text-file');
            var fileContents = readMe.readSync(openMe);
            console.log(fileContents);
            break;
        case 5:                                                  //quit program
            console.log('you chose to quit');
            process.exit(0);
            break;
    }
    readMenu();                                                          // presents menu
}
//function findItem checks if exists and updates currentFolder -(index number)
function findItem(whereTo) {                                        //returns with a new index number
if(whereTo <= 0){                                                   //empty string
        console.log('please enter folder to go to');}
else{
   if (whereTo == '..') {                                           //going up
      if(fsStorage[currentFolder][2]=='root'){
      console.log('this is the root directory, cant go any higher');}
        else    {                                                  //if not root directory
            currentFolder=fsStorage[currentFolder][1];            //whoever you are who is your father
                }
                        }
   else{                                                       //going down
        for (f = 0; f < fsStorage.length; f++) {
               if(whereTo == fsStorage[f][2] && currentFolder == fsStorage[f][1] && fsStorage[f].length == 3){
         // if(whereTo == fsStorage[f][2] && fsStorage[f].length == 3){
               fileExists = 1;
               currentFolder = fsStorage[f][0];
               break;  }  }       //found you what is your index
           if(fileExists == 0)  {
                console.log('Woops... no such folder');
                //whereTo = readlineSync.question('would you like to try again?',answer)
                readMenu();
                     }
    }}}


//function isFather checks for kids, their type, and put them in the kids array
function isFather(currentFolder) {
    kids.length=0;
    for (x = 0; x < fsStorage.length; x++) {
        if (fsStorage[x][1] == currentFolder) {
           if (fsStorage[x][0]!= 0){
            if (fsStorage[x].length == 4) {
                kids.push('#' + fsStorage[x][2]);
            }
            else {
                kids.push(fsStorage[x][2] + '/');
            }
        }}
   } kids.sort();
    showFileSystem(currentFolder);
}

//function showFileSystem draws the file system
function showFileSystem(currentFolder) {
    //console.log(fsStorage);
   // console.log(currentFolder);
  
    console.log(fsStorage[currentFolder][2] + '/');      //writes currentFolder as root
    if (kids.length>0) {                                //check if he is somebody's father
        for (x = 0; x < kids.length; x++) {
            currentSon = (kids[x]);                  //writes current Sons
            console.log("\t"+ currentSon);
        }
    }

} 
//console.log(fsStorage);
readMenu();



