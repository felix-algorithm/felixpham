const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let PORT = parseInt(process.env.PORT, 10) || 3000;
const root = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '' || reqPath === '/work') reqPath = '/index.html';

  let filePath = path.join(root, reqPath);

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    if (fs.existsSync(filePath + '.html') && fs.statSync(filePath + '.html').isFile()) {
      filePath = filePath + '.html';
    }
  }

  if (!fs.existsSync(filePath) && reqPath === '/reportage') {
    filePath = path.join(root, 'gallery.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const stat = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    if (ext === '.mp4' || ext === '.webm') {
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*'
        });
        file.pipe(res);
        return;
      } else {
        res.writeHead(200, {
          'Content-Length': stat.size,
          'Accept-Ranges': 'bytes',
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*'
        });
        fs.createReadStream(filePath).pipe(res);
        return;
      }
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    const error404Path = path.join(root, '404.html');
    if (fs.existsSync(error404Path)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(error404Path).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + reqPath);
    }
  }
});

function startServer(port) {
  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`\n======================================================`);
    console.log(`  🎬 FELIX ALGORITHM PORTFOLIO LOCAL SERVER DANG CHAY`);
    console.log(`  🔗 01. Work:       ${url}`);
    console.log(`  🔗 02. Gallery:    ${url}/gallery`);
    console.log(`  🔗 03. Commission: ${url}/commission`);
    console.log(`  🔗 04. Contact:    ${url}/contact`);
    console.log(`======================================================\n`);

    exec(`start ${url}`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = PORT + 1;
    console.log(`⚠️  Cong ${PORT} dang ban, tu dong chuyen sang cong ${nextPort}...`);
    PORT = nextPort;
    startServer(PORT);
  } else {
    console.error('Loi server:', err);
  }
});

if (module.parent) {
  module.exports = server;
} else {
  startServer(PORT);
}
