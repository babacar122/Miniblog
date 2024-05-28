const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/miniblog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // For production, set secure to true
}));

// Import routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
