# react-tweet-embed

## Install

```
npm i react-tweet-embed
```

## Quickstart [![Edit react-tweet-embed](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/74rn3r9k0?fontsize=14)

```tsx
import React from 'react'
import TweetEmbed from 'react-tweet-embed'

export const App = () => {
  return <TweetEmbed tweetId="692527862369357824" />
}
```

You don't have to put `//platform.twitter.com/widgets.js` script in your index.html as this lib will put it there if `twttr` is not found on `window`.

## Props

### `placeholder`

Text to be shown while the tweet is loading:
```html
<TweetEmbed id='1186523464712146944' placeholder='Sending this tweet through space via Starlink satellite 🛰'/>
```

### `options`

Key-value pairs from the [embedded tweet parameter reference](https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference):

```html
<TweetEmbed id='783943172057694208' options={{cards: 'hidden' }}/>
<TweetEmbed id='771763270273294336' options={{theme: 'dark' }}/>

```
