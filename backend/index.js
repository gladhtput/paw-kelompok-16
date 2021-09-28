const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const todoRoutes = require('./routes/todo')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/todo', todoRoutes)
const dbconnect = 'mongodb+srv://admin:LPOettKsbyO0Yj7Z@cluster0.sl1yj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbconnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log('server running')
    })
}).catch(err => console.log(err))

