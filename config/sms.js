





const send_sms=(mobile, message)=>{
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer i4WTrOvvFpIKJbgMcCWO");

var raw = JSON.stringify({
  "src": "Crystal-Clean",
  "dests": [
    "966"+mobile
  ],
  "body": message,
  "priority": 0,
  "delay": 0,
  "validity": 0,
  "maxParts": 0,
  "dlr": 0,
  "prevDups": 0,
  "msgClass": "promotional"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.oursms.com/msgs/sms", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

}

module.exports =send_sms