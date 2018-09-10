var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  console.log('Ready State: ' + this.readyState + 'Status: ' + this.status + 'Response: ' + this.responseText);
};
xhttp.open("GET", "http://52.66.167.224:3020/rintegercrm", true);
xhttp.send();
