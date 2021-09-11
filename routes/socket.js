const creatSS = require('socket.io');
const chalk = require('chalk');
const faker = require('faker');
const uuid = require('uuid');

const MsgModel = require('../models/msg');
const DialogModel = require('../models/dialog');
const UserModel = require('../models/user');

const verifyJWToken = require('../utils/verifyJWToken');

const { v4 } = uuid

const mongoose = {disconnect: () => {}}

class WSServer {
  constructor(server) {
    global.sockets = [];
    this.io = creatSS(server, { origin: '*:*', })
    
    .on('connection', socket => {

      socket.use((packet, next) => {
        // Отработка исключения
        if(packet?.[0] === 'LOGOUT') {
          next();
        }

        const token = packet?.[1]?.token;
        verifyJWToken(token).then(decoded => {

          socket.handshake.decode = decoded;
          // console.log(chalk.green('LOG:'),packet)
          next();
        })
        .catch(er => {})
        
      })

      socket
        .on('JOIN', ({}, cb) => {

          const { _id } = socket.handshake.decode;
          socket.join(_id);
          this.setOnlineServer(socket, _id, true)

          const rooms = [...socket.rooms]
          console.log("SUCCESS_JOIN| ROOMS:", rooms)

          cb(rooms)
          // Бродкастнуть всем, что я стал онлайн
        })
        // .on('JOIN_ROOM', ({room}, cb = () => {}) => {
        //   socket.join(room)
        //   console.log("SUCCESS_JOIN_ROOM| ROOMS:", socket.rooms)
        //   cb({rooms: [...socket.rooms]})
        // })
        .on('MSG', (data) => {
          debugger
          socket.emit('CLIENT_MSG', 'Ответочка')
        })
        .on('PRIVATE_MSG', ({payload: {addres, message}}, cb) => {

          // this.dBConnection().then(() => {
          //   const target = MsgModel({text: message, address: addres});
          //   target.save((er, doc) => {
          //     if(er) {
          //       console.log(chalk.redBright('Mongoose_save_error'), er);
          //       return
          //     }
          //     console.log(chalk.green('SUCCESS_SAVE'), doc);

          //     mongoose.disconnect();
          //   })
          // })
          // socket.join(addres)

          socket.to(addres).emit('RES_PRIVATE_MSG', message);
          // socket.leave(addres)
          const rooms = [...socket.rooms]
          console.log(chalk.magentaBright('SENDER_ROOMS'), rooms)
          cb(rooms);
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

          this.dBConnection().then(() => {
            const newUser = UserModel({
              loginName: faker.internet.userName(),
              nickName: faker.internet.userName(),
              password: faker.internet.password(),
              last_seen: Date.now(), 
              confirmed: false,
              registrateDate: Date.now(),
            })
            .save((er) => {
              if(er) {
                console.log(chalk.redBright('Mongoose_save_error'), er);
                return      
              }
              console.log('SUCCESS_SAVE_USER')
            })
          })

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
          // this.dBConnection().then(() => {

          //   // const searchName = 'Novella.Ferry87';
          //   const { loginName: decodeLoginName } = socket.handshake.decode

          //   console.log(socket.handshake.decode)

          //   UserModel.findOne({loginName: decodeLoginName}).then(data => {
          //     console.log('THEN_DATA:',data)
              
          //     const { _id: userId } = data

              
          //     DialogModel.find({$or: [{author: userId}, {partner: userId}]})
          //     .populate(['author', 'partner'])
          //     .then(dialogData => {
          //       console.log('DIALOG_DATA:', dialogData);
    
          //       const newDialogId = '611e667194c3dc6cfcc172d5'

          //       const choosedDialog = dialogData.filter(({ _id }) => {
          //         // console.log(typeof _id)
          //         // console.log(_id)
          //         // console.log(typeof newDialogId)
          //         return _id == newDialogId;
          //       })

          //       console.log('CHOOSED_DIALOG:', choosedDialog);

          //       const { _id: dialogId, poll } = choosedDialog[0];
                
          //       // Получение сообщений для того что бы понять в каком состоянии диалог
          //       MsgModel.find({ dialog: dialogId, poll: poll })
          //       .then(msgData => {
                  
          //         console.log('MSG_DATA:', msgData);
          //         // Все 3 ситуации отдельно обрабатываются
          //         if(!msgData.length) {
          //           // Инициализация серии сообщений
          //           const msgTarget = MsgModel({
          //             text: faker.lorem.text(),
          //             author: userId,
          //             dialog: dialogId,
          //             createdAt: Date.now(),
          //             poll: poll,
          //             prevPoll: 'none',
          //             nextPoll: ''
          //           });
                    
          //           msgTarget.save()
          //           .then(() => {
          //             console.log('SC_SAVE_FM');
          //             mongoose.disconnect();
          //           })
          //           .catch(er => {
          //             console.log(chalk.redBright('Mongoose_save_error'), er);
          //             mongoose.disconnect();
          //           });
          //         } else {
          //           // Продолжение серии и проверки
          //           const pollLen = 3;

          //           if(msgData.length >= pollLen) {
          //             // Составление нового пула 
          //             const newPollId = v4();
          //             MsgModel.updateMany({poll}, {nextPoll: newPollId})
          //             .then(() => {
          //               console.log('SC_UPDATE_MSGS');

          //               const msgTarget = MsgModel({
          //                 text: faker.lorem.text(),
          //                 author: userId,
          //                 dialog: dialogId,
          //                 createdAt: Date.now(),
          //                 poll: newPollId,
          //                 prevPoll: poll,
          //                 nextPoll: '',
          //               });
                        
          //               msgTarget.save()
          //               .then(() => {
          //                 console.log('SC_ADD_NEW_MSG');
          //                 DialogModel.updateOne({ _id: dialogId }, { poll:newPollId })
          //                 .then(() => {
          //                   console.log('SC_UP_DIALOG_POLL');
          //                   mongoose.disconnect();
          //                 })
          //                 .catch(er => {
          //                   console.log(chalk.redBright('Mongoose_save_error'), er);
          //                   mongoose.disconnect();
          //                 })

                          
          //               })
          //               .catch(er => {
          //                 console.log(chalk.redBright('Mongoose_save_error'), er);
          //                 mongoose.disconnect();
          //               })
          //             });

          //           } else {
          //             const { prevPoll } = msgData[0]
          //             // Продолжение пула
          //             const msgTarget = MsgModel({
          //               text: faker.lorem.text(),
          //               author: userId,
          //               dialog: dialogId,
          //               createdAt: Date.now(),
          //               poll: poll,
          //               prevPoll,
          //               nextPoll: ''
          //             });
                      
          //             msgTarget.save()
          //             .then(() => {
          //               console.log('SC_ADD_NEW_MSG');
          //               mongoose.disconnect();
          //             })
          //             .catch(er => {
          //               console.log(chalk.redBright('Mongoose_save_error'), er);
          //               mongoose.disconnect();
          //             })
          //           }
          //         }
          //       })
                
                

                
          //     })

          //   }).catch(er => {
          //     console.log(chalk.redBright('Mongoose_findOne_error'), er);
          //     return;
          //   })
          // })

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
        .on('GET_PEOPLE', () => {
          UserModel.find().then(data => {
            socket.emit('RES_PEOPLE', data);
            
          }).catch(er => {
            console.log(chalk.redBright('MONGOOSE_FIND_PEOPLE_ER:'), er);
          })
        })
        .on('CREATE_NEW_DIALOG', ({newDialogTargetId}) => {
          const { _id: myId } = socket.handshake.decode

          DialogModel({
            author: myId,
            partner: newDialogTargetId, 
            poll: v4()
          }).save().then(dialog => {
            DialogModel.findById(dialog['_id'])
            .populate(['author', 'partner'])
            .then(dialog => {
              socket.emit('RES_NEW_DIALOG', {dialog, target: 'me'});

              UserModel.findById(newDialogTargetId).then(user => {
                
                const { online, _id } = user
                if(online) {
                  const _idAddres = _id+'';
                  socket.to(_idAddres).emit('RES_NEW_DIALOG', {dialog, target: 'partner'})
                  
                  console.log('SEND_RES_NEW_DIALOG', _id)
                  // socket.leave(_id)
                }
              })

            })
            
          })
        })
        .on('CREATE_MESSAGE', ({dialogId, poll, userId, targetUserId, text}) => {

          MsgModel.find({ dialog: dialogId, poll: poll })
          .then(msgData => {
            
            console.log('MSG_DATA:', msgData);
            // Все 3 ситуации отдельно обрабатываются
            if(!msgData.length) {
              // Инициализация серии сообщений
              const msgTarget = MsgModel({
                text,
                author: userId,
                dialog: dialogId,
                createdAt: Date.now(),
                poll: poll,
                prevPoll: 'none',
                nextPoll: ''
              });
              
              msgTarget.save()
              .then((message) => {
                console.log('SC_SAVE_FM');
                successSaveCallback(message);
              })
              .catch(er => {
                console.log(chalk.redBright('Mongoose_save_error'), er);
              });
            } else {
              // Продолжение серии и проверки
              const pollLen = 22;

              if(msgData.length >= pollLen) {
                // Составление нового пула 
                const newPollId = v4();
                MsgModel.updateMany({poll}, {nextPoll: newPollId})
                .then(() => {
                  console.log('SC_UPDATE_MSGS');

                  const msgTarget = MsgModel({
                    text,
                    author: userId,
                    dialog: dialogId,
                    createdAt: Date.now(),
                    poll: newPollId,
                    prevPoll: poll,
                    nextPoll: '',
                  });
                  
                  msgTarget.save()
                  .then((message) => {
                    console.log('SC_ADD_NEW_MSG');
                    successSaveCallback(message);

                    DialogModel.updateOne({ _id: dialogId }, { poll:newPollId })
                    .then(() => {
                      console.log('SC_UP_DIALOG_POLL');
                      
                    })
                    .catch(er => {
                      console.log(chalk.redBright('Mongoose_save_error'), er);
                    })
                  })
                  .catch(er => {
                    console.log(chalk.redBright('Mongoose_save_error'), er);
                  })
                });

              } else {
                const { prevPoll } = msgData[0]
                // Продолжение пула
                const msgTarget = MsgModel({
                  text,
                  author: userId,
                  dialog: dialogId,
                  createdAt: Date.now(),
                  poll: poll,
                  prevPoll,
                  nextPoll: ''
                });
                
                msgTarget.save()
                .then((message) => {
                  successSaveCallback(message);

                  console.log('SC_ADD_NEW_MSG');
                })
                .catch(er => {
                  console.log(chalk.redBright('Mongoose_save_error'), er);
                })
              }
            }
          })

          function successSaveCallback(message) {
            socket.emit('RES_MESSAGE', {message, dialogId});
            socket.to(targetUserId).emit('RES_MESSAGE', {message, dialogId})
          }
        })
        .on('READ_MESSAGE', ({dialogId, messagesId, targetUserId, pass}) => {
          
          MsgModel.updateMany({_id: messagesId}, {readed: true})
            .then((updated) => {
              console.log(chalk.cyanBright('UPDATED_MESSAGES:'), updated)
              socket.emit('SET_READ_MESSAGE', { dialogId, messagesId, pass })
              socket.to(targetUserId).emit('SET_READ_MESSAGE', { dialogId, messagesId })
            })
            .catch(er => {
              console.log(chalk.redBright('UPDATED_MESSAGES_ER:'), er)
            })
        })
        .on('GET_POLL_MESSAGES', ({poll}) => {
          // защита от перелезания дальше
          const checkEqual = poll === 'none';
          if(checkEqual) {
            console.log('STOP_WORKING')
            return
          }

          MsgModel.find({poll}).then(messages => {

            socket.emit('RES_POLL_MESSAGES', { messages })
            
          })
          .catch(er => {
            console.log(chalk.redBright('FIND_POLL_MESSAGES_ER'), er)
          })

        })
        .on('EDIT_PROFILE', ({newProfileData}) => {
          const { nickName, loginName, password, _id } = newProfileData;
          
          UserModel.findOne({loginName}).then(user => {
            debugger

            const continueSave = () => {
              UserModel.updateOne({_id}, { nickName, loginName, password})
              .then(updateRes => {
                socket.emit('SET_MY_PROFILE', newProfileData)
                DialogModel.find({$or: [{author: _id}, {partner: _id}]})
                .then(dialogs => {
                  const partnersId = dialogs.map(({author, partner}) => author+'' === _id ? partner+'' : author+'')
                  socket.to(partnersId).emit('SET_PROFILE', {newProfileData})
                })
              })
              .catch(er => {
                console.log(chalk.redBright('FIND_USER_BY_LOGINNAME_ER'), er)
              })
            }

            if(user === null) {
              // Юзера нет, значит логин свободен, продолжается сохранение
              continueSave()
            } else if(user['_id']+'' === _id+'') {
              // Юзер это я, продолжается сохранение других данных
              continueSave()
            } else {
              // Логин занят
              socket.emit('BAD_EDIT_PROFILE', {message: 'This login is already taken'})
            }

          })
          .catch(er => {
            console.log(chalk.redBright('FIND_USER_BY_LOGINNAME_ER'), er)
          })
        })
        .on('LOGOUT', ({_id}) => {
          this.setOnlineServer(socket, _id, false)
          
        })
        .on('disconnect', (reason) => {
          console.log(chalk.redBright('Disconnect_user'), reason);
          console.log(socket?.handshake?.decode)
          if(socket.handshake.hasOwnProperty('decode')) {
            const {_id} = socket.handshake.decode;
            this.setOnlineServer(socket, _id, false)
            
          }
        })

    })

  }


  dBConnection() {
    return new Promise((resolve, reject) => {
      // mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
      //     const db = mongoose.connection;

      //     db.on('error', er => {
      //       console.log(chalk.redBright('Mongoose_connection_error'), er);
      //       reject(er);
      //       return
      //     });
      //     db.once('open', () => {
      //       resolve();
      //       return
      //     })
      resolve()
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

  setOnlineServer(socket, _id, status) {
    UserModel.updateOne({_id}, {online: status}).then((upRes) => {
      DialogModel.find({$or: [{author: _id}, {partner: _id}]})
      .then(dialogs => {
        const partnersId = dialogs.map(({author, partner}) => author+'' === _id ? partner+'' : author+'');
        socket.to(partnersId).emit('SET_ONLINE', {_id, status})
      })
    })
    .catch(er => {
      console.log(chalk.redBright('UPDATE_USER_ONLINE_ER'), er)
    })
  }

  
}

module.exports = WSServer;