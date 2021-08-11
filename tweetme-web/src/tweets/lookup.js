import { backendLookup } from "../lookup";

export function apiTweetCreate(newTweet, callback) {
    backendLookup('POST', '/tweet/create/', callback, {content:newTweet});
  }
  
  export function apiTweetList(callback) {
    backendLookup("GET", "/tweet/", callback);
  }