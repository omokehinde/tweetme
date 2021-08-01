import { useEffect, useState } from "react";

import { loadTweets } from "../lookup";

function ActionBtn(props) {
    const {tweet, action} = props;
    const className = props.className ? className : 'btn btn-primary btn-sm'
    if (action.type==='like') {
     return <button className={className} >
       {tweet.likes} {tweet.likes > 1 ? 'Likes' : 'Like'}
      </button>
    }
  }
  
  function Tweet(props) {
    const {tweet} = props;
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6';
    return <div className={className} >
      <p>{tweet.id} - {tweet.content}</p>
      <div className='btn btn-group'>
        <ActionBtn tweet={tweet} action={{type: 'like'}} />
      </div>
    </div>
  }
  
  export function TweetList(props) {
    const [tweets, setTweets] = useState([]);
    useEffect(()=>{
      // perform lookup
      const myCallback = (response, status)=>{
        console.log(response, status);
        if (status===200) {
          setTweets(response);
        } else alert('An error occured')
      };
      loadTweets(myCallback);
    }, []);
    return <div>
          {tweets.map((tweet, index)=>{
            return <Tweet tweet={tweet} key={`${index}-{tweet-id}`} className='my-5 mx-5 border' />
          })}
        </div>
  }