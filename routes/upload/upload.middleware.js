const multer = require('multer');
const appVariable = require('../../variables/app.variable');
const path = require('path');
const sharp = require('sharp');
const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const {ImageRepository, VideoRepository} = require("../../repositories/file.repository");
const getVideoDurationInSeconds = require("get-video-duration");
const {Readable} = require("stream");

const imageUploader = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
});

const videoUploader = multer({
    limits: {
        fileSize: 4 * 1024 * 1024 * 1024,
    },
    storage: multer.diskStorage({
        destination: async function (req, file, cb) {
            file.duration = await getVideoDurationInSeconds.getVideoDurationInSeconds(file.stream);

            const folder = path.join(process.cwd(), appVariable.UPLOAD_VIDEO_FOLDER);
            await fs.promises.mkdir(folder, {recursive: true})
            cb(null, folder)
        },
        filename: function (req, file, cb) {
            file.fileid = uuidv4();
            const extension = path.extname(file.originalname);
            cb(null,  `${file.fileid}${extension}`) //Appending .jpg
        },
    })
});

class ImageSaver {

    constructor(folder) {
        this.folder = folder;
    }

    /**
     *
     * @param {Multer.File} file
     * @returns {Promise<Image>}
     */
    async save(file) {
        const fileId = uuidv4();

        const image = ImageRepository.create({
            id: fileId,
            name: file.originalname,
            mimetype: file.mimetype,
            buffer: file.buffer,
            width: 100,
            height: 100,
        });
        return await ImageRepository.save(image);
    }

   /* /!**
     *
     * @param {Multer.File} file
     * @returns {Promise<Image>}
     *!/
    async save(file) {
        const fileId = uuidv4();
        const filename = ImageSaver.filename(fileId);
        const filepath = this.filepath(filename);

        await fs.promises.mkdir(this.folder, {recursive: true})

        const output = await sharp(file.buffer)
            .toFile(filepath);

        const image = ImageRepository.create({
            id: fileId,
            path: filename,
            name: file.originalname,
            width: output.width,
            height: output.height,
        });
        return await ImageRepository.save(image);
    }*/

    static filename(uuid) {
        return `${uuid}.png`;
    }

    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }

}

class VideoSaver {

    /**
     *
     * @param {Multer.File} file
     * @returns {Promise<Video>}
     */
    async save(file) {
        const fileId = file.fileid;

        const video = VideoRepository.create({
            id: fileId,
            path: file.filename,
            name: file.originalname,
            duration: file.duration,
        });
        return await VideoRepository.save(video);
    }

}

const imageSaver = new ImageSaver(path.join(process.cwd(), appVariable.UPLOAD_IMAGE_FOLDER));
const videoSaver = new VideoSaver();

module.exports = {imageUploader, videoUploader, imageSaver, videoSaver}
