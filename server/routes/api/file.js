const { Router } = require('express') ;
const auth = require('../../util/auth') ;

const router = Router();

router.post('/', auth,  async (req, res) => {

})

router.post('/upload', auth,  async (req, res) => {
    console.log(req.body)
})

router.post('/delete', auth,  async (req, res) => {

})

router.post('/togglePublic', auth,  async (req, res) => {

})

router.get('/file', auth,  async (req, res) => {

})

module.exports = router;
