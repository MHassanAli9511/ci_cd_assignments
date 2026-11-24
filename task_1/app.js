
const http = require('node:http');

function greet(name) {
  return `Hello, ${name}!`;
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(greet('World'));
});

if (require.main === module) {
  server.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

module.exports = { greet };
