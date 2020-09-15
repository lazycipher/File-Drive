const { Router } = require('express') ;
const auth = require('../../util/auth') ;
const multer = require('multer');
const File = require('../../models/File');
const User = require('../../models/User');

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

router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try{
        const file = req.file;
        const user = await User.findOne({_id: req.user.id}, {name: 1, username: 1, avatar_url: 1});
        const{ avatar_url, name, username, _id, files}  = user;
        const newFile = new File({
            original_name: file.originalname,
            user: {
                id: _id,
                name: name,
                avatar_url: avatar_url,
                username: username
            },
            file_name: file.filename,
            mimetype: file.mimetype,
            path: file.path,
            size: file.size,
        });  
        const saveFile = await newFile.save();

        files.push(saveFile._id);
        const updateUser = await User.findOneAndUpdate({_id}, {files: files})
        if(!saveFile || !updateUser) throw Error("Something went wrong while uploading the file");
        res.status(201).send({msg: "File Uploaded", saveFile});
    } catch(e) {
        res.status(400).json({ msg: e.message });
    }
    
})

router.post('/delete', auth,  async (req, res) => {

})

router.post('/togglePublic', auth,  async (req, res) => {

})

router.get('/file', auth,  async (req, res) => {

})

module.exports = router;
