const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(express.json())
app.use(cors());

const apiRoutes = require("./routes/apiRoutes")

app.get('/', async (req, res, next) => {
    res.json({message:"Api on running"})
})

// DB Connect
const connectDB = require("./config/db")
connectDB()

app.use('/api', apiRoutes)

app.use((error, req, res, next) => {
    console.error(error);
    next(error)
})
app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message,
        stack: error.stack
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})