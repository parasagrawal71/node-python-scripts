const scp = require("node-scp");
const fs = require("fs-extra");

// RUN SCRIPT: node transfer_with_node_scp.js srcFile destFile

const { SYSTEM_USERNAME, SYSTEM_IP, PASSPHRASE } = require("./config/private_system_creds.json");

console.log('privateKey exists?\t', fs.existsSync(`/home/${SYSTEM_USERNAME}/.ssh/id_rsa`), "\n");

const srcFile = process.argv[2];
console.log(`srcFile:\t${srcFile}`);
const destFile = process.argv[3];
console.log(`destFile:\t${destFile}`);


scp({
  host: SYSTEM_IP,
  // port: 22,
  username: SYSTEM_USERNAME,
  // password: "", <-- Password is not required when using privateKey and passphrase
  privateKey: fs.readFileSync(`/home/${SYSTEM_USERNAME}/.ssh/id_rsa`),
  passphrase: PASSPHRASE,
})
  .then(async (client) => {
    await client
      .uploadFile(
        srcFile,
        destFile
      )
      .then((response) => {
        console.log('uploadFile response: ', response);
      })
      .catch((error) => {
          console.log('uploadFile error: ', error);
      });
      
      client.close(); // remember to close connection after you finish
  })
  .catch((e) => {
    console.log("Scp client creation error: ", e);
  })
  .finally(() => {
    processExit();
  });


const processExit = () => {
    process.exit(0);
}
