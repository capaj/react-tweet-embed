import test from 'ava'
import puppeteer from 'puppeteer'
import ScreenshotTester from 'puppeteer-screenshot-tester'

let browser, page, tester
test.before('start e2e app', async () => {
  tester = await ScreenshotTester({
    threshold: 0.1
  })
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

test('screenshots are identical', async t => {
  await page.goto('http://localhost:3000/')
  await page.waitForSelector('twitterwidget')

  const identicalScreenshots = await tester(page, 'tweet-embed.spec.e2e')

  t.true(identicalScreenshots)
})

test.after.always('close e2e app', async () => {
  browser.close()
})
