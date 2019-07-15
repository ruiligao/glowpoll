import express from 'express';
import os from 'os';
import { Database } from './Database/connect'
// import { User } from './Models/Users';

const app: express.Application = express();

app.use(express.static('dist'));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/getData/:id', (req, res) => {
    console.log("ID: " + req.params.id);
    const db = new Database();
    const id = req.params.id > 0 ? req.params.id : db.topicFactory.GetRandom();
    let topicPromise = db.getTopicById(id);
    let mapPromise = db.getMapDataByTopicId(id);
    Promise.all([topicPromise, mapPromise])
        .then((data: any) => res.send({ topic: data[0][0], map: data[1] }));
    db.close();
});

app.get('/api/getQuestions/:pageId', (req, res) => {
    const numPerPage = 30;
    console.log("ID: " + req.params.pageId);
    const pageId: number = parseInt(req.params.pageId) || 0;

    const db = new Database();
    db.getQuestionsByPage(numPerPage, pageId).then((data: any) => res.send(data));
    db.close();
});

app.post('/api/login', function (req, res, next) {
    passport.authenticate('local-login', function (err: any, user: any) {
        if (err) {
            console.log('err');
            return next(err);
        }
        if (!user) {
            console.log('!user');
            return res.json('no user');
        }
        console.log('!user');
        return res.json('has user');
    })(req, res, next);
});