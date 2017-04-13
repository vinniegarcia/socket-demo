import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

const WEBSOCKET_URL = 'ws://localhost:1337/'

class App extends Component {

  constructor (props) {
    super(props)
    
    this.state = {
      count: 0,
      messages: []
    }
  }

  componentDidMount () {
    const ws = new WebSocket(WEBSOCKET_URL)

    ws.onopen = (e) => {
      ws.send('socket opened!')
    }

    ws.onmessage = this.handleData

    this.setState({
      ws
    })

    this.sendMessage()
  }

  componentWillUnmount () {
    this.state.ws.close()
  }

  handleData = (e) => {
    const sharedRecord = JSON.parse(e.data)
    this.setState({
        messages: this.state.messages.concat(['record last updated: ' + sharedRecord.lastUpdated]),
        count: this.state.count + 1
    })
  }

  sendMessage = (e) => {
    this.state.ws.send('button click')
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Websocket demo</h2>
        </div>
        <p className="App-intro">
          Count: <strong>{this.state.count}</strong>
        </p>
        <ul>
          {
            this.state.messages.map((msg, i) => <li key={`msg${i}`}>{msg}</li>)
          }
        </ul>
       
        <button onClick={this.sendMessage}>Update Shared Record</button>
      </div>
    );
  }
}

export default App
