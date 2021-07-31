import { useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function loadTweets(callback) {
  const xhr = new XMLHttpRequest();
  const method = 'GET';
  const url = 'http://localhost:8000/api/tweet/';
  const responseType = 'json';
  xhr.responseType = responseType;
  xhr.open(method, url);
  xhr.onload = function () {
    callback(xhr.response, xhr.status);
  };
  xhr.onerror = function (e) {
    console.log(e);
    callback({message:'Request was an error'}, 400);
  }
  xhr.send();
}

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

function App() {
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
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {tweets.map((tweet, index)=>{
            return <Tweet tweet={tweet} key={`${index}-{tweet-id}`} className='my-5 mx-5 border' />
          })}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
