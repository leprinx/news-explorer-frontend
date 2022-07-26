const BASE_URL = 'https://api.pep.news.students.nomoredomainssbs.ru';
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(Error);
};

export const register = (email, password, username) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  body: JSON.stringify({ email, password, username }),
})
  .then((res) => {
    if(res.ok){
      return res.json();
    } else if(res.status === 409){
      throw Error('Username or email already registered');
    } else if(res.status === 400){
      throw Error('Validation process failed, check provided data');
    } else if(res.status === 404) {
      throw Error('404 Not found')
    } else if(res.status === 500){
      throw Error('Internal server error')
    } 
  })
  .then((res) => res);

export const login = (email, password) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then((res) => {
    if(res.ok){
      return res.json();
    } else if(res.status === 401){
      throw Error('Wrong Email or password');
    } else if(res.status === 400){
      throw Error('Could not validate data, check email or password');
    } else if(res.status === 500){
      throw Error('Internal server error')
    } 
  })
  .then((res) => {
    if (res.token) {
      localStorage.setItem('jwt', res.token);
      localStorage.setItem('email', email);
      localStorage.setItem('username', res.username);
      return res;
    } return Promise.reject(Error);
  });

export const checkToken = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
})
  .then((res) => checkResponse(res))
  .then((data) => data);
