const { Pool } = require('pg');

const pool = new Pool({
  host: 'database-1.csjq4ws6mu3c.us-east-1.rds.amazonaws.com',
  user: 'postgres',
  password: 'Shubh123456!!',
  database: 'postgres',
  port: 5432,
});

module.exports = pool;
