/**
 * Kings Bakes – Start All Servers
 * Launches MongoDB, backend (port 5000) and frontend Vite (port 3000).
 * Run: node start-server.js
 */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const root = __dirname;
const backendDir = path.join(root, 'backend');
const mongodExe = 'C:\\Program Files\\MongoDB\\Server\\8.2\\bin\\mongod.exe';
const dbPath = 'C:\\data\\db';

// Ensure data directory exists
if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
}

// Start MongoDB (if not already running)
if (fs.existsSync(mongodExe)) {
    const mongo = spawn(mongodExe, ['--dbpath', dbPath], {
        detached: true,
        stdio: 'ignore'
    });
    mongo.unref();
}

// Start backend (Express on port 5000) — wait 2s for Mongo to boot
setTimeout(() => {
    const backend = spawn('C:\\Windows\\System32\\cmd.exe', ['/c', 'node server.js'], {
        cwd: backendDir,
        detached: true,
        stdio: 'ignore'
    });
    backend.unref();
}, 2000);

// Start frontend (Vite on port 3000) — wait 3s for backend
setTimeout(() => {
    const frontend = spawn('C:\\Windows\\System32\\cmd.exe', ['/c', 'npx vite --port 3000 --open'], {
        cwd: root,
        detached: true,
        stdio: 'ignore'
    });
    frontend.unref();
}, 3000);

console.log('');
console.log('===========================================');
console.log('  Kings Bakes – Starting All Servers...');
console.log('===========================================');
console.log('  MongoDB    →  localhost:27017');
console.log('  Backend    →  http://localhost:5000');
console.log('  Frontend   →  http://localhost:3000');
console.log('  Admin      →  http://localhost:3000/admin.html');
console.log('===========================================');
console.log('  Admin login:  admin / kingsbakes123');
console.log('===========================================');
console.log('');
console.log('  Browser will open in ~5 seconds...');
console.log('');

setTimeout(() => process.exit(0), 5000);
