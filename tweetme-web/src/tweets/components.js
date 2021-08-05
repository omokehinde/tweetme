import React, { useEffect, useState } from "react";

import { loadTweets } from "../lookup";

export function TweetsComponent(props) {
    const textAreaRef = React.createRef();
    const [newTweet, setNewTweet] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const newVal = textAreaRef.current.value;
        let tempNewTweets = [...newTweet];
        // chamge this to a sever side call
        tempNewTweets.unshift({
            content: newVal,
            likes: 0,
            id: 22
        });
        setNewTweet(tempNewTweets);
        textAreaRef.current.value = '';
    };
    return  <div className={props.className}>
                <div className='col-12 mb-3'>
                    <form onSubmit={handleSubmit}>
                        <textarea ref={textAreaRef} required={true} className='form-control' name='tweet'></textarea>
                        <button type='submit' className='btn btn-primary my-3'>Tweet</button>
                    </form>
                </div>
                <TweetList newTweet={newTweet} />
            </div>;
}

function ActionBtn(props) {
    const {tweet, action} = props;
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0);
    const [userLike, setUserLike] = useState(false);
    const className = props.className ? className : 'btn btn-primary btn-sm';
    const actionDisplay = action.display ? action.display : 'Action';
    const plural = tweet.likes > 1 ? 's' : '';
    const hamdleClick = (event) => {
        event.preventDefault();
        if (action.type==='like') {
            if (userLike===true) {
                setLikes(likes-1);
                setUserLike(false);
            } else {
                setLikes(likes+1);
                setUserLike(true);
            }
        }
    };
    const display = action.type === 'like' ? `${likes} ${actionDisplay}`+ plural  : actionDisplay;
    return <button className={className} onClick={hamdleClick}>{display}</button>;
  }
  
  function Tweet(props) {
    const {tweet} = props;
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6';
    return <div className={className} >
      <p>{tweet.id} - {tweet.content}</p>
      <div className='btn btn-group'>
        <ActionBtn tweet={tweet} action={{type: 'like', display:'Like'}} />
        <ActionBtn tweet={tweet} action={{type: 'retweet', display:'Retweet'}} />
      </div>
    </div>
  }
  
  export function TweetList(props) {
    const [tweetsInit, setTweetsInit] = useState([]);
    const [tweets, setTweets] = useState([]);
    // setTweetsInit([...props.newTweet].concat(tweetsInit));
    useEffect(()=>{
        const final = [...props.newTweet].concat(tweetsInit);
        if (final.length!==tweets.length) {
            setTweets(final);
        }
    }, [props.newTweet, tweets, tweetsInit]);
    useEffect(()=>{
      // perform lookup
      const myCallback = (response, status)=>{
        console.log(response, status);
        if (status===200) {
          setTweetsInit(response);
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