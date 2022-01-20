const express = require('express');
const app = express();
const crypto = require('crypto');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.static('./files'));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const { action, userId } = req.body;
    if (action !== undefined) {
      if (action === 'comments') {
        const path = 'files/' + action + '/' + userId + '/';
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      } else {
        const path = 'files/' + action + '/';
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      }
    }
  },
  filename: function(req, file, cb) {
    const fileEnding = file.mimetype.split('/')[1];
    const hash = crypto
      .createHash('md5')
      .update(file.originalname)
      .digest('hex');
    cb(null, hash + '-' + +Date.now() + '.' + fileEnding);
  },
});

// multer file filter (comments images uploads)
const fileFilterCommentsImages = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, //10 MB file size limit
    files: 1,
    fileFilter: fileFilterCommentsImages,
  },
}).array('comment-image');


const uploadCMS = multer({
  storage: storage,
  limits: {
    fileSize: 100 *1024 * 1024,
    files: 1,
  },
}).array('file');


function handleError(req, err, res) {
  if (err instanceof multer.MulterError || err) {
    return res.status(500).json(err);
  }
  if (!req.files) {
    return res.status(400).send('No file selected!');
  }
}

app.post('/upload', function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      return handleError(req, err, res);
    }
    console.log('done');
    res.status(200).json({ msg: 'files received', files: req.files.map((f) => f.path.replace('files', 'http://localhost:5000')), action: req.body.action });
  });
});

app.post('/uploadCMS', function(req, res) {
  uploadCMS(req, res, function(err) {
    if (err) {
      return handleError(req, err, res);
    }
    console.log('done');
    res.status(200).json({ msg: 'files received', files: req.files.map((f) => f.path.replace('files', 'http://localhost:5000')), action: req.body.action });
  });
});

app.delete('/delete/:name', async (req, res, next) => {
  const { name } = req.params;
  let buff = Buffer.from(name, 'base64');
  let imageUrl = buff.toString('ascii');
  console.log('Delete file: ' + imageUrl);

  imageUrl = imageUrl.replace('http://localhost:5000', 'files');
  try {
    await fs.unlink(imageUrl, err => {
      if (err) console.log(err);
    });
  } catch (err) {
    return res.status(500).json(err);
  }

  res.status(200).json({ deleted: imageUrl });
});

app.listen(5000, function() {
  console.log('File server running on port 5000');
});
