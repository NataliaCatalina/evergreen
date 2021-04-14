///////////////////
// NPM PACKAGES //
/////////////////

const express = require('express');
const mongoose = require ('mongoose');
const passport =  require("passport");
const bodyParser = require ('body-parser');
const twig  = require('twig');
const app = express();


///////////////////////
// IMPORT OUR MODEL //
/////////////////////

const User = require("./models/user");
const Post = require('./models/post'); 


// SETTING UP THE STRATEGY TO PRIVIDE SECURITY
const LocalStrategy = require("passport-local");

//simplifies the integration between Mongoose and Passport for local authentication
const passportLocalMongoose = require("passport-local-mongoose");

//////////////////
// VIEW ENGINE //
////////////////

app.set('view engine', 'html');
app.engine('html', twig.__express);
app.set('views','views');

/////////////////////////
// MONGO DATABASE URL //
///////////////////////

//Natalia-database
const MONGODB_URL = 'mongodb+srv://test:Password@cluster0.7bulh.mongodb.net/plantsDatabase?retryWrites=true&w=majority';
//Alex-database
// const MONGODB_URL = 'mongodb+srv://test:test123@cluster0.8tyse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URL, { useUnifiedTopology: true });


////////////////////////////////////////////////// 
// PUBLIC ACCESIBLE TO OUR BACKEND APPLICATION //
////////////////////////////////////////////////

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

// BOYPARSER TO RETURN INFORMATION TO OUR DATABASE
app.use(bodyParser.urlencoded({ extended:true }));
app.use(passport.initialize());
app.use(passport.session());


//////////////////////
// START OUR SERVER //
/////////////////////

mongoose.connect(MONGODB_URL, {useNewUrlParser : true})
    .then((result) => {
        app.listen(3001);
        console.log('database is connected');
        
    }).catch((err) => {
        if(err) throw err;
    });


//////////////////////
// RENDERING PAGES //
/////////////////////

    app.get('/', (req, res) => {
        Post.find()
        .sort({createdAt: 'descending'})
        .then(result => {
            if(result){
                res.render('home',{
                    allpost:result
                });
            }
        })
        .catch(err => {
            if (err) throw err;
        }); 
    });

    app.get("/public", (req,res) =>{
        Post.find()
        .sort({createdAt: 'descending'})
        .then(result => {
            if(result){
            res.render("public",{
            allpost:result
            });
        }
    })
    .catch(err => {
        if (err) throw err;
        }); 
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

    app.get("/about", (req,res) =>{
        res.render("about", {
            user: req.user
        })
    })
 
    app.get("/edit", (req,res) =>{
        res.render("edit")
    })

    app.get("/success", (req,res) =>{
        res.render("success", {
            user: req.user
        })
    })

    

/////////////////////////
// REGISTER A NEW USER //
/////////////////////////

app.post("/signup",(req,res)=>{ 
    User.register(new User({       
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

//////////////////////////////
// LOGGING AN EXISTING USER //
/////////////////////////////

app.post("/login", passport.authenticate("local",{
    successRedirect:"/dashboard",
    failureRedirect:"/login"
    })
);

/////////////////////
// ADD A PLANT LIST//
////////////////////

app.post('/list', (req, res) => {
    // console.log('request')
    new Post({
        plant_name:req.body.plant_name,
        description:req.body.description,
        price:req.body.price,
        image_url:req.body.image_url,
        category:req.body.category,
        author:req.user.username,
        lighting:req.body.lighting,
        watering:req.body.watering,
        temperature:req.body.temperature,
        size:req.body.size,
        trade:req.body.trade
    })
    .save()
    .then(result => {
        console.log(result);
        res.redirect('/dashboard');
    })
    .catch(err => {
        if (err) throw err;
    });
});

app.get("/list", isLoggedIn, (req,res) =>{
    res.render('list', {
        user: req.user
    });
});

/////////////////////
// UPDATE A PLANT //
////////////////////

app.get('/edit/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(result => {
        if(result){
              res.render('edit',{
                post:result
            });
        }
        else{
            res.redirect('/dashboard');
        }
    })
    .catch(err => {
        res.redirect('dashboard');
    });
});

//UPDATE POST
app.post('/edit/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(result => {
        if(result){
            result.plant_name = req.body.plant_name;
            result.description = req.body.description;
            result.price = req.body.price;
            result.image_url = req.body.image_url;
            result.category = req.body.category;
            result.author = req.body.author;
            result.lighting = req.body.lighting;
            result.watering = req.body.watering;
            result.temperature = req.body.temperature;
            result.size = req.body.size;
            result.trade = req.body.trade;
            return result.save();
        }
        else{
            console.log(err);
            res.redirect('/dashboard');
        }
    })
    .then(update => {
        res.redirect('/dashboard');
    })
    .catch(err => {
        res.redirect('/dashboard');
    });
});

////////////////////////
// DISPLAY PLANT LIST //
///////////////////////

app.get('/dashboard', isLoggedIn, (req, res) => {
    Post.find()
    .sort({createdAt: 'descending'})
    .then(result => {
        if(result){
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

app.get('/', (req, res) => {
    Post.find()
    .sort({createdAt: 'descending'})
    .then(result => {
        if(result){
            res.render('dashboard',{
                allpost:result
            });
        }
    })
    .catch(err => {
        if (err) throw err;
    }); 
});

//////////////////////////
// DELETE A PLANT LIST //
////////////////////////

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




//////////////////////////
// GO TO PLANT PROFILE//
////////////////////////
app.get('/plant/:id', (req, res) => {

    Post.findById(req.params.id)

    .then(result => {
        if(result){
              res.render('plant',{
                post:result,
                user:req.user
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

// UPDATE POST
app.get('/edit/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(result => {
        if(result){
            res.render('edit',{
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


/////////////
// LOGOUT //
///////////

app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) 
                return next();
            res.redirect('/');     
};

//////////////
// COMMENT //
////////////

app.post('/comment/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(result => {
        if(result){
            const new_comment = " " + req.body.comment;
            Post.findByIdAndUpdate(req.params.id, { $push: { comment:new_comment } }, { returnOriginal: false}).exec();
            console.log(Post.comment);
        }
        else {
            console.log(err);
            res.redirect('/');
            
        }
    })
    .then(update => {
        res.redirect('/dashboard');
    })
    .catch(err => {
        res.redirect('/dashboard');
    });
});
