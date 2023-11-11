import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import fs from 'fs';

const checkValidFile = (_request: Request, file: Express.Multer.File, cb: any): void => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const storage = multer.diskStorage({
    destination: function (req, _file, cb) {
        const id = req.user?.id;
        const path = `./uploads/gallery/${id}`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: function (_req, file, cb) {
        let path = file.originalname.split('.');

        cb(null, file.fieldname + '_' + uuidv4() + '.' + path[path.length - 1]);
    },
});

export const upload = multer({ fileFilter: checkValidFile, storage: storage });
