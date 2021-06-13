const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");

let srcPath = process.argv[2]; // File or Folder to copy
if(!srcPath) {
	throw new Error('Pass the file or the folder path to copy');	
}

// console.log('Original srcPath: ', srcPath);
srcPath = srcPath.endsWith('/') ? srcPath.substring(0, srcPath.length - 1) : srcPath;
// console.log('srcPath: ', srcPath);
const fileOrFolderName = srcPath.split('/')[srcPath.split('/').length - 1];
// console.log('fileOrFolderName: ', fileOrFolderName);
const destPath = path.resolve('./output/' + fileOrFolderName);

if(!fs.existsSync('./output')) {
	fs.mkdirSync('./output');
}

let isDirectory = false;
if(fs.existsSync(srcPath) && fs.lstatSync(srcPath).isDirectory()) {
	isDirectory = true;
}

if(isDirectory) {
	fsExtra.copy(srcPath, destPath, function (err) {
		if(err) throw err;

	    	console.log('Folder copied!');
	});
} else {	
	fs.readFile(srcPath, (err, data) => { // readFileSync
		if(err) throw err;
		// console.log('readFile data: ', data);

		fs.writeFile(destPath, data, (err) => { // writeFileSync
			if(err) throw err;
			// console.log('writeFile data: ', data);

			console.log('File has been copied!');
		});
	});
}



