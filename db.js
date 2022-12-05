const SQL = require('mssql')
const sqlConfig = {
    user: 'Dgodoi',
    password: '*******',
    server: 'dgodoi.database.windows.net',
    database: 'dbGaleria',
    options: {
        encrypt: true,
    }
}

module.exports = { sqlConfig }
