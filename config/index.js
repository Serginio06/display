module.exports = {
    db_params: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'data',
        socketPath: '/cloudsql/circular-source-174612:europe-west1:display-db'
    },
    port: process.env.port || 8080,
    google_oAuthClient: {
        clientID: '874875351866-og6jt96hbse1slh9fhm7a0fc3hcb24bb.apps.googleusercontent.com',
        clientSecret: 'bd8rayeX0S2gSN__Ms_5YEcU',
        refreshToken: '1/T6sv6mUCg9NCn8Z4SPMhAeCfzjyyG2wL623GjKiIF9U'
    },
    adminEmail: 'info@dinamicka.com',
    jwtSecret: 'bd8rayeX0S2gSN__Ms_5YEcU'
};


// local test db on cloud
//     host:'35.187.178.187',
//     port:'3306',
//     user:'root',
//     password:'123456',
//     database:'data'

// GCP deployemnt: db Cloud
//     host:'localhost',
//     port:'3306',
//     user:'root',
//     password:'123456',
//     database:'data',
//     socketPath:'/cloudsql/circular-source-174612:europe-west1:display-db'

// local test and local db
//     host:'localhost',
//     port:'3306',
//     user:'root',
//     password:'123456',
//     database:'data'