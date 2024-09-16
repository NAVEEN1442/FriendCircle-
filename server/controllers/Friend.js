const User = require("../models/User");

exports.getAllOtherUsers = async(req,res)=>{

    try {

        const loggedUserId = req.user.id;

        if(!loggedUserId){
         return res.status(200).json({
            success:false,
            message:"Login First",
           
        })
        }
        
        const allUsers = await User.find({_id:{$ne:loggedUserId}});
        
        
        res.status(200).json({
            success:true,
            message:"All the Users are fetched",
            allUsers,
        })

    } catch (error) {
        console.log(error)

        res.status(400).json({
            success:false,
            message:"User fetching failed"
        })
    }


}

exports.getUserByUsername = async (req,res)=>{

    try {
        
        //data from the frontend
 
        const {username} = req.body;
 
        const userExists = await User.findOne({
            username
        })  
 
        
 
        //check if not null
 
        if(!userExists){
            res.status(401).json({
                success:false,
                message:"User not available",
            })
        }
 
        //return the product
 
        return res.status(200).json({
             success:true,
             message:"User found",
             userExists,
        })
 
     } catch (error) {
         console.log(error);
         res.status(401).json({
             success:false,
             message:"User find by username failed",
         })
     }

}

exports.sendFriendRequest = async (req,res)=>{

    try {
      console.log("in req")
        const loggedUser = req.user.id;
        const { username } = req.body;

       

        if(!username){
            res.status(401).json({
                success:false,
                message:"Username Required",
            })
        }

        const sender = await User.findById(loggedUser);
        console.log(sender);
        const user = sender.username;
        
        console.log(user)
        console.log(username)

        if (user === username) {
            return res.status(400).json({
                success:false,
                message: 'You cannot send a friend request to yourself.'
             });
          }
       
          
          const recipient = await User.findOne({ username: username });
      
          // Check if both users exist
          if ( !sender || !recipient) {
            return res.status(404).json({ message: 'sender or recipient not found.' });
          }
          
        

        //   Check if a friend request already exists
          if (recipient.friend_Request.includes(sender.username)) {
            return res.status(400).json({ message: 'Friend request already sent.' });
          }
      
          // Add sender's username to recipient's friendRequests array
          recipient.friend_Request.push(sender.username);
          await recipient.save(); 

          res.status(200).json({
            success:true,
            message:"friend request send successfully"
          })




    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:"Friend request failed to send"
          })
    }

}

exports.acceptFriendRequest = async (req, res) => {
    try {

      console.log("in accept")

      const loggedUserId = req.user.id;  // Get recipient's username from req.user

      if(!loggedUserId){
        return res.status(200).json({
           success:false,
           message:"Login First",
          
       })
       }


      const { senderUsername } = req.params;  // Extract sender's username from URL params
  
      // Ensure senderUsername is provided
      if (!senderUsername) {
        return res.status(400).json({ message: 'Sender username is required.' });
      }

      const recipientInfo = await User.findById(loggedUserId);

      const recipientUsername = recipientInfo.username;
  
      // Find the sender and recipient by their usernames
      const sender = await User.findOne({ username: senderUsername });
      console.log("senders",sender)
      const recipient = await User.findOne({ username: recipientUsername });
      console.log("recie",recipient);
  
      // Check if both users exist
      if (!sender || !recipient) {
        return res.status(404).json({ message: 'Sender or recipient not found.' });
      }
  
      // Check if a friend request exists

      console.log("senderUsername",senderUsername)

      const requestIndex = recipient.friend_Request.indexOf(senderUsername);
      console.log("requestIndex",requestIndex)
      if (requestIndex === -1) {
        return res.status(400).json({ message: 'No friend request from this user.' });
      }
  
      // Add sender to recipient's friends list and vice versa
      recipient.friend_list.push(senderUsername);
      sender.friend_list.push(recipientUsername);
  
      // Remove the friend request from the recipient's list
      recipient.friend_Request.splice(requestIndex, 1);
  
      // Save both users' updated documents
      await recipient.save();
      await sender.save();
  
      return res.status(200).json({
        success:true,
        message: 'Friend request accepted.' 
      
      });

    } catch (error) {
      console.error('Error accepting friend request:', error);
      return res.status(500).json({ message: 'Server error.' });
    }
};

exports.removeFriend = async (req, res) => {
    try {
      const userId = req.user.id;  // Get logged-in user's ID
      const { friendUsername } = req.params;  // Get friend's username from URL params

     
  
      // Find the logged-in user by their ID
      const loggedInUser = await User.findById(userId);
  
      if (!loggedInUser) {
        return res.status(404).json({ message: 'Logged in user not found.' });
      }
  
      // Check if the friend is in the user's friends list
      const friendIndex = loggedInUser.friend_list.indexOf(friendUsername);
  
      if (friendIndex === -1) {
        return res.status(400).json({ message: 'Friend not found in your friend list.' });
      }
  
      // Remove the friend from the logged-in user's friend list
      loggedInUser.friend_list.splice(friendIndex, 1);
      await loggedInUser.save();
  
      // Optionally: Also remove the logged-in user from the friend's friend list
      const friend = await User.findOne({ username: friendUsername });
      if (friend) {
        const userIndex = friend.friend_list.indexOf(loggedInUser.username);
        if (userIndex !== -1) {
          friend.friend_list.splice(userIndex, 1);
          await friend.save();
        }
      }
  
      return res.status(200).json({ message: `You have removed ${friendUsername} from your friends.` });
    } catch (error) {
      console.error('Error removing friend:', error);
      return res.status(500).json({ message: 'Server error.' });
    }
};

exports.pendingFriendRequests = async (req, res) => {
  try {
    // Get the logged-in user's ID from the request
    const userId = req.user.id;

    const user = await User.findById(userId);

    

    console.log(user);

    const pendingRequests = user.friend_Request;

    // // If no pending requests found
    if (!pendingRequests || pendingRequests.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No pending friend requests found.",
        data: [],
      });
    }

    // Return the list of pending requests
    return res.status(200).json({
      success: true,
      message: "Pending friend requests fetched successfully.",
      data: pendingRequests,
    });
  } catch (error) {
    console.error("Error fetching pending friend requests:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching pending friend requests.",
      error: error.message,
    });
  }
};

exports.getAllFriends = async(req,res)=>{

  try {

      const loggedUserId = req.user.id;

      console.log("logeddd",loggedUserId)

      if(!loggedUserId){
        return res.status(200).json({
           success:false,
           message:"Login First",
          
       })
       }
      
      const ExistUser = await User.findById(loggedUserId);

      const allFriends = ExistUser.friend_list;

      

      if(!allFriends){
           return res.status(400).json({
              success:false,
              message:"friend fetching failed"
          })
      }

      console.log(allFriends)
      
      
      res.status(200).json({
          success:true,
          message:"All the friends are fetched",
          allFriends,
      })

  } catch (error) {
      console.log(error)

      res.status(400).json({
          success:false,
          message:"friend fetching failed"
      })
  }


}