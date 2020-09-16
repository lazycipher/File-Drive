const { Router } = require('express') ;
const bcrypt = require('bcryptjs') ;
const jwt = require('jsonwebtoken') ;
const auth = require('../../util/auth') ;
const User = require('../../models/User') ;

const JWT_SECRET = process.env.JWT_SECRET;
const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) throw Error('User Does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
      auth_user: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
          avatar_url: user.avatar_url
        }
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post('/register', async (req, res) => {
  const { name, email, username, password } = req.body;
  
  let avatar_url;
  
  if (!name || !email || !password || !username) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) throw Error('User already exists');
    
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) throw Error('Username already taken');

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');
    if(req.body.avatar_url){
      avatar_url = req.body.avatar_url;
    } else {
      avatar_url = 'https://i.imgur.com/msL5wEG.png';
    }
    const newUser = new User({
      name,
      email,
      username,
      avatar_url,
      password: hash
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedUser._id, username: savedUser.username }, JWT_SECRET, {
      expiresIn: 3600
    });

    res.status(200).json({
      auth_user: {
        token: token,
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
          username: savedUser.username,
          avatar_url: avatar_url
        }
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User Does not exist');
    res.json({user: user});
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get('/usernameCheck', async (req, res) => {
  try {
    if(req.query.username) {
      const username = req.query.username;
      const user = await User.findOne({username: username})
      
      if(!user) return res.status(200).json({code: "USERNAME_AVAILABLE", msg: "Available"});
      else return res.status(200).json({code: "USERNAME_NOT_AVAILABLE", msg: "Not Available"});
    } else {
      throw Error('Invalid Request');
    }
  } catch(e) {
    res.status(400).json({ msg: e.message });
  }
})

module.exports = router;
