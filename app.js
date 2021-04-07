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
const LocalStrategy = require("passport-local");

//simplifies the integration between Mongoose and Passport for local authentication
const passportLocalMongoose = require("passport-local-mongoose");

// SET THE VIEW ENGINE
app.set('view engine', 'html');
app.engine('html', twig.__express);
app.set('views','views');

// MONGO DATABASE URL
// const MONGODB_URL = 'mongodb+srv://test:test123@cluster0.8tyse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_URL = 'mongodb+srv://test:Password@cluster0.7bulh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URL, { useUnifiedTopology: true });
 
// PUBLIC ACCESIBLE TO OUR BACKEND APPLICATION
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js'));

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
app.use(bodyParser.urlencoded({ extended:true }));
app.use(passport.initialize());
app.use(passport.session());

// START OUR SERVER
mongoose.connect(MONGODB_URL, {useNewUrlParser : true})
    .then((result) => {
        app.listen(3001);
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
    app.get("/home", (req,res) =>{
        res.render("home")
    })
    // app.get("/dashboard", (req,res) =>{
    //     res.render("dashboard")
    // })
    app.get("/list", (req,res) =>{
        res.render("list")
    })
    app.get("/edit", (req,res) =>{
        res.render("edit")
    })
    app.get("/account", (req,res) =>{
        res.render("account")
    })
    
    app.get("/plant/", (req,res) =>{

        res.render("plant")
    })
    




// REGISTER A NEW USER
app.post("/signup",(req,res)=>{ 
    User.register(new User({            //passport-local-mongoose function to register a new user
    	username:req.body.username,
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




// ADD A POST
app.post('/list', (req, res) => {
    new Post({
        plant_name:req.body.plant_name,
        description:req.body.description,
        price:req.body.price,
        image_url:req.body.image_url
    })
    .save()
    .then(result => {
        console.log(result);
        res.redirect('/');
    })
    .catch(err => {
        if (err) throw err;
    });
});

// DISPLAY COMMENTS
app.get('/dashboard', isLoggedIn, (req, res) => {
    // FETCH ALL POSTS FROM DATABASE
    Post.find()
    // sort by most recent
    .sort({createdAt: 'descending'})
    .then(result => {
        if(result){
            // RENDERING HOME VIEW WITH ALL POSTS
            res.render('dashboard',{
                allpost:result,
                user: req.user
            });
        }
    })
    .catch(err => {
        if (err) throw err;
    }); 
});


// app.get('/', (req, res) => {
//     console.log('return post')
//     Post.find()
//     .sort({createdAt: 'descending'})
//     .then(result => {
//         if(result){
//             res.render('dashboard',{
//                 allpost:result
//             });
//         }
//     })
//     .catch(err => {
//         if (err) throw err;
//     }); 
// });


// DELETE COMMENTS
app.get('/delete/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then(result => {
        res.redirect('/dashboard');
    })
    .catch(err => {
        console.log(err);
        res.redirect('/dashboard');
    })
});



//UPDATE POST
app.get('/plant/:id', (req, res) => {
    
    Post.findById(req.params.id)
    .then(result => {
        if(result){
            res.render('plant',{
                post:result
            });
        }
        else{
            res.redirect('/');
        }
    })
    .catch(err => {
        res.redirect('/');
    });
});

//UPDATE POST
app.post('/plant/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(result => {
        if(result){
            result.plant_name = req.body.plant_name;
            result.description = req.body.description;
            result.price = req.body.price;
            return result.save();
        }
        else{
            console.log(err);
            res.redirect('/');
        }
    })
    .then(update => {
        res.redirect('/dashboard');
    })
    .catch(err => {
        res.redirect('/');
    });
});



// LOGOUT 
app.get("/logout",(req,res)=>{  // logout function
    req.logout();
    res.redirect("/");
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) 
                return next();
            res.redirect('/');     
};

