const stream = require('stream');
const fs = require('fs');

let srcPath = process.argv[2];
console.log(`srcPath:  ${srcPath}`);
if(!srcPath) {
	throw new Error('Pass the file path to copy');	
}

const readabale = fs.createReadStream(srcPath);
const fileName = srcPath.split('/')[srcPath.split('/').length - 1];
const destPath = './output/' + fileName;
console.log(`destPath: ${destPath} \n`);
const writeable = fs.createWriteStream(destPath);

fs.stat(srcPath, (err, stats) => {
    if(err) {
	console.log('err: ', err);
	throw err;
    }

    this.fileSize = stats.size;
    console.log(`stats.size: ${stats.size / 1000} KBs`);
    this.counter = 1;
    
    console.log(`File: ${destPath} is being created...`);
    
    readabale.on('data', (chunk)=> {
        let percentageCopied = ((chunk.length * this.counter) / this.fileSize) * 100;
        process.stdout.clearLine();  // clear current text
        process.stdout.cursorTo(0);
        process.stdout.write(`${Math.round(percentageCopied)}%`);
        writeable.write(chunk);
        this.counter += 1;
    });
    
    readabale.on('end', (e) => {
        process.stdout.clearLine();  // clear current text
        process.stdout.cursorTo(0);
        process.stdout.write("Successfully finished the operation\n");
        return;
    });
    
    readabale.on('error', (e) => {
        console.log("Some error occured: ", e);
    });
    
    writeable.on('finish', () => {
        console.log("Successfully created the file copy!\n");
    });
});
