const express = require("express");
const cors = require("cors");

const app1 = express();
const app2 = express();
const app3 = express();
const app4 = express();

const allApps = [app1, app2, app3, app4];
const allPorts = [8037, 8038, 8003, 8035];

/*
 *
 * ******************************************** Prerequisites *********************************************** //
 */
allApps.map((app) => {
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
});

/*
 *
 * ****************************************** Routers and Routes ******************************************** //
 */
const handlerForAllApps = (appNumber) => (req, res) => {
  const prefix = `Server ${appNumber} (${allPorts[appNumber - 1]})`;
  console.log(`${prefix}: ${req.method} ${req.url} `, req.body);
  // console.log('req.headers: ', req.headers);
  res.status(200).send({ success: true });
};

// Only handle GET and POST requests
allApps.map((app, index) => {
  app
    .get("*", handlerForAllApps(index + 1))
    .post("*", handlerForAllApps(index + 1))
    .delete("*", handlerForAllApps(index + 1))
    .put("*", handlerForAllApps(index + 1));
});

allApps.map((app, index) => {
  const port = allPorts[index];
  app.listen(port, () => {
    console.log(`Server ${index + 1} is running on ${port}`);
  });
});
