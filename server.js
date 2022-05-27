const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const port = 8080
const res = require('express/lib/response')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({origin: '*'}))


//connection to the database
const dbURLI = 'mongodb+srv://'+ process.env.DB_USER +':'+ process.env.DB_PASSWORD +'@portfolio-gen.sg7wl.mongodb.net/portfolio-gen?retryWrites=true&w=majority'
mongoose.connect(dbURLI)
  .then((result) => app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  }))
  .catch((err) => console.log(err))


// This POST API recieves connect account configuration variables and creates an account.
// This returns newly created account's id.
// app.post('/createConnectedAccount', async (req, res) => {
//   const params = req.body
//   let statusCode, response 
//   console.log(params)
//   try {
//     const account = await stripe.accounts.create(params)
//     statusCode = 200
//     response = {accountId: account.id}
//   } catch(e) { 
//     console.log(e)
//     statusCode = e.statusCode
//     response = {error: e.raw.message}
//   }
//   res.status(statusCode).send(response)
// })

