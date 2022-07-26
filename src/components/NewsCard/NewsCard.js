import './NewsCard.css';
import { useState, useEffect } from 'react';
import saveBlue from '../../images/news__save/save-blue.svg';
import saveWhite from '../../images/news__save/save-white.svg';

function NewsCard({
  newInfo,
  location,
  isLoggedIn,
  addNews,
  token,
  savedNews,
  removeNews,
  keyword,
  openLoggin,
}) {
  const [saveImage, setSaveImage] = useState(saveWhite);
  let dateString = '';
  let descriptionString = '';
  let isSaved = false;
  if (location.pathname === '/') {
    isSaved = savedNews.some((news) => news.link === newInfo.url);
    descriptionString = newInfo.description;
    dateString = newInfo.publishedAt;
    dateString = dateString.slice(0, 10);
    dateString = new Date(dateString);
    dateString = dateString.toLocaleDateString('default', {
      year: 'numeric',
      day: 'numeric',
      month: 'long',
    });
  } else {
    descriptionString = newInfo.text;
  }
  const description = descriptionString.replace(
    /((<ul>|<ol>)|<li>|<\/li>|(<\/ul>|<\/ol>))/g,
    ''
  );
  useEffect(() => {
    if (location.pathname === '/') {
      if (isSaved) {
        setSaveImage(saveBlue);
      } else {
        setSaveImage(saveWhite);
      }
    } 
  }, [savedNews]);
  const handleSave = () => {
    if (saveImage === saveWhite) {
      if(!isLoggedIn){
        openLoggin();
      } else{
        addNews(
          keyword,
          newInfo.title,
          description,
          dateString,
          newInfo.source.name,
          newInfo.url,
          newInfo.urlToImage,
          token
        );
      }
    } 
  };
  const handleDelete = () =>{
    if (location.pathname === '/'){
      const savedCard = savedNews.filter((item) => item.link === newInfo.url)
      removeNews(savedCard[0]._id);
    } else{
      removeNews(newInfo._id);
    }
  }
  return (
    <li
      className='news__element'
      key={
        location.pathname === '/saved-news'
          ? newInfo._id 
          : newInfo.url
      }
    >
      <a
        className='news__link'
        href={location.pathname === '/saved-news' ? newInfo.link : newInfo.url}
        target='_blank'
        rel='noreferrer'
      >
        <img
          src={
            location.pathname === '/saved-news'
              ? newInfo.image
              : newInfo.urlToImage
          }
          alt='article'
          className='news__picture'
        ></img>
        <div className='news__description'>
          <h4 className='news__date'>
            {location.pathname === '/saved-news' ? newInfo.date : dateString}
          </h4>
          <h3 className='news__headline'>{newInfo.title}</h3>
          <p className='news__preview'>{description}</p>
          <h4 className='news__source'>
            {location.pathname === '/saved-news'
              ? newInfo.source
              : newInfo.author}
          </h4>
        </div>
      </a>
      {location.pathname === '/saved-news' ? (
        <button className='news__delete' onClick={handleDelete}></button>
      ) : (
        <button
          className='news__save'
          onClick={isSaved? handleDelete : handleSave}
          style={{ backgroundImage: `url(${saveImage})` }}
        ></button>
      )}
      {location.pathname === '/saved-news' ? (
        <p className='news__save-text'>Remove from Saved</p>
      ) : (
        <p className='news__save-text'>Sign in to save articles</p>
      )}
      {location.pathname === '/saved-news' ? (
        <p className='news__save-tag'>{newInfo.keyword}</p>
      ) : (
        ''
      )}
    </li>
  );
}

export default NewsCard;
