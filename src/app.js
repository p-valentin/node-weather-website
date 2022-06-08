const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast')

console.log(__dirname);
console.log(path.join(__dirname, '../public'))

const app = express();
const port = process.env.PORT || 3000;

//paths for express config
const dirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

//setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.use(express.static(dirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Title'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Title'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'helper help'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address;
    
    if (!address) {
        return res.send({
            error: 'No address found'
        })
    }
    geocode(address, (error, {longitude, latitude, locationName} = {}) => {
        if(error) {
           return res.send({
               error: error
           })
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error.message
                })
            }
            res.send({
                locationName,
                forecast: forecastData
            })
           
        })
    });
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "404",
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Running on port ' + port)
})