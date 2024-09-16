const BASE_URL = process.env.REACT_APP_BASE_URL;

console.log("base url",BASE_URL);

export const endpoint = {
    SIGNUP_API: BASE_URL + "/auth/signUp",
    LOGIN_API: BASE_URL + "/auth/logIn",
    OTP_API: BASE_URL + "/auth/sendotp",
    

};

export const friend = {

    SEARCH_USER : BASE_URL + "/friend/getUserByUsername",
    SEND_INVITE : BASE_URL + "/friend/sendFriendRequest",
    ACCEPT_INVITE : BASE_URL + "/friend/acceptFriendRequest/",
    REMOVE_USER : BASE_URL + "/friend/removeFriend/",
    PENDING_REQUEST : BASE_URL +"/friend/pendingFriendRequests",
    ALL_FRIENDS : BASE_URL + "/friend/getAllFriends",



}