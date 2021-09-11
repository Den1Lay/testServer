const axios = require('axios');
const UserModel = require('../models/user');
const MsgModel = require('../models/msg');
const DialogModel = require('../models/dialog');
const chalk = require('chalk');

module.exports = () => new Promise((resolve, reject) => {

  axios.defaults.headers.common['Authorization'] = 'OAuth AgAAAAAjMRpNAADLW-U37oPQDkG1nZnjlmxTiSM'

  const mainUploader = ({fileName, Model}) => {

    return new Promise((resolve, reject) => {
      Model.find().then(payloadData => {

        if(payloadData.length) {
          
          axios.get(`https://cloud-api.yandex.net/v1/disk/resources/upload?path=%2Fchat%2F${fileName}.json&overwrite=true`)
              .then(({data}) => {
                axios.put(data.href, payloadData).then(() => {
                  resolve('')
                })
                .catch(er => reject({pass: `PUT_${fileName.toUpperCase()}_ER`, er}))
                
              })
              .catch(er => reject({pass: `GET_UPLOAD_${fileName.toUpperCase()}_LINK_ER`, er}))
        } else {
          resolve({fileName, Model})
        }
      })
    })
  }

  const mainDownloader = ({fileName, Model}) => {
    return new Promise((resolve, reject) => {
      axios.get(`https://cloud-api.yandex.net/v1/disk/resources/download?path=%2Fchat%2F${fileName}.json`)
        .then(({data}) => {
          if(data?.description || null  === 'Resource not found.') {
            // В диске нет файлов
            reject({pass: "GET_DOWNLOAD_LINK_ER", er: data})
            return
          } 

          axios.get(data.href)
            .then(({data}) => {
              Promise.all(data.map(payloadData => {
                return new Promise((resolve, reject) => {
                  Model(payloadData).save().then(() => {
                    resolve()
                  })
                  .catch(er => reject({pass: `SAVE_${fileName.toUpperCase()}_MODEL_ER`, er}))
                })
              }))
              .then(() => resolve())
              .catch(er => reject(er))
            })
            .catch(er => reject(er))
        })
    })
  }

  Promise.all([
    mainUploader({fileName:'users', Model: UserModel}),
    mainUploader({fileName:'dialogs', Model: DialogModel}),
    mainUploader({fileName:'messages', Model: MsgModel}),
  ]).then(data => {
    console.log(chalk.yellowBright('DOWNLOAD_PASS:'), data)
    Promise.all(
      data
      .filter(el => typeof el === 'object')
      .map(data => mainDownloader(data))
    ).then(() => {
      resolve()
    })
    .catch(er => reject(er))
  })
  .catch(er => reject(er))
})