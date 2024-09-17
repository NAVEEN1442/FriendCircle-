import { toast } from "react-toastify"
import { apiConnector } from "../apiConnector"
import { friend } from "../apis"
import authSlice, { setLoading, setToken } from "../../slices/authSlice"



const {
    SEARCH_USER ,
    SEND_INVITE ,
    ACCEPT_INVITE ,
    REMOVE_USER ,
    PENDING_REQUEST,
    ALL_FRIENDS,
    RECOMMEND_USER,
} = friend



export function sendRequestUSER(username) {
    return async (dispatch, getState) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
  
      try {
        // Retrieve token from Redux auth slice
        const token = getState().auth.token;  // Adjust the path based on your actual Redux structure
  
        if (!token) {
          throw new Error("Authentication token not found");
        }
  
        // Setting headers with Authorization token
        const headers = { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        };
  
        // Pass the username in the correct format based on your API's requirement
        const response = await apiConnector("POST", SEND_INVITE, { username }, headers);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Request sent successfully");
      } catch (error) {
        console.error("Error sending request:", error?.response?.data);
        toast.error("Failed to send friend request.");
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
    };
  }

export function pendingFriendRequests() {
    return async (dispatch, getState) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
  
      try {
        // Retrieve token from Redux auth slice
        const token = getState().auth.token;  // Adjust the path based on your actual Redux structure
  
        if (!token) {
          throw new Error("Authentication token not found");
        }
  
        // Setting headers with Authorization token
        const headers = { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        };
  
        // Fetch pending friend requests
        const response = await apiConnector("GET", PENDING_REQUEST, null, headers);
  
        // Log the entire response for debugging
        // console.log("Response:", response);
  
        const result = response?.data;
  
        if (!result.success) {
          throw new Error(result.message);
        }
  
        // Process the successful response as needed
        // console.log("Pending friend data:", result);
        // console.log("Pending friend requests:", result.data);

        const returnData = result.data;

        return returnData;
  
      } catch (error) {
        // Log the error details
        console.error("Error fetching requests:", error.message || error);
  
        // Display user-friendly error message
        toast.error("Failed to fetch friend requests.");
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
    };
  }

  export function acceptRequest(username) {
    return async (dispatch, getState) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
  
      try {
        // Retrieve token from Redux auth slice
        const token = getState().auth.token;  // Adjust the path based on your actual Redux structure
  
        if (!token) {
          throw new Error("Authentication token not found");
        }
  
        // Setting headers with Authorization token
        const headers = { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        };

        const url = ACCEPT_INVITE + `${username}`;

        console.log("url",url);
  
        // Fetch pending friend requests
        const response = await apiConnector("POST", url ,{}, headers );
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        toast.success("Request Accepted");

        window.location.reload()
  
  
      } catch (error) {
        // Log the error details
        console.error("Error accepting requests:", error.message || error);
  
        // Display user-friendly error message
        toast.error("Failed to accept friend request.");
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
    };
  }

  export function showAllFriends() {
    return async (dispatch, getState) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
  
      try {
        // Retrieve token from Redux auth slice
        const token = getState().auth.token;  // Adjust the path based on your actual Redux structure
        // console.log("token",token);
  
        if (!token) {
          toast.error("Login To View Friends");
          throw new Error("Login To View Friends");
          
        }

      
  
        // Setting headers with Authorization token
        const headers = { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        };
  
        // Pass the username in the correct format based on your API's requirement
        const response = await apiConnector("GET", ALL_FRIENDS , {  }, headers);

        
        const result = response?.data;
  
        if (!result.success) {
          throw new Error(result.message);
        }
  
        // Process the successful response as needed
        // console.log("Pending friend box data:", result);
        // console.log("Pending friend box requests:", result.allFriends);
        // console.log(result.allFriends);
        const returnData = result.allFriends;

      

        return returnData;
  
      
      } catch (error) {
          console.error("Error fetching friends :",error);
       
         
        
        
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
    };
  }
  export function removeFriend(username) {
    return async (dispatch, getState) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
  
      try {
        // Retrieve token from Redux auth slice
        const token = getState().auth.token;  // Adjust the path based on your actual Redux structure
  
        if (!token) {
          throw new Error("Authentication token not found");
        }
  
        // Setting headers with Authorization token
        const headers = { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        };

        const url = REMOVE_USER + `${username}`;

        console.log("url",url);
  
        // Fetch pending friend requests
        const response = await apiConnector("POST", url ,{}, headers );

        console.log("response",response);
  
        
        toast.success("Removed Friend");

        window.location.reload();
  
  
      } catch (error) {
        // Log the error details
        console.error("Error removing requests:", error.message || error);
  
        // Display user-friendly error message
        toast.error("Failed to remove friend request.");
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
    };
  }

  export function showRecommendationsList() {
    return async (dispatch, getState) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
  
      try {
        // Retrieve token from Redux auth slice
        const token = getState().auth.token;  // Adjust the path based on your actual Redux structure
        // console.log("token",token);
  
        if (!token) {
          toast.error("Login To View Friends");
          throw new Error("Token is Authorization");
          
        }

      
  
        // Setting headers with Authorization token
        const headers = { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        };
  
        // Pass the username in the correct format based on your API's requirement
        const response = await apiConnector("GET", RECOMMEND_USER , {  }, headers);
        

        
        const result = response?.data;

        console.log("res reco",result)
        if (!result.success) {
          throw new Error(result.message);
        }

        const reco = result?.recommendations?.map(item => item.username);

        console.log("reco,",reco)
  
        // Process the successful response as needed
        // console.log("Pending friend box data:", result);
        // console.log("Pending friend box requests:", result.allFriends);
        // console.log(result.allFriends);
        const returnData = result.recommendations;

      

        return reco;
  
      
      } catch (error) {
          console.error("Error fetching friends :",error);
       
         
        
        
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
    };
  }
  
 

