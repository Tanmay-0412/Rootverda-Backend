const express = require('express')
const { registerUser, loginUser, logoutUser } = require('../controller/authController')
const {protect , authorizeRoles } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

// Example protected routes
// router.get('/admin', protect, authorizeRoles('admin'), (req, res) => {
//   res.json({ message: 'Welcome Admin!' });
// });

// router.get('/seller', protect, authorizeRoles('seller'), (req, res) => {
//   res.json({ message: 'Welcome Seller!' });
// });

// router.get('/user', protect, authorizeRoles('user'), (req, res) => {
//   res.json({ message: 'Welcome User!' });
// });

module.exports = router