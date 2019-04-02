/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const finalhandler = require('finalhandler')
const http = require('http')
const serveStatic = require('serve-static')

const root = path.join(__dirname, '..')

async function prerender() {
  console.log('prerender')
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto('http://localhost:3000/index.html', {
    waitUntil: 'networkidle0',
  })
  console.log('waiting')
  await page.waitFor(3000)
  console.log('done waiting')
  const content = await page.content()
  fs.writeFileSync(path.join(root, 'docs/out/index.prerendered.html'), content)
  await browser.close()
}

async function printPDF() {
  console.log('print pdf')
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto('http://localhost:3000/index.prerendered.html', {
    waitUntil: 'networkidle0',
  })
  const margin = '40px'
  const pdf = await page.pdf({
    format: 'A4',
    margin: { top: margin, right: margin, bottom: margin, left: margin },
  })
  console.log('close browser')
  await page.close()
  await browser.close()
  console.log('browser closed')
  return pdf
}

const serve = serveStatic(path.join(root, 'docs/out'))

// Create server
const server = http.createServer((req, res) => {
  // @ts-ignore
  serve(req, res, finalhandler(req, res))
})
server.listen(3000, async () => {
  await prerender()
  const pdf = await printPDF()
  fs.writeFileSync(path.join(root, 'out.pdf'), pdf)
  console.log('wrote file to disk')
  server.close(() => {
    console.log('server closed')
  })
})
