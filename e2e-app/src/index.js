import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TweetEmbed from 'react-tweet-embed'

import './index.css'

class App extends Component {
  render () {
    return (
      <div>
        <TweetEmbed id='692527862369357824' className='additional-style' />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
