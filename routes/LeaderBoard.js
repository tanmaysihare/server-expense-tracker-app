const express = require('express');
const router = express.Router();
const leaderBoardController = require('../controller/LeaderBoard');
const {validateToken} = require("../middleware/tokken");

router.get('/premium',leaderBoardController.getLeaderBoard);
router.get('/non-premium',leaderBoardController.getLeaderBoard2);
module.exports = router;