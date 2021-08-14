import React, { useEffect, useState } from "react";

import { apiTweetList, apiTweetCreate, apiTweetAction } from "./lookup";

export function TweetsComponent(props) {
    const textAreaRef = React.createRef();
    const [newTweet, setNewTweet] = useState([]);
    const handleBackendUpdate = (response, status) => {
        // backend API response handler
        let tempNewTweets = [...newTweet];
        if (status===201) {
            setNewTweet(tempNewTweets);
            tempNewTweets.unshift(response);
        } else {
            alert(response.detail);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const newVal = textAreaRef.current.value;
        // backend api request
        apiTweetCreate(newVal, handleBackendUpdate);
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
    const {tweet, action, didPerformAction} = props;
    const likes = tweet.likes ? tweet.likes : 0;
    const className = props.className ? className : 'btn btn-primary btn-sm';
    const actionDisplay = action.display ? action.display : 'Action';
    const plural = tweet.likes > 1 ? 's' : '';
    const handleBackendActionEvent = (response, status) => {
        console.log(response, status);
        if ((status===200 || status===201) && didPerformAction) {
            didPerformAction(response, status);
        }
    }
    const handleClick = (event) => {
        event.preventDefault();
        apiTweetAction(tweet.id, action.type, handleBackendActionEvent);
    };
    const display = action.type === 'like' ? `${likes} ${actionDisplay}`+ plural  : actionDisplay;
    return <button className={className} onClick={handleClick}>{display}</button>;
  }

export function ParentTweet(props) {
    const {tweet} = props;
      return tweet.parent ? <div className='row'>
      <div className='col-11 mx-auto p-3 border rounded'>
      <p className='mb-0 text-muted small'>Retweet</p>
      <Tweet className={''} tweet={tweet.parent} />
      </div>
      </div> : null;
  }
  
function Tweet(props) {
    const {tweet} = props;
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null);
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6';
    const handlePerformAction = (newTweetAction, status) => {
        if (status===200) {   
            setActionTweet(newTweetAction);
        } else if (status==201) {
            // let the tweet list know.
        }
    };
    return <div className={className} >
        <div>
            <p>{tweet.id} - {tweet.content}</p>
            <ParentTweet tweet={tweet} />
        </div>
        {actionTweet && <div className='btn btn-group'>
            {/* <ActionBtn tweet={tweet} action={{type: tweetLiked ? 'unlike' : 'like', display:'Like'}} /> */}
            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: 'like', display:'Like'}} />
            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: 'unlike', display:'Unlike'}} />
            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: 'retweet', display:'Retweet'}} />
        </div>}
        </div>
}
  
export function TweetList(props) {
    const [tweetsInit, setTweetsInit] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [tweetsDidSet, setTweetsDidSet] = useState(false);
    useEffect(()=>{
        const final = [...props.newTweet].concat(tweetsInit);
        if (final.length!==tweets.length) {
            setTweets(final);
        }
    }, [props.newTweet, tweets, tweetsInit]);
    useEffect(()=>{
      if (tweetsDidSet===false) {
        const handleTweetListLookup = (response, status)=>{
            // console.log(response, status);
            if (status===200) {
                setTweetsInit(response);
                setTweetsDidSet(true);
            } else alert('An error occured')
          };
          apiTweetList(handleTweetListLookup);
      }
    }, [tweetsInit, tweetsDidSet, setTweetsDidSet]);
    return <div>
          {tweets.map((tweet, index)=>{
            return <Tweet tweet={tweet} key={`${index}-{tweet-id}`} className='my-5 mx-5 border' />
          })}
        </div>
  }