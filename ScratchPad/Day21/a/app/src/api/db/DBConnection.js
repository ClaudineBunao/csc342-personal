// import mariadb module into a constant called mariadb
const mariadb = require('mariadb');

let pool = null;

// Add a function as a named export called getDatabsaeConnection with no parameters. In this function you will:
exports.getDatabaseConnection = () => {
    if (!pool) {
        pool = mariadb.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            charset: process.env.DB_CHARSET
        });
    }
    return pool;
}

//Add a function as a named export called query that accepts two parameters: query and params. The first parameter is required, but the second one is optional and defaults to an empty string
exports.query = (query, params = []) => {
    const pool = exports.getDatabaseConnection();
    return pool.query(query, params).catch(err => {
        console.log(err);
        throw err;
    });

}

exports.close = () => {
    // if (pool) {
    //     pool.end();
    //     pool = null;
    // }
    if (pool !== null) {
        pool.end();
    }
}