import React from 'react';
import PropTypes from 'prop-types';

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
    return React.createElement('div', { className: this.props.className, ref: c => {
        this._div = c;
      } });
  }
}

TweetEmbed.propTypes = {
  id: PropTypes.string,
  options: PropTypes.object,
  protocol: PropTypes.string,
  onTweetLoadSuccess: PropTypes.func,
  onTweetLoadError: PropTypes.func,
  className: PropTypes.string
};

TweetEmbed.defaultProps = {
  protocol: 'https:',
  options: {},
  className: null
};

export default TweetEmbed;
