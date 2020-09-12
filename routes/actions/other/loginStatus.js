const { User } = require('../../../model/User')
module.exports = async (req, res) => {
	if (req.session && req.session.userInfo) {
		// const s = `var isLogin = true var userId=\"${req.session.userInfo._id}\"`
		// const s = { isLogin: true, userId: req.session.userInfo._id }
		const user = await User.findById(req.session.userInfo._id).select('-password')
		req.session.userInfo = user
		if (req.session.userInfo.role == 'admin') {
			res.send({ isLogin: true, isLoginAdmin: true, userInfo: user })
		} else {
			res.send({ isLogin: true, isLoginAdmin: false, userInfo: user })
		}
	} else {
		// res.send('var isLogin = false')
		res.send({ isLogin: false })
	}
}
