const http = require("http");
const fs = require("fs");
const os = require("os");

// Set the Port number.
const PORT = 3000;

// Get the host IP address of the server.
function getIPAddr() {
  // For Test into personal laptop with Wi-Fi Connection.
  /*
  console.log(os.networkInterfaces());
  let hostIP = os.networkInterfaces()["Wi-Fi"][1]["address"];
  */
  // For Production - AWS EC2.
  let hostIP = os.networkInterfaces()["eth0"][0]["address"];
  return hostIP;
}

// Get final HTML content: Replace the {HOSTIP} with the server IP Address.
function getFinalHTML() {
  // Get the index file content.
  let htmlContent = fs.readFileSync("./pages/index.html", "utf-8");

  // Get the host IP.
  let hostIP = getIPAddr().toString();

  // Replace the {HOSTIP} with host IP address.
  let finalHTML = htmlContent.replace("{HOSTIP}", hostIP);

  return finalHTML;
}

// Create the HTTP Web server.
const webServer = http.createServer((req, res) => {
  // Get the HTML content to show.
  let content = getFinalHTML();

  // Write the HTML content.
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(content);
  res.end();
});

// The server is listening on PORT.
webServer.listen(PORT, (error) => {
  if (!error) {
    console.log(`The server is started on port - ${PORT}`);
  }
});
