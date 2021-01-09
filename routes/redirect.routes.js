const { Router } = require('express')
const router = Router()
const Link = require('../models/Link')

router.get('/:code', async (req, res) => {
	try {
		const link = await Link.findOne({ code: req.params.code })

		if (link) {
			console.log(link)
			link.clicks++
			await link.save()
			return res.status(301).redirect(link.from)
		}

		res.status(404).json('Link not found')

	} catch (e) {
		res.status(500).json({ message: 'Error' })
	}
})

module.exports = router