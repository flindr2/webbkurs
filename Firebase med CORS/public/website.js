const url = 'https://us-central1-fir-demo-44618.cloudfunctions.net/users'

fetch(url).then((response, request) => {
    console.log(response);
    response.json().then(data => console.log(data))
})