const express = require('express');
const router = express.Router();
const leaderBoardController = require('../controller/LeaderBoard');
const {validateToken} = require("../middleware/tokken");

router.get('/',validateToken,leaderBoardController.getLeaderBoard);

module.exports = router;