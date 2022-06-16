import './App.css';
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import Main from '../Main/Main';
import MainFunction from '../MainFunction/MainFunction';
import AutorAbout from '../AutorAbout/AutorAbout';
import Footer from '../Footer/Footer';
import News from '../News/News';
import NoResults from '../NoResults/NoResults';
import Loader from '../Loader/Loader';
import { useState, useCallback, useEffect } from 'react';
import Popup from '../Popup/Popup';
import PopupInput from '../PopupInput/PopupInput';
import newsApi from '../../utils/NewsApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [ isLogPopupOpen, setLogPopupOpen ] = useState(false);
  const [ isRegisterPopupOpen, setRegisterPopupOpen ] = useState(false);
  const [ newsResults, setNewsResults ] = useState([]);
  const [ newsIndex, setNewsIndex ] = useState(3);
  const [ isNewsOpen, setIsNewsOpen] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ articlesFound, setIsArticlesFound ] = useState(true);
  const [ password, setPassword ] = useState(null);
  const [ email, setEmail ] = useState(null);
  const [ username, setUsername ] = useState(null);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);


  let location = useLocation();
  const currentDate = new Date().toLocaleDateString();
  const previousDate = new Date();
  previousDate.setDate(previousDate.getDate() - 7);

  //vanilla logs waiting for backend implementation
  const handleLoggIn = () =>{
    localStorage.setItem('password', password);
    localStorage.setItem('email', email);
    localStorage.setItem('username', username);
    closeAllPopups();
    setIsLoggedIn(true);
  }

  const handleLoggOut = () => {
    localStorage.removeItem('password');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  }

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
    if(localStorage.getItem('email') != null){
      setUsername(localStorage.getItem('username'));
      setIsLoggedIn(true);
    }
  }, []);
  
  const searchNews = (topic) => {
    setIsNewsOpen(false);
    setIsArticlesFound(true);
    setIsLoading(true);
    newsApi.searchByKeyword(topic, previousDate, currentDate)
    .then((res) => {
      setNewsIndex(3);
      setNewsResults(res.articles);
      if(res.totalResults !== 0){
        setIsNewsOpen(true); 
      } else{
        setIsArticlesFound(false);  
      }
    })
    .catch((res) =>{
      setIsArticlesFound(false);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const displayedNews = () => {
    setNewsIndex( newsIndex + 3 );
  }

  const handleEscClose = useCallback((evt) => {
    if (evt.key === 'Escape') {
      // eslint-disable-next-line no-use-before-define
      closeAllPopups();
    }
  }, []);
  const handleLogPopupOpen = () =>{
    setLogPopupOpen(true);
    document.addEventListener('keyup', handleEscClose);
  }
  const handleRegisterPopupOpen = () =>{
    setRegisterPopupOpen(true);
    document.addEventListener('keyup', handleEscClose);
  }

  const closeAllPopups = () =>{
    setLogPopupOpen(false);
    setRegisterPopupOpen(false);
    document.removeEventListener('keyup', handleEscClose);
  }

  const changePopup = () =>{
    setLogPopupOpen(!isLogPopupOpen);
    setRegisterPopupOpen(!isRegisterPopupOpen);
  }

  return (
    <Routes>
      <Route exact path='/' element={<div className='App container'>
        <Main>
          <MainFunction 
          searchNews={searchNews} 
          isLoggedIn={isLoggedIn}  
          openLogPopup={handleLogPopupOpen} 
          location={location.pathname}
          loggOut={handleLoggOut}
          username={username}/>
          {
            <>
             {isLoading &&
            <Loader />
            }
            {!articlesFound &&
            <NoResults />
            }
            {isNewsOpen &&  
            <News 
            searchResult={newsResults} 
            newsIndex={newsIndex} 
            showMore={displayedNews}
            location={location}
            isLoggedIn={isLoggedIn}/>
            }
            </>
          }
          <AutorAbout />
        </Main>
        <Footer />
        <Popup name={'Sign up'} 
          isLogPopupOpen={isRegisterPopupOpen} 
          isRegisterPopupOpen={isRegisterPopupOpen}
          openRegisterPopup={handleRegisterPopupOpen}
          closePopups={closeAllPopups}
          changePopup={changePopup}
          changeName={'Sign In'}
          email={email}
          password={password}
          username={username}
          onSubmit={()=>{
            closeAllPopups();
            console.log(email, password, username)}}>
          <PopupInput handleChange={setEmail} name='Sign-up Email' />
          <PopupInput handleChange={setPassword} name='Sign-up Password' />
          <PopupInput handleChange={setUsername} name='Sign-up Username' />
        </Popup>
        <Popup name={'Sign in'} 
          isLogPopupOpen={isLogPopupOpen} 
          isRegisterPopupOpen={isRegisterPopupOpen}
          openRegisterPopup={handleLogPopupOpen}
          closePopups={closeAllPopups}
          changePopup={changePopup}
          changeName={'Sign up'}
          email={email}
          password={password}
          onSubmit={handleLoggIn}>
          <PopupInput handleChange={setEmail} name='Sign-in Email' />
          <PopupInput handleChange={setPassword} name='Sign-in Password' />
        </Popup>
      </div>} />
      <Route path='/saved-news' element={
        <div className='App container'>
          <ProtectedRoute isLoggedIn={isLoggedIn}>
          <Main>
          <MainFunction 
            searchNews={searchNews} 
            isLoggedIn={isLoggedIn}  
            openLogPopup={handleLogPopupOpen} 
            location={location.pathname}
            loggOut={handleLoggOut}
            username={username}/>
            {isNewsOpen &&  
            <News 
            searchResult={newsResults} 
            newsIndex={newsIndex} 
            showMore={displayedNews}
            location={location}
            isLoggedIn={isLoggedIn}/>
            }
        </Main>
        <Footer />
        </ProtectedRoute>
        </div>
      }/>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
} 

export default App;
