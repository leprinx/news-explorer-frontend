class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(Error);
  }

  getNews(jwt) {
    return fetch(`${this._baseUrl}/articles`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        method: 'GET',
      },
    }).then((res) => this._checkResponse(res));
  }

  getUserData(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  addNews(keyword, title, text, date, source, link, image, jwt) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    }).then((res) => this._checkResponse(res));
  }

  removeCard(id, jwt) {
    return fetch(`${this._baseUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: 'https://api.pep.news.students.nomoredomainssbs.ru',
});
export default api;
