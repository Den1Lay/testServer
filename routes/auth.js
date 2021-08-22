var express = require('express')
var router = express.Router()
const chalk = require('chalk')

const UserModel = require('../models/user')
const DialogModel = require('../models/dialog')
const MessageModel = require('../models/msg')

const dBConnection = require('../utils/mongooseConnect')
const createJWToken = require('../utils/createJWToken')
const verifyJWToken = require('../utils/verifyJWToken')

/* GET users listing. */
router
  .get('/', function(req, res, next) {
    res.send('respond with a resource');
  })
  .post('/register', (req, res) => {
    const { body: {nickName: loginName, password} } = req;

    dBConnection().then((killConnect) => {
      
      UserModel.find().then(data => {

        if(!data.some(user => {
          const userLoginName = user?.['loginName'] || null;
          return userLoginName === loginName
        })) {
          const newUser = UserModel({
            loginName, 
            nickName: `Аnonymous ${data.length}`,
            password, 
            last_seen: Date.now(),
            confirmed: false,
            registrateDate: Date.now()
          });

          newUser.save().then((userData) => {
            killConnect();

            const { _id, loginName } = userData
            const token = createJWToken({_id, loginName})
            res.json({
              status: 'success', 
              message: 'Willcome to our club!', 
              data: {user: userData, dialogs: []}, 
              token 
            })
          })
          .catch(er => {
            killConnect();
            console.log(chalk.redBright('MONGOOSE_SAVE_ER: '), er);
          })

        } else {
          killConnect();
          res.json({status: 'error', message: 'The Nickname is already taken'})
        }
        // killConnect();

        // res.json({data, loginName});
      })
      .catch(er => {
        console.log(chalk.redBright('MONGOOSE_FIND_ER: '), er);
      })
    })
  })
  .post('/login', (req, res) => {
    const { body: {nickName: loginName, password}, headers } = req;
    
    dBConnection().then((killConnect) => {
      UserModel.findOne({loginName}).then(user => {
        
        if(user === null) {
          killConnect();

          res.json({status: 'error', message: 'Not exist'})
        } else if (password !== user.password) {
          killConnect();

          res.json({status: 'error', message: 'Wrong password'})
        } else {
          mineUserDate({user, killConnect, res})
        }
      })
      .catch(er => {
        killConnect()

        console.log(chalk.redBright('MONGOOSE_FINDONE_ER: '), er);
      })
    })

  })
  .post('/check', (req, res) => {
    const { headers } = req;

    console.log("POST_CHECK")
    // res.json({status: 'success', message: 'Hey, dude'})
    verifyJWToken(headers.token).then((decode) => {
      console.log('Decode:', decode);

      dBConnection().then(killConnect => {
        UserModel.findById(decode['_id']).then(user => {
          if(user === null) {
            killConnect();

            res.json({status: 'error', message: 'User dont more exist'})
          } else {
            mineUserDate({user, killConnect, res})
          }

        })
        .catch(er => {
          killConnect()

          console.log(chalk.redBright('MONGOOSE_FINDONE_ER: '), er);
        })
        
      })

    })
    .catch(er => {
      res.json({status: 'error', message: 'Relogin please'})
      console.log(chalk.redBright('WRONG_TOKEN'), er);
    })

  })

  function mineUserDate({user, killConnect, res}) {
    debugger
    const { _id: userId, loginName } = user;
    const token = createJWToken({_id: userId, loginName});

    DialogModel.find({$or: [{author: userId}, {partner: userId}]})
    .populate(['author', 'partner'])
    .then(dialogs => {
      const resData = []

      // можно делать запрос на каждый диалог
      // а можно сделать общий запрос на все сообщения в диалогах
      const promises = []

      dialogs.forEach((dialog) => {
        const { _id: dialogId, poll } = dialog
        
        const promiseExamplar = MessageModel
        .find({dialog: dialogId, poll})
        .then(messages => {
          // Если сообщений будет мало.. то запрос на дополнительные будет
          // лететь с клиента

          const resDataPushEx = {
            dialog, 
            messages
          }
          resData.push(resDataPushEx);
        })
        .catch(er => {
          killConnect()

          console.log(chalk.redBright('MONGOOSE_FIND_MSG_ER: '), er)
        })

        promises.push(promiseExamplar);
      })

      Promise.all(promises).then(() => {
        killConnect(); 

        res.json({
          status: 'success',
          message: 'Wellcome back', 
          data: {user, dialogs: resData},
          token
        })
      });
      
    })
    .catch(er => {
      killConnect()

      console.log(chalk.redBright('MONGOOSE_FIND_DIALOG_ER: '), er);
    })
  }

module.exports = router;
