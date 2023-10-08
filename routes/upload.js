var express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const Jimp = require("jimp");
var router = express.Router();
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})
const maxSize = 10 * 1000 * 1000;
const upload = multer({ storage: storage,limits: { fileSize: maxSize } })

router.post('/', upload.single('photo'), async (req, res) => {
  var filename= Math.random().toString().replace('0.','')+ '.jpg';
  const image = sharp(req.file.path);
  await image.toFormat('jpeg').toFile('public/images/'+filename);
    res.send(filename);
  // do something with compressedImage, e.g. save to disk or send as response
});

// router.post('/',async function(req, res, next) {
//         let buff =  Buffer.from(req.body.photo.replace(/^data:image\/png;base64,/, ""), 'base64');
//         var filename=new Date();
//         Jimp.read(buff, (err, res) => {
//             if (err) {
//                 res.status(500).send(err)
//             };
//             res.resize(Jimp.AUTO, 1024).write('public/images/'+filename.getTime()+'.jpg');
//           });
//           res.send(filename.getTime()+'.jpg');
    
// });

router.post('/bulk',async function(req, res, next) {
    images=[]
    var filename=new Date();
    for(let i=0;i<req.body.photos;i++)
    {
    let buff =  Buffer.from(req.body.photos[i].replace(/^data:image\/png;base64,/, ""), 'base64');
    Jimp.read(buff, (err, res) => {
        if (err) {
            res.status(500).send(err)
        };
        res.resize(Jimp.AUTO, 1024).write('public/images/'+filename.getTime()+i+'.jpg');
      });
      images.push(filename.getTime()+i+'.jpg')
    }
    
      res.send(images);

});

module.exports = router;