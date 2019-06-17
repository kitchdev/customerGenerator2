const express = require('express')
const app = express()
const port = 4001

const csvFaker = require('./lib/csvfaker')

app.get('/', async (req, res) => {
  const fakeRes = await csvFaker()
  res.send(fakeRes)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))