const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true // Allow cookies to be sent
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(cookieParser());


const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
