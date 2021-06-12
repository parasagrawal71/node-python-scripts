/*
Blog referred: https://betterprogramming.pub/is-node-js-really-single-threaded-7ea59bcc8d64
*/

process.env.UV_THREADPOOL_SIZE=5; // Increase thread pool size

const crypto = require("crypto");
const start = Date.now();

function logHashTime() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash: ", `${(Date.now() - start) / 1000} seconds`);
  });
}

logHashTime();
logHashTime();
logHashTime();
logHashTime();

logHashTime(); // Call 5th time
