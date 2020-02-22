const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');

//allows the whole app to use everything in the public folder so when I link js in my html
//I am allows to use that html
app.use(express.static('public'))

//define what the db is
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const postModel = require('./schema')

//The urlencoded method within body-parser tells body-parser to extract data 
//from the <form> element and add them to the body property in the request object.

//works in postman & from a form
//when commented out it works when I submit post through a form
app.use(bodyParser.json());
//with this commented out the app won't take the data submitted from the form but it will take
//the data if i submit it from postman
app.use(bodyParser.urlencoded({ extended: false }))




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')

    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
})

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin.html')
    // res.sendFile(__dirname + '/public/index.js')

    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})


//How I can test creating a new collection and adding in a test name & quote
// let msg = new PostModel({
//     name: 'keem',
//     quote: "starwars"
// })

// msg.save()
//     .then(doc => {
//         console.log(doc)
//     })
//     .catch(err => {
//         console.error(err)
//     })



//Test finding all of the posts in the db
// PostModel.find()
//     .then((posts) => {
//         console.log(posts);
//     })
//     .catch(err => {
//         console.error(err)
//     })

//hit db for all posts
app.get('/posts', (req, res) => {
    postModel.find()
        .then((posts) => {
            res.json(posts)
        })
        .catch(err => {
            console.error(err)
        })
})


//how to test updating something 
// PostModel.findOneAndUpdate(
//     {
//         name: 'updated test2',  // field in the db that I want to change
//         quote: 'updated test1234' // field in the db that I want to change

//     },
//     {
//         name: 'updated test23',  // field in the db that I want to change
//         quote: 'updated test12345'   // what I want to update that field to

//     },
//     {
//         new: true,                       // return updated doc
//     })
//     .then(doc => {
//         console.log(doc)
//     })
//     .catch(err => {
//         console.error(err)
//     })

//How to test deleting something
// PostModel.findOneAndRemove({
//     name: 'updated test23',
//     quote: 'updated test12345',
// })
//     .then(response => {
//         console.log(response)
//     })
//     .catch(err => {
//         console.error(err)
//     })


//whatever the route i'm posting to is it has to be the same in my form action property
app.post('/posts', (req, res) => {
    const newPost = new postModel({
        name: req.body.name,
        quote: req.body.quote
    })

    newPost.save()
        .then(post => {
            res.json(post)
            console.log(req.body)
        })
        .catch(err => {
            console.error(err)
        })
})










const port = process.env.Port || 3000;

app.listen(port, function () {
    console.log('listening on 3000')
})