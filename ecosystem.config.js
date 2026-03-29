module.exports = {
  apps: [
    {
      name: 'ggtx_nvt',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001', // Đã đổi sang port 3001 ở đây nha
      cwd: './',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001 // Đã đổi sang port 3001 ở đây nha
      }
    }
  ]
};
