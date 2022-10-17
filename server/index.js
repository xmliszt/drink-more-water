// Sample server that serves direct HTML

const http = require("http");
const host = "0.0.0.0";
const port = 8000;

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(`<html><body><h1>This is HTML</h1></body></html>`);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
