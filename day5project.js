//alert("i am here");
var readlineSync = require('readline-sync');
var menu = [
    'print current folder',
    'go to another folder',//move to another folder
    'create file or folder',
    'delete file or folder',
    'open file',
    'quit program'
] 
readMenu();

var fsStorage = [

    [0, 0, 'root'],
    [1, 0, 'subfolder1'],
    [2, 0, 'subfolder2'],
    [3, 0, 'subfolder3'],
    [4, 0, 'subfolder4'],
    [5, 0, 'subfolder5'],
    [6, 5, 'file1', 'content'],
    [7, 5, 'file2', 'content'],

];
function readMenu() {
  //  console.log(menu);
    var answer = readlineSync.keyInSelect(menu, 'choose from menu');
  //  console.log('Your choice is to ' + answer);
    switch (answer) {
        
        case (answer==0):
            console.log('you chose to' + answer);
            showFileSystem();
            break;
        case (answer == 1):
            console.log('you chose to' + answer);
            showFileSystem();
            break;
        case (answer == 2):
            console.log('you chose to' + answer);
            showFileSystem();
            break;
        case (answer == 3):
            console.log('you chose to' + answer);
            showFileSystem();
            break;
        case (answer == 4):
            console.log('you chose to' + answer);
            showFileSystem();
            break;
        case (answer == 5):
            console.log('you chose to' + answer);
            showFileSystem();
            break;
        case (answer == 6):
        //print current folder
        //'go to another folder',//move to another folder
        //'create file or folder',
        // 'delete file or folder',
        // 'open file',
        console.log('you chose to'+answer)
        process.exit(0);
        break;
    }

    }


function showFileSystem() {
    console.log('in here');
    var showLocation;
    console.log(fsStorage[0][2])
    for (x = 1; x < fsStorage.length; x++) {
        showLocation = (fsStorage[x][2]);
        console.log("\t" + showLocation);
    }
 
    }
var currentFolder = 0;
showFileSystem();

