import React from 'react'
import PropTypes from 'prop-types'

const callbacks = []

function addScript(src: string, cb: () => any) {
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

interface ITweetEmbedProps {
  id: string
  options?: object
  placeholder?: string | React.ReactNode
  protocol?: string
  onTweetLoadSuccess?: (twitterWidgetElement: HTMLElement) => any
  onTweetLoadError?: (err: Error) => any
  className?: string
}

interface ITweetEmbedState {
  isLoading: boolean
}

class TweetEmbed extends React.Component<ITweetEmbedProps> {
  _div?: HTMLDivElement
  static propTypes = {
    id: PropTypes.string,
    options: PropTypes.object,
    protocol: PropTypes.string,
    onTweetLoadSuccess: PropTypes.func,
    onTweetLoadError: PropTypes.func,
    className: PropTypes.string
  }

  static defaultProps = {
    protocol: 'https:',
    options: {},
    className: null
  }

  state: ITweetEmbedState = {
    isLoading: true
  }
  loadTweetForProps(props: ITweetEmbedProps) {
    const renderTweet = () => {
      const twttr = window['twttr']
      twttr.ready().then(({ widgets }) => {
        // Clear previously rendered tweet before rendering the updated tweet id
        if (this._div) {
          this._div.innerHTML = ''
        }

        const { options, onTweetLoadSuccess, onTweetLoadError } = props
        widgets
          .createTweetEmbed(this.props.id, this._div, options)
          .then((twitterWidgetElement) => {
            this.setState({
              isLoading: false
            })
            onTweetLoadSuccess && onTweetLoadSuccess(twitterWidgetElement)
          })
          .catch(onTweetLoadError)
      })
    }

    const twttr = window['twttr']
    if (!(twttr && twttr.ready)) {
      const isLocal = window.location.protocol.indexOf('file') >= 0
      const protocol = isLocal ? this.props.protocol : ''

      addScript(`${protocol}//platform.twitter.com/widgets.js`, renderTweet)
    } else {
      renderTweet()
    }
  }

  componentDidMount() {
    this.loadTweetForProps(this.props)
  }

  shouldComponentUpdate(
    nextProps: ITweetEmbedProps,
    nextState: ITweetEmbedState
  ) {
    return (
      this.props.id !== nextProps.id ||
      this.props.className !== nextProps.className
    )
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.id !== nextProps.id) {
      this.loadTweetForProps(nextProps)
    }
  }

  render() {
    const { props, state } = this

    return (
      <div
        className={this.props.className}
        ref={(c) => {
          this._div = c
        }}
      >
        {state.isLoading && props.placeholder}
      </div>
    )
  }
}

export default TweetEmbed
