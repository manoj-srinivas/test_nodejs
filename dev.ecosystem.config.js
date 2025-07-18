module.exports = {
  apps : [{
    name: 'web',
    script: 'bin/www.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }],
};
