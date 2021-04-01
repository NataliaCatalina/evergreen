//NPM PACKAGES
const express = require('express');
const mongoose = require ('mongoose');
const passport =  require("passport");
const bodyParser = require ('body-parser');
const twig  = require('twig');
const app = express();

// IMPORT OUR MODEL
const User = require("./models/user");
const Post = require('./models/post'); 

// SETTING UP THE STRATEGY TO PRIVIDE SECURITY
const LocalStrategy =  require("passport-local");

//simplifies the integration between Mongoose and Passport for local authentication
const passportLocalMongoose =  require("passport-local-mongoose");

// SET THE VIEW ENGINE
app.set('view engine', 'html');
app.engine('html', twig.__express);
app.set('views','views');

// MONGO DATABASE URL
const MONGODB_URL = 'mongodb+srv://test:test123@cluster0.8tyse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URL, { useUnifiedTopology: true });
 
// PUBLIC ACCESIBLE TO OUR BACKEND APPLICATION
app.use(express.static(__dirname + '/public'));

// USE BODY PASRSER
app.use(bodyParser.urlencoded({extended:false}));

app.use(require("express-session")({
    secret:"any normal word", //decode or encode session, this is used to compute the hash.
    resave: false,              //What this does is tell the session store that a particular session is still active, in the browser
    saveUninitialized:false    //the session cookie will not be set on the browser unless the session is modified
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 
passport.use(new LocalStrategy(User.authenticate()));

// BIDYPARSER TO RETURN INFORMATION TO OUR DATABASE
app.use(bodyParser.urlencoded({ extended:true }))
app.use(passport.initialize());
app.use(passport.session());

// START OUR SERVER
mongoose.connect(MONGODB_URL, {useNewUrlParser : true})
    .then((result) => {
        app.listen(4000);
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
    app.get("/dashboard", (req,res) =>{
        res.render("dashboard")
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
    
// REGISTER A NEW USER
app.post("/signup",(req,res)=>{ 
    User.register(new User({            //passport-local-mongoose function to register a new user
    	username: req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        
    	}),
    	req.body.password,function(err,user){
        if(err){
            console.log(err);
        }
        passport.authenticate("local")(req,res,function(){ // authenticate the local session and redirect to login page
            console.log(req);
            res.redirect("/login");
        })    
    })
});

// SET UP THE FUNCTIONALITY FOR LOGGING AN EXISTING USER
app.post("/login", passport.authenticate("local",{
    successRedirect:"/dashboard",
    failureRedirect:"/login"
})
);

// LOGOUT 
app.get("/logout",(req,res)=>{  // logout function
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) 
                return next();
            res.redirect('/');     
}
