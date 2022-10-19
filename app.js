const exprees = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const ShortUrl = require('./models/ShortUrl')


// Express
const app = exprees()

// To use app that we using url parameter
app.use(exprees.urlencoded({extended : false}))

// Engine
app.set('view engine', 'ejs')

// Database Connection
mongoose.connect('mongodb://localhost/stubby',{
    useNewUrlParser: true, useUnifiedTopology : true
})

// Home Page
app.get('/',async (req,res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', {shortUrls : shortUrls})
})

// GEt Url from Home Page
app.post('/short', async (req,res) => {
    // Check if thethe key is already present 
    while(true){
        let id = shortid.generate()
        let short = await ShortUrl.findOne({short: id})
        let long = await ShortUrl.find({full:req.body.longurl})
        if(short === null && long.length === 0) {
            await ShortUrl.create({full: req.body.longurl})
            break
        }
        else {
            res.render('meassage',{meassage : "Link Already Shorten"})
            return
        }    
    }

    // redirect to home page
    res.redirect('/')
})

// Redirect
app.get('/:shorturl', async (req,res) => {
    const shorturl = await ShortUrl.findOne({ short : req.params.shorturl})

    // console.log(shorturl)
    if(shorturl == null) return res.sendStatus(404)

    shorturl.clicks++
    shorturl.save()

    res.redirect(shorturl.full)
})


app.listen(process.env.PORT || 5000,()=>console.log("server started"))