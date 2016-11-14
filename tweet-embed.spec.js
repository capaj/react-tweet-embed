import test from 'ava'
import snappy from 'react-snappy'
import TweetEmbed from './tweet-embed'
import React from 'react'

test('renders', t => {
  snappy.check(<TweetEmbed id='692527862369357824' />)
})
