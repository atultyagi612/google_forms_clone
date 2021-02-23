const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    if(req.session.current_url){
      req.session.current_url="/"
      let url_=req.session.current_url
      if(req.session.redirecturl){
        let redd=req.session.redirecturl
        delete req.session.redirecturl
        res.redirect(redd)

      }else{
        res.redirect('/')
      }
    }
    else{

      res.redirect('/')
    }
  }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/log')
})

module.exports = router
