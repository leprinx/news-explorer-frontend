import './App.css';
import { useLocation, Route, Routes, Navigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/Auth';
import Main from '../Main/Main';
import MainFunction from '../MainFunction/MainFunction';
import AutorAbout from '../AutorAbout/AutorAbout';
import Footer from '../Footer/Footer';
import News from '../News/News';
import SavedNews from '../SavedNews/SavedNews';
import NoResults from '../NoResults/NoResults';
import Loader from '../Loader/Loader';
import { useState, useEffect } from 'react';
import newsApi from '../../utils/NewsApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SuccesPopup from '../SuccesPopup/SuccesPopup';
import Login from '../Login/Login';
import Signup from '../SignUp/SignUp';


function App() {
  const [isLogPopupOpen, setLogPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);
  const [isSuccesPopupOpen, setIsSuccesPopupOpen] = useState(false);
  const [newsResults, setNewsResults] = useState([]);
  const [savedNews, setSavedNews] = useState([]);
  const [newsIndex, setNewsIndex] = useState(3);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [articlesFound, setIsArticlesFound] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJWT] = useState(localStorage.getItem('jwt'));
  const [signUpError, setSignUpError] = useState(undefined);
  const [loginError, setLogginError] = useState(undefined);
  const [topic, setTopic] = useState(undefined);

  const [currentUser, setCurrentUser] = useState({});

  let location = useLocation();
  const currentDate = new Date().toLocaleDateString();
  const previousDate = new Date();
  previousDate.setDate(previousDate.getDate() - 7);

  const handleSignup = () => {
    auth
      .register(email, password, username)
      .then(() => {
        closeAllPopups();
        setIsSuccesPopupOpen(true);
      })
      .catch((err) => {
        setSignUpError(err.message);
      })
  };

  const handleLoggIn = () => {
    auth
      .login(email, password)
      .then((res) => {
        setCurrentUser(res);
        setJWT(res.token);
        setIsLoggedIn(true);
        closeAllPopups()
      })
      .catch((err) => {
        setLogginError(err.message);
      })
  };

  const handleLoggOut = () => {
    localStorage.removeItem('jwt');
    setJWT(localStorage.getItem('jwt'));
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    setCurrentUser(undefined);
    setIsLoggedIn(false);
    setIsNewsOpen(false);
    setSavedNews([]);
  };
  const getSavedNews = () => {
    mainApi
      .getNews(jwt)
      .then((res) => {
        setSavedNews(res.data.reverse());
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };
  const addNews = (keyword, title, text, date, source, link, image, owner) => {
    mainApi
      .addNews(keyword, title, text, date, source, link, image, jwt)
      .then((card) => {
        setSavedNews([card.data, ...savedNews]);
        return card; 
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  const removeNews = (id) =>{
    mainApi
      .removeCard(id, jwt)
      .then((article) => {
        const remaining = savedNews.filter((element) => element._id !== article.data._id);
        setSavedNews(remaining);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  useEffect(() => {
    getSavedNews();
    if(location.pathname === '/saved-news' && !isLoggedIn){
      handleLogPopupOpen();
    }
    if (jwt != null) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem('jwt');
          }
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    }
  }, [isLoggedIn]);

  const searchNews = (topic) => {
    setIsNewsOpen(false);
    setIsArticlesFound(true);
    setIsLoading(true);
    newsApi
      .searchByKeyword(topic, previousDate, currentDate)
      .then((res) => {
        setNewsIndex(3);
        setTopic(topic);
        setNewsResults(res.articles);
        if (res.totalResults !== 0) {
          setIsNewsOpen(true);
        } else {
          setIsArticlesFound(false);
        }
      })
      .catch((res) => {
        setIsArticlesFound(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const displayedNews = () => {
    setNewsIndex(newsIndex + 3);
  };

  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  };
  const handleLogPopupOpen = () => {
    setEmail('');
    setPassword('');
    setLogPopupOpen(true);
    setLogginError(undefined);
  };
  const handleRegisterPopupOpen = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setSignUpError(undefined);
    setRegisterPopupOpen(true);
  };

  const closeAllPopups = () => {
    setLogPopupOpen(false);
    setRegisterPopupOpen(false);
  };

  const changePopup = () => {
    if(isLogPopupOpen === true){
      console.log('running');
      setLogPopupOpen(false);
      handleRegisterPopupOpen();
      console.log(email);
    } else{
      setRegisterPopupOpen(!isRegisterPopupOpen);
      handleLogPopupOpen();
    }
  };

  const succesToLogin = () => {
    setEmail('');
    setPassword('');
    setIsSuccesPopupOpen(false);
    setLogPopupOpen(true);
  };
;
  return (
    <Routes>
      <Route
        exact
        path='/'
        element={
          <div className='App container'>
            <CurrentUserContext.Provider value={currentUser}>
              <Main>
                <MainFunction
                  searchNews={searchNews}
                  isLoggedIn={isLoggedIn}
                  openLogPopup={handleLogPopupOpen}
                  location={location.pathname}
                  loggOut={handleLoggOut}
                />
                {
                  <>
                    {isLoading && <Loader />}
                    {!articlesFound && <NoResults />}
                    {isNewsOpen && (
                      <News
                        searchResult={newsResults}
                        newsIndex={newsIndex}
                        showMore={displayedNews}
                        location={location}
                        isLoggedIn={isLoggedIn}
                        addNews={addNews}
                        savedNews={savedNews}
                        token={jwt}
                        keyword={topic}
                        deleteNews={removeNews}
                        openLoggin={handleLogPopupOpen}
                      />
                    )}
                  </>
                }
                <AutorAbout />
              </Main>
              <Footer />
            </CurrentUserContext.Provider>
            <Signup
              isLogPopupOpen={isRegisterPopupOpen}
              isRegisterPopupOpen={isRegisterPopupOpen}
              handleRegisterPopupOpen = {handleRegisterPopupOpen}
              closePopups={closeAllPopups}
              changePopup={changePopup}
              email={email}
              password={password}
              onSubmit={handleSignup}
              setEmail={setEmail}
              setPassword={setPassword}
              setUsername={setUsername}
              username={username}
              submitError={signUpError}
            />
            <Login 
              name={'Sign in'}
              isLogPopupOpen={isLogPopupOpen}
              isRegisterPopupOpen={isRegisterPopupOpen}
              closePopups={closeAllPopups}
              changePopup={changePopup}
              email={email}
              password={password}
              onSubmit={handleLoggIn}
              setEmail={setEmail}
              setPassword={setPassword}
              submitError={loginError}
            />
            <SuccesPopup
              isOpen={isSuccesPopupOpen}
              closePopups={closeAllPopups}
              changePopup={succesToLogin}
            />
          </div>
        }
      />
      <Route
        path='/saved-news'
        element={
          <div className='App container'>
            <CurrentUserContext.Provider value={currentUser}>
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main>
                  <MainFunction
                    searchNews={searchNews}
                    isLoggedIn={isLoggedIn}
                    openLogPopup={handleLogPopupOpen}
                    location={location.pathname}
                    loggOut={handleLoggOut}
                    username={username}
                    savedNews={savedNews}
                  />
                  {savedNews.length > 0 && (
                    <SavedNews
                      searchResult={savedNews}
                      newsIndex={newsIndex}
                      showMore={displayedNews}
                      location={location}
                      isLoggedIn={isLoggedIn}
                      deleteNews={removeNews}
                    />
                  )}
                </Main>
                <Footer />
              </ProtectedRoute>
            </CurrentUserContext.Provider>
          </div>
        }
      />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default App;
