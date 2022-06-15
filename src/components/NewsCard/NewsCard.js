import './NewsCard.css';
import { useState } from 'react';
import saveBlue from '../../images/news__save/save-blue.svg';
import saveWhite from '../../images/news__save/save-white.svg';

function NewsCard({ newInfo, location, isLoggedIn }) {
    const [saveImage, setSaveImage] = useState(saveWhite);
    const descriptionString = newInfo.description;
    const description = descriptionString.replace(/((<ul>|<ol>)|<li>|<\/li>|(<\/ul>|<\/ol>))/g, '');
    const dateString = newInfo.publishedAt
    const date = dateString.slice(0, 10);
    const displayedDate = new Date(date);
    const testDate = displayedDate.toLocaleDateString("default", {
        year: "numeric",
        day: "numeric",
        month: "long",
    })
    const handleSave = () =>{
        if (saveImage === saveWhite){
            setSaveImage(saveBlue)
        } else{
            setSaveImage(saveWhite)
        }
    }
  return (
    <li className='news__element'>
      <a className='news__link' href={newInfo.url} target="_blank" rel="noreferrer">
        <img
          src={newInfo.urlToImage}
          alt='article picture'
          className='news__picture'
        ></img>
        <div className='news__description'>
          <h4 className='news__date'>{testDate}</h4>
          <h3 className='news__headline'>{newInfo.title}</h3>
          <p className='news__preview'>{description}</p>
          <h4 className='news__source'>{newInfo.author}</h4>
        </div>
      </a>
      {location.pathname === "/saved-news" ? (
           <div className='news__delete'></div>
        ) : (
            <div className={isLoggedIn ? 'news__save' : ''}onClick={handleSave} style={{backgroundImage: `url(${saveImage})`}}></div>
        )}
          {location.pathname === "/saved-news" ? (
           <p className='news__save-text'>Remove from Saved</p>
        ) : (
            <p className='news__save-text'>Sign in to save articles</p>
        )}
        {location.pathname === "/saved-news" ? (
           <p className='news__save-tag'>{newInfo.source.name}</p>
        ) : ''}
        
    </li>
  );
}

export default NewsCard;
