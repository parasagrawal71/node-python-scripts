const fs = require("fs-extra");

// Use JSON.stringify to write object in a file
writeArrayOrObjIntoFile = async () => {  
  if(!fs.existsSync("./output")) {
	fs.mkdirSync("./output");
  }

  fs.writeFile("./output/object_in_a_file.json", JSON.stringify([{"a": 1}, {"v": 1}]), (err) => { 
    if (err) console.log(err);

    else {
      console.log("File written successfully\n");
    }
  });
};


writeArrayOrObjIntoFile();
