const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    })
);

app.get("*", () => {
	res.status(200).send('Welcome to node-python-scripts repository');
});

app.listen(1234, () => {
    console.log(`Server is running on 1234`);
});
