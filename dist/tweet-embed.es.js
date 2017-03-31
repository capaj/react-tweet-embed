import React, { PropTypes } from 'react';

const callbacks = [];

function addScript(src, cb) {
  if (callbacks.length === 0) {
    callbacks.push(cb);
    var s = document.createElement('script');
    s.setAttribute('src', src);
    s.onload = () => callbacks.forEach(cb => cb());
    document.body.appendChild(s);
  } else {
    callbacks.push(cb);
  }
}

class TweetEmbed extends React.Component {
  componentDidMount() {
    const renderTweet = () => {
      window.twttr.ready().then(({ widgets }) => {
        const { options, onTweetLoadSuccess, onTweetLoadError } = this.props;
        widgets.createTweetEmbed(this.props.id, this._div, options).then(onTweetLoadSuccess).catch(onTweetLoadError);
      });
    };

    if (!window.twttr) {
      const isLocal = window.location.protocol.indexOf('file') >= 0;
      const protocol = isLocal ? this.props.protocol : '';

      addScript(`${protocol}//platform.twitter.com/widgets.js`, renderTweet);
    } else {
      renderTweet();
    }
  }

  render() {
    return React.createElement('div', { ref: c => {
        this._div = c;
      } });
  }
}

TweetEmbed.propTypes = {
  id: PropTypes.string,
  options: PropTypes.object,
  protocol: PropTypes.string,
  onTweetLoadSuccess: PropTypes.func,
  onTweetLoadError: PropTypes.func
};

TweetEmbed.defaultProps = {
  protocol: 'https:',
  options: {}
};

export default TweetEmbed;
