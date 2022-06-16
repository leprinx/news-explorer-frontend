import './MainFunction.css';
import Header from '../Header/Header';
import NewsFinder from '../NewsFinder/NewsFinder';
import SavedNewsInfo from '../SavedNewsInfo/SavedNewsInfo';


function MainFunction({ isLoggedIn,  openLogPopup, location, searchNews, loggOut, username}){
    return (
      <div className= {`main-function__container ${location === '/saved-news' ? 'main-function__container_saved-news' : ''}`}>
        <Header isLoggedIn={isLoggedIn}  openLogPopup={openLogPopup} location={location}loggOut={loggOut} username={username}/>
        {
          location === '/saved-news'?
          <SavedNewsInfo />
           : 
          <NewsFinder location={location} searchNews={searchNews}/> //h h2 and searchbar
        } 
      </div>
    );
}

export default MainFunction;
