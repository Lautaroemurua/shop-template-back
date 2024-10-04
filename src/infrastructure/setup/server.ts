import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'express-async-errors'

import WhatsappRouter from '../routers/WhatsappRouter.js'


const dev = !(process.env.NODE_ENV === 'producion')
const PORT = process.env.PORT || 15000
const HOST = '0.0.0.0'

export const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

const whitelist = (process.env.CORS || '').split(',')

if (!dev && process.env.CORS) {
  app.use(
    cors(
      {
        origin: (origin, callback) => {
          if (origin && whitelist.includes(origin)) {
            callback(null, true)
          } else {
            console.log('-- origin:', origin)
            console.log('-- lsita blanca:', whitelist)
            callback(null, false)
          }
        },
        optionsSuccessStatus: 200
      }
    )
  )
}

app.use('/wp', WhatsappRouter)

app.use((err, _req, res, _next) => {
  res.sendStatus(500)
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    console.log(`Running on http://${HOST}:${PORT}`)
    if (process.env.NODE_ENV === 'production') {
      console.log(`---------------------`)
    }
  })
}
