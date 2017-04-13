import express from 'express'
import http from 'http'
import url from 'url'
import WebSocket from 'ws'
import sharedRecord from '../model/sharedRecord'

const app = express()

app.use(function (req, res) {
  res.send({ msg: "hello" })
})

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws) => {
  const location = url.parse(ws.upgradeReq.url, true)
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', (message) => {
    console.log('received: %s', message)
    sharedRecord.lastUpdated = new Date().toISOString()
    // broadcast change to all listeners
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(sharedRecord))
      }
    })
  })

  ws.send('something')
})

export default server