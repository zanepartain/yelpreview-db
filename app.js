import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
// import { userRouter } from  './routers/userRouter';
import * as path from 'path';
import { businessRouter } from './router/BusinessRouter';
import { db } from './db/index';

// establish connection to db

const app = express();


class YelpReview{
    constructor(){
        this.setup();
        this.loadRoutes();
    }

    setup(){
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(express.static(path.join(__dirname, 'public')));
        db.business.create();
    }

    loadRoutes(){
        app.use('/', businessRouter);
    }


    listen(port){
        // use env port or specified port
        const configPort = process.env.PORT || port;  
        
        //create our server and listen on configPort
        http.createServer(app).listen(configPort, () => {
            console.log('App listening on port ' +  configPort);
        });
    
    }
}

export default YelpReview;