import './SavedNews.css';
import NewsCard from '../NewsCard/NewsCard';

function SavedNews(props) {
  let newsArray = props.searchResult;
  return (
    <section className='news'>
      <div className='news__container'>
        {props.location.pathname === '/' && (
          <h2 className='news__title'>Search results</h2>
        )}
        <ul className='news__elements'>
          {
            /*Add condition to iterate over saved arrays for saved-news route */
            newsArray.map((news) => {
              return (
                <NewsCard
                  isLoggedIn={props.isLoggedIn}
                  newInfo={news}
                  location={props.location}
                  removeNews={props.deleteNews}
                />
              );
            })
          }
        </ul>
        {props.location.pathname === '/' && (
          <button className='news__button' onClick={props.showMore}>
            Show more
          </button>
        )}
      </div>
    </section>
  );
}

export default SavedNews;
