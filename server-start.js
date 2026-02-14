#!/usr/bin/env node
/**
 * Production entry point for STAGEJHOOK server
 * Handles monorepo structure and starts Express server
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import process from 'process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverDir = path.join(__dirname, 'server');

console.log('🚀 Starting STAGEJHOOK Server...');
console.log(`📂 Working directory: ${serverDir}`);

// Start the server process
const serverProcess = spawn('node', ['server.js'], {
  cwd: serverDir,
  stdio: 'inherit',
  shell: false
});

// Handle process exit
serverProcess.on('exit', (code) => {
  console.log(`\n⛔ Server process exited with code ${code}`);
  process.exit(code || 1);
});

// Handle process error
serverProcess.on('error', (error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

// Handle parent process termination
process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  serverProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  serverProcess.kill('SIGINT');
});
