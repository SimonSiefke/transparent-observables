const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
var finalhandler = require('finalhandler')

var http = require('http')
var serveStatic = require('serve-static')

const root = path.join(__dirname, '..')
var serve = serveStatic(root)

// Create server
var server = http.createServer(function onRequest(req, res) {
  // @ts-ignore
  serve(req, res, finalhandler(req, res))
})
server.listen(3000, async () => {
  const pdf = await printPDF()
  fs.writeFileSync(path.join(root, './out.pdf'), pdf)
  server.close()
})

async function printPDF() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto('http://localhost:3000/index.html', {
    waitUntil: 'networkidle0',
  })
  const margin = '40px'
  const pdf = await page.pdf({
    format: 'A4',
    margin: { top: margin, right: margin, bottom: margin, left: margin },
  })

  await browser.close()
  return pdf
}
