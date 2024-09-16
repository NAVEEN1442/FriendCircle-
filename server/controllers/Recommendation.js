const User = require("../models/User");


exports.addInterests = async (req,res)=>{

    try {

        const loggedUserId = req.user.id;

        const user = await User.findById(loggedUserId);
        
        const {text} = req.body;

        if(!text){
            res.status(401).json({
                success:false,
                message:"Enter your hobby or interest",
            })
        }

         user.interest.push(text);
         await user.save();

         res.status(200).json({
            success:true,
            message:"Interest added",
            user,
         })

    } catch (error) {
        res.status(200).json({
            success:false,
            message:"failed to add Interest "
         })
    }

}

exports.showRecommendations = async (req, res) => {
    try {
      const loggedUserId = req.user.id;
  
      // Find the logged-in user
      const loggedInUser = await User.findById(loggedUserId);
  
      if (!loggedInUser) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      // Fetch the interests of the logged-in user
      const userInterests = loggedInUser.interests || [];
  
      // Find users with similar interests
      const interestBasedRecommendations = await User.find({
        _id: { $ne: loggedUserId }, // Exclude the logged-in user
        interests: { $in: userInterests }, // Users with at least one similar interest
      });
  
      // Filter out users who are already friends
      const nonFriendRecommendations = interestBasedRecommendations.filter(user =>
        !loggedInUser.friends.includes(user.username)
      );
  
      // Create a map to store the mutual friends count
      const mutualFriendsCount = {};
  
      // Find mutual friends
      for (const friendUsername of loggedInUser.friend_list) {
        const friend = await User.findOne({ username: friendUsername });
        if (friend) {
          for (const friendOfFriend of friend.friend_list) {
            if (
              friendOfFriend !== loggedInUser.username && // Not the logged-in user
              !loggedInUser.friend_list.includes(friendOfFriend) // Not already friends
            ) {
              if (mutualFriendsCount[friendOfFriend]) {
                mutualFriendsCount[friendOfFriend]++;
              } else {
                mutualFriendsCount[friendOfFriend] = 1;
              }
            }
          }
        }
      }
  
      // Convert mutual friends count to a list of recommended users
      const mutualFriendsRecommendations = Object.keys(mutualFriendsCount).map(async (username) => {
        const user = await User.findOne({ username });
        return user ? {
          username: user.username,
          mutualFriends: mutualFriendsCount[username],
          interests: user.interest,
        } : null;
      });
  
      const resolvedMutualFriendsRecommendations = await Promise.all(mutualFriendsRecommendations);
  
      // Merge recommendations and remove duplicates
      const allRecommendations = [
        ...nonFriendRecommendations.map(user => ({
          username: user.username,
          interests: user.interest,
        })),
        ...resolvedMutualFriendsRecommendations.filter(user => user !== null)
      ];
  
      // Deduplicate recommendations by username
      const uniqueRecommendations = Array.from(new Set(allRecommendations.map(user => user.username)))
        .map(username => {
          return allRecommendations.find(user => user.username === username);
        });
  
      return res.status(200).json({
        success: true,
        recommendations: uniqueRecommendations,
      });
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch recommendations.",
      });
    }
  };