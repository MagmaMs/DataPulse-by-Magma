const express = require("express")
const router = express.Router()
const { trackEvent } = require("../controllers/trackController")

router.post("/:apikey", trackEvent)

module.exports = router
