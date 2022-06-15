import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './MainFunction.css';
import Header from '../Header/Header';
import NewsFinder from '../NewsFinder/NewsFinder';
import SavedNewsInfo from '../SavedNewsInfo/SavedNewsInfo';


function MainFunction({ isLoggedIn,  openLogPopup, location, searchNews, loggOut, username}){
    return (
      <div className= {`main-function__container ${location === '/saved-news' ? 'main-function__container_saved-news' : ''}`}>
        <Header isLoggedIn={isLoggedIn}  openLogPopup={openLogPopup} location={location}loggOut={loggOut} username={username}/>
        <Routes>
          <Route exact path='/saved-news' element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SavedNewsInfo />
            </ProtectedRoute>
          }
        />
        <Route exact path='/' element={
              <NewsFinder location={location} searchNews={searchNews}/>
          }
        />
        </Routes>
        {/* {
          location === '/saved-news'?
          <Routes>
          <Route exact path='/saved-news' element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SavedNewsInfo />
            </ProtectedRoute>
          }
        />
           : 
            <NewsFinder location={location} searchNews={searchNews}/> //h h2 and searchbar
        }  */}
      </div>
    );
}

export default MainFunction;
