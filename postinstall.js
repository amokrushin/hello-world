#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const opts = cwd => ({ stdio: 'inherit', cwd: path.join(__dirname, cwd) });

execSync('npm i', opts('services/backend'));
execSync('npm i', opts('services/frontend'));
