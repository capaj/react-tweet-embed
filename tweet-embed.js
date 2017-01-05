import React, {PropTypes} from 'react'

const callbacks = []

function addScript (src, cb) {
  if (callbacks.length === 0) {
    callbacks.push(cb)
    var s = document.createElement('script')
    s.setAttribute('src', src)
    s.onload = () => callbacks.forEach((cb) => cb())
    document.body.appendChild(s)
  } else {
    callbacks.push(cb)
  }
}

class TweetEmbed extends React.Component {

  constructor(props) {
    super(props)

    if (this.props.preview) {
      this.state = {
        showPreview: true
      }
    }
  }

  componentDidMount () {
    const options = this.props.options || {}

    const renderTweet = () => {
      window.twttr.widgets.createTweetEmbed(this.props.id, this._div, options)
    }
    if (!window.twttr) {
      addScript('//platform.twitter.com/widgets.js', renderTweet)

      if (this.state.hasOwnProperty('showPreview') {
        callbacks.push(() => this.setState({showPreview: false}))
      }

    } else {
      renderTweet()
      this.setState({showPreview: false})
    }
  }

  render () {
    return (
      <div ref={(c) => { this._div = c}}>
        { this.state.showPreview && this.props.preview }
      </div>
    )
  }
}

TweetEmbed.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.object,
  preview: PropTypes.element
}

export default TweetEmbed
