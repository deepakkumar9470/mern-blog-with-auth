const express  = require('express')
const router = express.Router()
const {signup,login,logout, getProfile, updateProfile}  = require('../controllers/userController');
const authProtect = require('../middleware/authentication');
const passport = require('passport')



// @ /api/user/resister 
router.post('/register',signup);


// @ /api/user/login 
router.post('/login', login);


// @ /api/user/profile 
router.get('/profile',authProtect ,getProfile)


// @ /api/user/profile/123 
router.put('/profile', authProtect,updateProfile)


// @ /api/user/logout 
router.post('/logout', logout);


// @/auth/google
router.get('/google',passport.authenticate('google', { scope: ['profile'] }));

// @/auth/google/callback
router.get('/google/callback', passport.authenticate('google',{
    successRedirect : process.env.CLIENT_URL,
    failureRedirect : '/login/failed'
  }),
); 


// @auth/login/success
router.get('/login/success',(req,res)=>{

    if(req.user){
     res.status(200).json({
         success: true,
         message : 'Successful',
         user : req.user
     });
    }
 })
 
// @/auth/login/failed
router.get('/login/failed',(req,res)=>{

    res.status(401).json({
        success: false,
        message : 'failed'
    })
})

// @/auth/logout
router.get('/logout',(req,res)=>{
    req.logout();
    req.redirect(process.env.CLIENT_URL);
})



module.exports = router