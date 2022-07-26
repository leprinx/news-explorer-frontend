import './SavedNewsInfo.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useContext } from 'react';

function SavedNewsInfo(props) {
  const user = useContext(CurrentUserContext);
  const username = user.username;
  const length = props.savedNews.length;
  const keywords = props.savedNews.map((item) => {
    return item.keyword;
  });
  const randomKeywords = keywords.sort(() => 0.5 - Math.random());
  const selectedKeywords = randomKeywords.slice(0, 2);
  const numberKeywords = props.savedNews.length - 2;
  return (
    <div className='saved-news'>
      <div className='saved-news__content'>
        <p className='saved-news__title'>Saved articles</p>
        <h1 className='saved-news__info'>{`${username}, you have saved ${length} articles`}</h1>
        {props.savedNews.length !== 0 && (
          <h2 className='saved-news__subtitle'>
            {`${selectedKeywords[0]}, ${selectedKeywords[1]}, and ${numberKeywords} more`}
          </h2>
        )}
      </div>
    </div>
  );
}

export default SavedNewsInfo;
