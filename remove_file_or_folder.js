const fsExtra = require('fs-extra');


const fileOrFolderToBeRemoved = process.argv[2];

fsExtra.remove(fileOrFolderToBeRemoved, (err, v) => {
    if (err){
        console.log('err ', err);
    }
    
    console.log('v ', v);
});
