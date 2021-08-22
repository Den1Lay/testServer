const creatSS = require('socket.io');
const mongoose = require('mongoose');
const chalk = require('chalk');
const faker = require('faker');
const uuid = require('uuid');

const MsgModel = require('../models/msg');
const DialogModel = require('../models/dialog');
const UserModel = require('../models/user');

const verifyJWToken = require('../utils/verifyJWToken');

const { v4 } = uuid

// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

class WSServer {
  constructor(server) {
    global.sockets = [];
    this.io = creatSS(server, { origin: '*:*', })
    
    .on('connection', socket => {

      socket.use((packet, next) => {
        const token = packet?.[1]?.token;
        verifyJWToken(token).then(decoded => {

          socket.handshake.decode = decoded;
          next();
        })
        .catch(er => {})
        
      })

      socket
        .on('MSG', (data) => {
          debugger
          socket.emit('CLIENT_MSG', 'Ответочка')
        })
        .on('JOIN_ROOM', (room, cb) => {
          socket.join(room);
          console.log('Sockets rooms:',socket.rooms);
          const rooms = [...socket.rooms];
          cb({status: 'ok', rooms})
        })
        .on('PRIVATE_MSG', ({payload: {addres, message}}, cb) => {

          this.dBConnection().then(() => {
            const target = MsgModel({text: message, address: addres});
            target.save((er, doc) => {
              if(er) {
                console.log(chalk.redBright('Mongoose_save_error'), er);
                return
              }
              console.log(chalk.green('SUCCESS_SAVE'), doc);

              mongoose.disconnect();
            })
          })

          socket.to(addres).emit('PRIVATE_MSG', message);
          cb();
        })
        .on('GET_MSGS', () => {
          console.log('DEBUG_GET_MSGS')


          //////////////////////////Простой поиск///////////////////////////

          // this.dBConnection().then(() => {
          //   MsgModel.find({text: 'Hey, Posidone'}, (er, data) => {
          //     if(er) {
          //       console.log(chalk.redBright('Mongoose_find_error'), er);
          //       return
          //     }
          //     console.log('Success_send')
          //     socket.emit('RES_MSGS', data)

          //     mongoose.disconnect();
          //   })
            
            
          // })

          //////////////////////////////////////////////////////////////////

          ////////////Сохранение MSG в модели Dialog c рефами///////////////

          // this.dBConnection().then(() => {
          //   MsgModel.find((er, data) => {
          //     if(er) {
          //       console.log(chalk.redBright('Mongoose_find_error'), er);
          //       return
          //     }
          //     console.log('ALL_MSGS:', data);
          //     const msgIds = data.map(({_id}) => _id);
          //     const dialogTarget = DialogModel({messages: msgIds})

          //     dialogTarget.save((er, doc) => {
          //       if(er) {
          //         console.log(chalk.redBright('Mongoose_save_error'), er);
          //         return
          //       }

          //       console.log('SUCCESS_SAVE_DIALOGS_WITH_POPULATE')
          //       mongoose.disconnect();
          //     })
              
          //   })
          // })

          //////////////////////////////////////////////////////////////////

          ///////////Получение диалога с раскрытием от populate/////////////

          // this.dBConnection().then(() => {
          //   DialogModel.find().populate('messages').exec((er, data) => {
          //     if(er) {
          //       console.log(chalk.redBright('Mongoose_find_error'), er);
          //       return      
          //     }
          //     console.log('DIALOG_DATA:', data)
          //     socket.emit('RES_MSGS', data)

          //     mongoose.disconnect()
          //   })
          // })

          //////////////////////////////////////////////////////////////////

          //=======================Создание юзеров==========================

          // this.dBConnection().then(() => {
          //   const newUser = UserModel({
          //     name: faker.internet.userName(),
          //     age: Math.floor(Math.random()*100),
          //     password: faker.internet.password(),
          //     last_seen: Date.now(), 
          //     confirmed: false,
          //     registrateDate: Date.now(),
          //   })
          //   .save((er) => {
          //     if(er) {
          //       console.log(chalk.redBright('Mongoose_save_error'), er);
          //       return      
          //     }
          //     console.log('SUCCESS_SAVE_USER')
          //     mongoose.disconnect();
          //   })
          // })

          //////////////////////////////////////////////////////////////////
          
          ///////////////////Создание корректных диалогов////////////////////

          // this.dBConnection().then(() => {
          //   const { _id: userId } = socket.handshake.decode

          //   const partner = 'Zues33'

          //   UserModel.findOne({loginName: partner}).then((partner) => {
          //     if(partner) {
          //       const { _id: partnerId } = partner;
          //       const newDialog = DialogModel({
          //         author: userId,
          //         partner: partnerId,
          //         poll: v4(), 
          //         createdAt: Date.now()
          //       })

          //       newDialog.save().then(() => {
          //         mongoose.disconnect();

          //         socket.emit('RES_MSGS', {message: 'Success save'})
          //       })
          //       .catch(er => {
          //         mongoose.disconnect();

          //         console.log(chalk.redBright('MONGOOSE_FIND_USER_ER(dialog_ins)'), er);
          //       })
          //     }


          //   }).catch(er => {
          //     console.log(chalk.redBright('MONGOOSE_FIND_USER_ER(dialog)'), er);
          //   })

          // })

          //=================Пулл сервер для сообщений==================

          // Сообщения летят на первый диалог чела с именем в searchName
          this.dBConnection().then(() => {

            // const searchName = 'Novella.Ferry87';
            const { loginName: decodeLoginName } = socket.handshake.decode

            console.log(socket.handshake.decode)

            UserModel.findOne({loginName: decodeLoginName}).then(data => {
              console.log('THEN_DATA:',data)
              
              const { _id: userId } = data

              
              DialogModel.find({$or: [{author: userId}, {partner: userId}]})
              .populate(['author', 'partner'])
              .then(dialogData => {
                console.log('DIALOG_DATA:', dialogData);
    
                const newDialogId = '611e667194c3dc6cfcc172d5'

                const choosedDialog = dialogData.filter(({ _id }) => {
                  // console.log(typeof _id)
                  // console.log(_id)
                  // console.log(typeof newDialogId)
                  return _id == newDialogId;
                })

                console.log('CHOOSED_DIALOG:', choosedDialog);

                const { _id: dialogId, poll } = choosedDialog[0];
                
                // Получение сообщений для того что бы понять в каком состоянии диалог
                MsgModel.find({ dialog: dialogId, poll: poll })
                .then(msgData => {
                  
                  console.log('MSG_DATA:', msgData);
                  // Все 3 ситуации отдельно обрабатываются
                  if(!msgData.length) {
                    // Инициализация серии сообщений
                    const msgTarget = MsgModel({
                      text: faker.lorem.text(),
                      author: userId,
                      dialog: dialogId,
                      createdAt: Date.now(),
                      poll: poll,
                      prevPoll: 'none',
                      nextPoll: ''
                    });
                    
                    msgTarget.save()
                    .then(() => {
                      console.log('SC_SAVE_FM');
                      mongoose.disconnect();
                    })
                    .catch(er => {
                      console.log(chalk.redBright('Mongoose_save_error'), er);
                      mongoose.disconnect();
                    });
                  } else {
                    // Продолжение серии и проверки
                    const pollLen = 3;

                    if(msgData.length >= pollLen) {
                      // Составление нового пула 
                      const newPollId = v4();
                      MsgModel.updateMany({poll}, {nextPoll: newPollId})
                      .then(() => {
                        console.log('SC_UPDATE_MSGS');

                        const msgTarget = MsgModel({
                          text: faker.lorem.text(),
                          author: userId,
                          dialog: dialogId,
                          createdAt: Date.now(),
                          poll: newPollId,
                          prevPoll: poll,
                          nextPoll: '',
                        });
                        
                        msgTarget.save()
                        .then(() => {
                          console.log('SC_ADD_NEW_MSG');
                          DialogModel.updateOne({ _id: dialogId }, { poll:newPollId })
                          .then(() => {
                            console.log('SC_UP_DIALOG_POLL');
                            mongoose.disconnect();
                          })
                          .catch(er => {
                            console.log(chalk.redBright('Mongoose_save_error'), er);
                            mongoose.disconnect();
                          })

                          
                        })
                        .catch(er => {
                          console.log(chalk.redBright('Mongoose_save_error'), er);
                          mongoose.disconnect();
                        })
                      });

                    } else {
                      const { prevPoll } = msgData[0]
                      // Продолжение пула
                      const msgTarget = MsgModel({
                        text: faker.lorem.text(),
                        author: userId,
                        dialog: dialogId,
                        createdAt: Date.now(),
                        poll: poll,
                        prevPoll,
                        nextPoll: ''
                      });
                      
                      msgTarget.save()
                      .then(() => {
                        console.log('SC_ADD_NEW_MSG');
                        mongoose.disconnect();
                      })
                      .catch(er => {
                        console.log(chalk.redBright('Mongoose_save_error'), er);
                        mongoose.disconnect();
                      })
                    }
                  }
                })
                
                

                
              })

            }).catch(er => {
              console.log(chalk.redBright('Mongoose_findOne_error'), er);
              return;
            })
          })

          //===============================================================

          //====================Работа с поиском===========================

          // this.dBConnection().then(() => {
          //   const searchName = 'Novella.Ferry87';
          //   // this.searchDate = this?.searchDate || Date.now();

          //   UserModel.findOne({name: searchName}).exec((er, {_id}) => {

          //     if(er) {
          //       console.log(chalk.redBright('Mongoose_findOne_error'), er);
          //       return      
          //     }

          //     DialogModel.find(
          //       {
          //         $or: [
          //           { author: _id },
          //           { partner: _id }
          //         ]
          //       }
          //       // {
          //       //   registrateDate: {$lt: this.searchDate}
          //       // }
          //     )
          //     // .limit(3)
          //     // .sort({registrateDate: 1})
          //     .populate(['partner', 'author'])
          //     .exec((er, data) => {
          //       if(er) {
          //         console.log(chalk.redBright('Mongoose_save_error'), er);
          //         return      
          //       }
                
          //       socket.emit('RES_MSGS', data)
          //       mongoose.disconnect()
          //     })
          //   })

            
          // })

          //////////////////////////////////////////////////////////////////

          //////////////////Получатель сообщений по пулу////////////////////

          // this.dBConnection().then(() => {

          //   const getNextPoll = () => {
          //     MsgModel.find({poll: this.workPoll}).then(msgs => {
          //       console.log('FIND_ONE_RES:', msgs);

          //       socket.emit('RES_MSGS', msgs)

          //       this.workPoll = msgs[0].prevPoll;
          //       mongoose.disconnect();
          //     })
          //   }
            
          //   // защита от перелезания дальше
          //   const checkEqual = this?.workPoll === 'none';
          //   if(checkEqual) {
          //     console.log('STOP_WORKING')
          //     mongoose.disconnect();
          //     return
          //   }

          //   const dialogId = '611a762e14b0ef4538b49c47';
          //   if(!this?.workPoll) {
          //     DialogModel.findById(dialogId)
          //     .then(dialog => {
          //       console.log('SC_FIND_DIALOG:', dialog);
          //       this.workPoll = dialog.poll;
          //       getNextPoll();

          //     })
          //     .catch(er => {
          //       console.log(chalk.redBright('Mongoose_findById_error'), er);
          //       mongoose.disconnect();     
          //     })
          //   } else {
          //     getNextPoll();
          //   }
            
          // })

          //////////////////////////////////////////////////////////////////

        })
        // .on('GET_PEOPLE', () => {
        //   UserModel.find().then(data => {
        //     setTimeout(() => {
        //       socket.emit('RES_PEOPLE', data);
        //       console.log('RES_PEOPLE')
              
        //     }, 3000)
            
        //   }).catch(er => {
        //     console.log(chalk.redBright('MONGOOSE_FIND_PEOPLE_ER:'), er);
        //   })
          
        //   // this.dBConnection().then(() => {
            
        //   // })
        // })
        .on('LOGOUT', () => {
          console.log('SOCKET_HANDSHAKE:', socket.handshake.decode)
        })
        .on('disconnect', (socket) => {
          console.log(chalk.redBright('Disconnect_user'), socket);
        })

      //   })
    })

  }


  dBConnection() {
    return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
          const db = mongoose.connection;

          db.on('error', er => {
            console.log(chalk.redBright('Mongoose_connection_error'), er);
            reject(er);
            return
          });
          db.once('open', () => {
            resolve();
            return
          })
    })
  }

  getAnotherRandom(fR, len) {
    const res = Math.floor(len*Math.random());
    if(res === fR) {
      return this.getAnotherRandom(fR, len)
    } else {
      return res
    }
  }

  
}

module.exports = WSServer;