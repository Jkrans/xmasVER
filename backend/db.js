const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://postgres:ae45Acf4BAGbc6efCeFgdCcA*FfBDcB3@roundhouse.proxy.rlwy.net:41893/railway'
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
