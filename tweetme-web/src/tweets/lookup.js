import { backendLookup } from "../lookup";

export function apiTweetCreate(newTweet, callback) {
    backendLookup('POST', '/tweet/create/', callback, {content:newTweet});
}

export function apiTweetAction(tweetId, action ,callback) {
    const data = {id:tweetId, action:action};
    backendLookup('POST', '/tweet/action/', callback, data);
}

export function apiTweetList(callback) {
    backendLookup("GET", "/tweet/", callback);
}