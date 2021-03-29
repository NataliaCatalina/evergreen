//NPM packages
const express = require('express');
const mongoose = require ('mongoose');
const passport =  require("passport");
const bodyParser = require ('body-parser');
const twig  = require('twig');
const app = express();

// lets import our model
const User = require("./models/user");
const Post = require('./models/post'); 

//we're setting up the strategy to provide security
const LocalStrategy =  require("passport-local");

// set the view engine
app.set('view engine', 'html');
app.engine('html', twig.__express);
app.set('views','views');

const MONGODB_URL = 'mongodb+srv://test:test123@cluster0.8tyse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


 
//we need to make the public accessible to our backend application (images,styling)
app.use(express.static(__dirname + '/public'));

// Use body parser
app.use(bodyParser.urlencoded({extended:false}));



mongoose.connect(MONGODB_URL, {useNewUrlParser : true})
    .then((result) => {
        app.listen(3010);
        console.log('database is connected');
        
    }).catch((err) => {
        if(err) throw err;
    });

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/views/home.html');
       });
    app.get("/signup", (req,res) =>{
        res.render("signup")
    })
    app.get("/login", (req,res) =>{
        res.render("login")
    })
    app.get("/list", (req,res) =>{
        res.render("list")
    })
    app.get("/edit", (req,res) =>{
        res.render("edit")
    })
    app.get("/account", (req,res) =>{
        res.render("account")
    })
    
