require('dotenv').config()
require('reflect-metadata')

const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const createError = require('http-errors');

const envVariables = require('./variables/app.variable');
const swaggerDocs = require("./utils/swagger");
const {ImageRepository} = require("./repositories/file.repository");
const path = require("path");
const {Router} = require("express");

function logErrors (err, req, res, next) {
    console.error(err.stack)
    next(err)
}

function clientErrorHandler (err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}

function errorHandler (err, req, res, next) {
    res.status(500)
    res.render('error', { error: err })
}

const RunApp = async () => {
    const app = express();

    /*app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });*/

    app.set('trust proxy', true);

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use(logger('dev'));

    app.use(passport.initialize({
        session: false,
    }));

    //region ORM - Database
    const AppDataSource = require('./config/database').AppDataSource;
    const { InitSamples } = require('./config/samples');

    await AppDataSource.initialize();
    await InitSamples();
    //endregion

    //region Routes
    const apiRouter = require('./routes/api/api.route');
    const authRouter = require('./routes/auth/auth');
    const uploadRouter = require('./routes/upload/upload');

    const imageRouter = Router();
    imageRouter.get('/:id', async (req, res, next) => {
        let imageId = path.parse(req.params.id).name;
        const image = await ImageRepository.findOne({
            where: {
                id: imageId,
            },
            select: ['id', 'name', 'mimetype', 'buffer', 'path']
        });
        if (!image || image.path != null || image.buffer == null) {
            return next();
        }
        const arrayBuffer = image.buffer;
        return res.contentType(image.mimetype).send(arrayBuffer);
    });
    app.use('/images', imageRouter);

    app.use(authRouter);
    app.use('/api', apiRouter);
    app.use(uploadRouter);

    app.use(express.static('public'));
    //endregion

    app.use(logErrors)
    app.use(clientErrorHandler)
    app.use(errorHandler)

    swaggerDocs(app);

    //region Logging
    if (process.env.GOOGLE_CLOUD_PROJECT) {
        require('@google-cloud/debug-agent').start({serviceContext: {enableCanary: true}});
        const {ErrorReporting} = require('@google-cloud/error-reporting');
        const errors = new ErrorReporting();
        app.use(errors.express);
    }

    app.listen(envVariables.PORT, () => {
        console.log(`Listening on port ${envVariables.PORT}`)
    });
}

RunApp().then(() => {
    console.log('App started!');
});
