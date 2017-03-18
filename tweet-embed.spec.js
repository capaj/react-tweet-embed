import test from 'ava'
import TweetEmbed from './tweet-embed'
import React from 'react'

test('renders', t => {
  t.snapshot(<TweetEmbed id='692527862369357824' />)
})

test.cb('calls twttr api', t => {
  global.window = {
    twttr: {
      widgets: {
        createTweetEmbed: (...args) => {
          t.snapshot(args)
          t.end()
        }
      }
    }
  }

  const comp = new TweetEmbed({id: 'tweet_id', options: {myOption: 1}})
  comp.componentDidMount()
})
