# react-tweet-embed

## Install

```
npm i react-tweet-embed
```

## Quickstart [![Edit react-tweet-embed](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/74rn3r9k0?fontsize=14)

```javascript
import TweetEmbed from 'react-tweet-embed'
;<TweetEmbed id="692527862369357824" />
```

You don't have to put `//platform.twitter.com/widgets.js` script in your index.html as this lib will put it there if `twttr` is not found on window.

## Using Options

```
<TweetEmbed id='783943172057694208' options={{cards: 'hidden' }}/>
<TweetEmbed id='771763270273294336' options={{theme: 'dark' }}/>
```

Embedded-Tweet Options Reference:  
https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference
