const mongoose = require('mongoose');
const chalk = require('chalk');

const dBConnection = () => {
  return new Promise((resolve, reject) => {
    // mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
    // const db = mongoose.connection;
    resolve(() => {})

    // db.on('error', er => {
    //   console.log(chalk.redBright('MONGOOSE_CONNECT_ER:'), er);
    //   reject(er);
    //   return
    // });

    // db.on('open', () => {
    //   const killConnect = () => mongoose.disconnect()
    //   resolve(killConnect);
    //   return
    // })
  
  })
}

module.exports = dBConnection;