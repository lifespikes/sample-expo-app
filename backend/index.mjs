import express from 'express';
import multer from 'multer';
import * as fs from 'fs';

const app = express();
const cwd = process.cwd();

const getUniqueFilename = (ext) => {
  const file = Math.floor(1000 + Math.random() * 9000); // Random 4 digit number
  return fs.existsSync(`./uploads/${file}.${ext}`) ? getUniqueFilename(ext) : `${file}.${ext}`;
};

const uploads = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      cb(null, getUniqueFilename(ext));
    }
  })
});

app.get('/embed/:id', (req, res) => {
  if (fs.existsSync(`./uploads/${req.params.id}`)) {
    return res.sendFile(`${cwd}/uploads/${req.params.id}`);
  }

  res.sendStatus(404);
});

app.post('/upload', uploads.single('audio'), (req, res) => {
  console.log(req.file);

  if (!req.file) {
    return res.send({
      message: 'No file uploaded'
    }).status(400);
  }

  res.send({file: `https://f99213f78131.ngrok.io/embed/${req.file.filename}`});
});

app.listen(3000);

console.log('Server started on port 3000');
