require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/db');
const PORT = process.env.PORT || 8000
const cookieParser = require('cookie-parser')
const cors = require('cors');
const authRoute = require('./routes/auth');
const blogRoute = require('./routes/blog');
const passport = require('passport')
const googleStrategy = require('./utils/passport')
const cookieSession  = require('cookie-session')
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended : false}))


app.use(
    cookieSession({name: 'session' ,keys:[process.env.COOKIE_SECRET_KEY], maxAge : 24 * 60 * 60 * 1000})
);
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin : 'http://localhost:3000',
    methods : ['GET','POST', 'PUT', 'DELETE'],
    credentials : true
}));
app.use('/api/user', authRoute);
app.use('/api/blog', blogRoute);

app.use('/auth', authRoute);



connectDB()


app.get('/', (req,res)=>{
    res.send('hello mern auth..')
})

app.listen(PORT, ()=>{
    console.log(`Server started at port http://localhost:${PORT}`)
});


