import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (!fs.existsSync(path.join(__dirname, '/uploads'))) {
      fs.mkdirSync(path.join(__dirname, './uploads'));
    }
    if (!file.originalname.includes('.csv')) {
      throw new Error('Unsupported file.');
    }
    callback(null, path.join(__dirname, '/uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

export const upload = multer({ storage });
