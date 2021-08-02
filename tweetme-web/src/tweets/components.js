import { useEffect, useState } from "react";

import { loadTweets } from "../lookup";

function ActionBtn(props) {
    const {tweet, action} = props;
    const className = props.className ? className : 'btn btn-primary btn-sm';
    const actionDisplay = action.display ? action.display : 'Action';
    const plural = tweet.likes > 1 ? 's' : '';
    const display = action.type === 'like' ? `${tweet.likes} ${actionDisplay}`+ plural  : actionDisplay;
    const hamdleClick = (event) => {
        event.preventDefault();
        if (action.type==='like') {
            console.log(tweet.likes+1);
        }
    };
    return <button className={className} onClick={hamdleClick}>{display}</button>;
  }
  
  function Tweet(props) {
    const {tweet} = props;
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6';
    return <div className={className} >
      <p>{tweet.id} - {tweet.content}</p>
      <div className='btn btn-group'>
        <ActionBtn tweet={tweet} action={{type: 'like', display:'Like'}} />
        <ActionBtn tweet={tweet} action={{type: 'unlike', display:'Unlike'}} />
        <ActionBtn tweet={tweet} action={{type: 'retweet', display:'Retweet'}} />
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