
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

export function backendLookup(method, endpoint, callback, data) {
  let jsonData;
  if (data) {
    jsonData = JSON.stringify(data);
  }
  const xhr = new XMLHttpRequest();
  const url = `http://localhost:8000/api${endpoint}`;
  xhr.responseType = 'json';
  const csrftoken = getCookie('csrftoken');
  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  if (csrftoken) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
  }
  xhr.onload = function () {
    callback(xhr.response, xhr.status);
  };
  xhr.onerror = function (e) {
    console.log(e);
    callback({message:'Request was an error'}, 400);
  }
  xhr.send(jsonData);
}
