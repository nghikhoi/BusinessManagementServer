import {AppDataSource} from "../config/database";
import {Image, Video} from "../models/file";

export const ImageRepository = AppDataSource.getRepository(Image);
export const VideoRepository = AppDataSource.getRepository(Video);