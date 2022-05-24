const uuid = require('uuid').v4
const { verifyRequestAuth } = require('../utils/auth/JwtAuth')

class WebSockets {
  static wss
  static connections = []

  static init(server) {
    const WebSocketServer = require('websocket').server

    this.wss = new WebSocketServer({
      httpServer: server,
    })

    this.wss.on('request', (request) => {
      console.log('Websocket request received.')
      const { token } = request.resourceURL.query
      const senderId = verifyRequestAuth(token)
      let connection = request.accept(null, request.origin)

      if (senderId) {
        WebSockets.connections.push(connection)
        connection.userId = senderId
      } else {
        connection.close()
      }

      connection.on('open', () => {
        console.log('Server socket Connection opened.')
      })

      connection.on('close', () => {
        console.log('Server socket Connection closed.')
        if (senderId) {
          const indexOfConnection = WebSockets.connections.findIndex(
            (connection) => connection.userId === senderId
          )
          WebSockets.connections.splice(indexOfConnection, 1)
        }
      })

      connection.on('message', (message) => {
        try {
          let msgData = JSON.parse(message.utf8Data)
          console.log(msgData)
          // Create a new Id for new chat
          if (msgData.chatId === undefined) {
            msgData.chatId = uuid()
          }
          msgData.messageId = uuid()
          // Send message to Recipient Connection and the sender as well.
          WebSockets.connections.map((connection) => {
            if (
              connection.userId == msgData.receiverId ||
              connection.userId == msgData.senderId
            ) {
              connection.send(JSON.stringify(msgData))
            }
          })
        } catch (error) {
          console.log(error)
        }
      })
    })
  }
}

module.exports = WebSockets
