import test from 'ava'
import TweetEmbed from './tweet-embed'
import React from 'react'

test('renders', (t) => {
  t.snapshot(<TweetEmbed id="692527862369357824" className="tweet" />)
})

test.cb('calls twttr api', (t) => {
  global['window'] = {
    // @ts-expect-error
    twttr: {
      widgets: {
        createTweetEmbed: (...args) => {
          t.snapshot(args)
          t.end()
          return Promise.resolve()
        }
      }
    }
  }
  // @ts-expect-error
  global['window'].twttr.ready = () => Promise.resolve(global['window'].twttr)

  const comp = new TweetEmbed({ id: 'tweet_id', options: { myOption: 1 } })
  comp.componentDidMount()
})
