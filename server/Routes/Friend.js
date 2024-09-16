const express = require("express")
const router = express.Router();

const {getAllOtherUsers,getUserByUsername,sendFriendRequest,acceptFriendRequest,getAllFriends,pendingFriendRequests,removeFriend} = require("../controllers/Friend");
const {auth} = require("../middlewares/auth");
const {addInterests,showRecommendations } = require("../controllers/Recommendation");

router.get("/getAllOtherUsers",auth,getAllOtherUsers);
router.post("/getUserByUsername",getUserByUsername);
router.post("/sendFriendRequest",auth,sendFriendRequest);
router.post("/acceptFriendRequest/:senderUsername",auth,acceptFriendRequest);
router.post("/removeFriend/:friendUsername",auth,removeFriend);
router.get("/pendingFriendRequests",auth,pendingFriendRequests);
router.get("/getAllFriends",auth,getAllFriends);

//friend recommendations

router.post("/addInterests/",auth,addInterests);
router.get("/showRecommendations/",auth,showRecommendations);


module.exports = router;