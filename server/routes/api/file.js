const { Router } = require('express') ;
const auth = require('../../util/auth') ;
var multer = require('multer');

const router = Router();

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./files");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({storage: Storage});


router.post('/', auth,  async (req, res) => {

})

router.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    // TODO Upload File to S3 Bucket
})

router.post('/delete', auth,  async (req, res) => {

})

router.post('/togglePublic', auth,  async (req, res) => {

})

router.get('/file', auth,  async (req, res) => {

})

module.exports = router;
