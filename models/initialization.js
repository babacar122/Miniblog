const mongoose = require('mongoose');
const User = require('./User');
const BlockedAccount = require('./BlockedAccount');
const Post = require('./Post');

mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

const sampleUsers = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' }
];

const samplePosts = [
    { title: 'First Post', body: 'This is the first post', author: null },
    { title: 'Second Post', body: 'This is the second post', author: null }
];

const initializeDatabase = async () => {
    try {
        await User.deleteMany({});
        await BlockedAccount.deleteMany({});
        await Post.deleteMany({});

        const users = await User.insertMany(sampleUsers);

        samplePosts[0].author = users[0]._id;
        samplePosts[1].author = users[1]._id;

        await Post.insertMany(samplePosts);

        console.log('Database initialized with sample data');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

initializeDatabase();
