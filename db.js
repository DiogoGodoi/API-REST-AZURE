const SQL = require('mssql')
const sqlConfig = {
    user: 'Dgodoi',
    password: 'Aparecido154*',
    server: 'dgodoi.database.windows.net',
    database: 'dbGaleria',
    options: {
        encrypt: true,
    }
}

module.exports = { sqlConfig }