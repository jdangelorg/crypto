const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')

const app = express()

const port = process.env.PORT || 3000

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

// declare static middleware
app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)

app.get('/about', handlers.about)

// custom 404 page
app.use(handlers.notFound)

// custom 500 page
app.use(handlers.serverError)

if(require.main === module) {
    app.listen(port, () => {
        console.log(`Express started on 
        http://localhost:${port}; ` +
        `press Ctrl-C to terminate.`)
    })
} else {
    module.exports = app
}