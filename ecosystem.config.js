module.exports = {
  apps : [{
    name: 'api-app',
    script: './server.js',
    instances: 3,
    exec_mode: 'cluster',
    log_date_format: "MM/DD/YYYY HH:mm",
    max_memory_restart: "256M",
    //time: true,
    ignore_watch: ["[\/\\]\./", "node_modules"],
    instance_var: "INSTANCE_ID",
    combine_logs: true,
     
  }],
};
