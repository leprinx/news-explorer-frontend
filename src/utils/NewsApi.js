// 93745731c1fa498691508b39888ff4cb
const apiKey = "93745731c1fa498691508b39888ff4cb";
class NewsApi {
    constructor(params) {
      this.baseUrl = params.baseUrl;
      this.headers = params.headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error");
    }
  
    searchByKeyword(keyword, date, currentDate) {
      return fetch(this.baseUrl + `/everything?q=${keyword}&pageSize=100&from=${date}&to=${currentDate}}&apiKey=${apiKey}`, {
        headers: this.headers,
        method: "GET",
      }).then((res) => this._checkResponse(res));
    }
  }
  
  const newsApi = new NewsApi({
      baseUrl: "https://nomoreparties.co/news/v2",
      headers: {
          "Authorization": "93745731c1fa498691508b39888ff4cb",
          "Content-Type": "application/json",
      },
      Accept: 'application/json',
  })
  
  export default newsApi;