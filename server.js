const express = require('express');
const app = express();
require('dotenv').config();
require('./db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const reviewRoutes = require('./routes/review.routes');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');
const path = require("path");




const corsOptions = {
    origin: process.env.CLIENT_URL, 
    credentials: true, 
    'allowedHeaders': ['sessionId', 'Content-Type'], 
    'exposedHeaders': ['sessionId'], 
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE', 
    'preflightContinue': false 
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));



//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});
app.get('/', (req, res) => { res.send('Hello from Express!')});
// routes
app.use('/api/user', userRoutes);
app.use('/api/review', reviewRoutes);
 
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// server 
app.listen( (process.env.PORT || 5000), () => {
    console.log(`Listening on port ${process.env.PORT}`);
});