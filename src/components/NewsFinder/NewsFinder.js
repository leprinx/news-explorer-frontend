import './NewsFinder.css';
import SearchForm from '../SearchForm/SearchForm';

function NewsFinder(props) {
  return (
    <div className='finder__container'>
      <h1 className='finder__title'>What's going on in the world?</h1>
      <h2 className='finder__subtitle'>
        Find the latest news on a topic and save them in your personal account
      </h2>
      <SearchForm searchNews={props.searchNews}/>
    </div>
  );
}
export default NewsFinder;
