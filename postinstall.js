#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const opts = cwd => ({ stdio: 'inherit', cwd: path.join(__dirname, cwd) });

execSync('yarn', opts('services/backend'));
execSync('yarn', opts('services/frontend'));
