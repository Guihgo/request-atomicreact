class Main {
  constructor(){
    this.serverUrl = '127.0.0.1';
    this.headers = [];
    this.method = 'POST';
  }
  setServerUrl(serverUrl) {
    this.serverUrl = serverUrl;
  }
  getServerUrl() {
    return this.serverUrl;
  }
  addHeader(_key, _value) {
    this.headers.push({key: _key, value: _value});
  }
  getHeader() {
    return this.headers;
  }
  setMethod(_method){
    this.method = _method;
  }
  getMethod(){
    return this.method;
  }
  request(endPoint, objToSend, callback) {
    var data = JSON.stringify(objToSend);

    var xhr = new XMLHttpRequest();

    xhr.open(this.method, this.serverUrl+endPoint);

    this.headers.forEach((header)=>{
      xhr.setRequestHeader(header.key, header.value);
    });

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        callback(this.responseText);
      }
    });

    xhr.send(data);
  }
  json(endPoint, objToSend, callback) {
    this.headers = [];
    this.addHeader("content-type", "application/json");
    this.addHeader("cache-control", "no-cache");
    this.request(endPoint, objToSend, (responseText)=>{
      callback(JSON.parse(responseText));
    });
  }
}
module.exports.main = Main;
