import test from 'ava'
import puppeteer from 'puppeteer'

let browser, page
test.before('start e2e app', async () => {
  console.log('Before')
  browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true
  })
  page = await browser.newPage()

  page.emulate({
    viewport: {
      width: 900,
      height: 600
    },
    userAgent: ''
  })
})

test('does the thing', async t => {
  await page.goto('http://localhost:3000/')
  await page.waitForSelector('twitterwidget')

  await page.screenshot({ path: 'tweet-embed.spec.e2e.png' })

  // const html = await page.$('twitterwidget')

  // TODO add pixelmatch

  t.truthy(true)
})

test.after.always('close e2e app', async () => {
  console.log('After')
  browser.close()
})
