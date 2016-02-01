import React, {PropTypes} from 'react'

function addScript (src, cb) {
  var s = document.createElement('script')
  s.setAttribute('src', src)
  s.onload = cb
  document.body.appendChild(s)
}

class TweetEmbed extends React.Component {
  componentDidMount () {
    const renderTweet = () => {
      window.twttr.widgets.createTweetEmbed(this.props.id, this.refs.div)
    }
    if (!window.twttr) {
      addScript('//platform.twitter.com/widgets.js', renderTweet)
    } else {
      renderTweet()
    }
  }
  render () {
    return <div ref='div'></div>
  }
}

TweetEmbed.propTypes = {
  id: PropTypes.string
}

export default TweetEmbed
