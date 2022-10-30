const middleware = require('./upload.middleware');
const authMiddlewares = require('../auth/auth.middleware');
const {bodyFilter} = require("../../controllers/helper");
const router = require('express').Router();

router.post('/upload/image'//, authMiddlewares.verifyToken, authMiddlewares.verifyRole('admin')
    , middleware.imageUploader.single('image'), async (req, res) => {
        const fileUpload = middleware.imageSaver;

        if (!req.file) {
            return res.status(401).json({error: 'Please provide an image'});
        }

        const file = await fileUpload.save(req.file);
        const responseFile = bodyFilter(file, ['id', 'name', 'mimetype']);

        return res.json(responseFile);
    });
router.post('/upload/images'//, authMiddlewares.verifyToken, authMiddlewares.verifyRole('admin')
    , middleware.imageUploader.array('image', 20), async (req, res) => {
        const fileUpload = middleware.imageSaver;

        if (!req.files) {
            return res.status(401).json({error: 'Please provide an image'});
        }

        const files = await Promise.all(req.files.map(file => fileUpload.save(file)));
        const responseFiles = await Promise.all(files.map(file => bodyFilter(file, ['id', 'name', 'mimetype'])));

        return res.json(responseFiles);
    });

router.post('/upload/video'//, authMiddlewares.verifyToken, authMiddlewares.verifyRole('admin')
    , middleware.videoUploader.single('video'), async (req, res) => {
        const fileUpload = middleware.videoSaver;

        if (!req.file) {
            return res.status(401).json({error: 'Please provide an video'});
        }

        const file = await fileUpload.save(req.file);

        return res.status(200).json(file);
    });

module.exports = router;
