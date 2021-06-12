/* ******************************************WITHOUT CLUSTERING**********************************  */
/*
const express = require("express");

const app = express();

app.get("/slow", (req, res) => {
  console.log(`${req.method} ${req.url}`);
  load(5000);
  res.send("I took 5 seconds");
});

app.get("/fast", (req, res) => {
  console.log(`${req.method} ${req.url}`);
  res.send("I am fast");
});

function load(time) {
  const start = Date.now();
  while (Date.now() - start < time) {}
}

app.listen(5100, () => {
	console.log('Clustering server listening on port 5100');
});
*/
/* **********************************************************************************************  */


/* ******************************************WITH CLUSTERING*************************************  */
const cluster = require("cluster");

if (cluster.isMaster) {
  console.log("Executing in master mode");
  // worker processes creation using fork() can only be done in master mode
  cluster.fork();
  cluster.fork();
} else {
  console.log("Executing in child mode");
  const express = require("express");
  const app = express();
  app.get("/slow", (req, res) => {
    console.log(`${req.method} ${req.url}`);
    load(5000);
    res.send("I took 5 seconds");
  });

  app.get("/fast", (req, res) => {
    console.log(`${req.method} ${req.url}`);
    res.send("I am fast");
  });

  function load(time) {
    const start = Date.now();
    while (Date.now() - start < time) {}
  }

  app.listen(5100, () => {
  	console.log('Clustering server listening on port 5100');
  });

}
/* **********************************************************************************************  */


/*
Blog referred: Enhance Your Node.js Performance Through Clustering (Part 1):-

https://betterprogramming.pub/enhance-your-node-js-performance-through-clustering-part-1-4cf9cc710774
*/
