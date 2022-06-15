import './SavedNewsInfo.css';

function SavedNewsInfo() {
  return (
    <div className='saved-news__container'>
      <div className='saved-news__content'>
        <p className='saved-news__title'>Saved articles</p>
        <h1 className='saved-news__info'>User, you have saved X articles</h1>
        <h2 className='saved-news__subtitle'>
          By keywords: Nature, Yellowstone, and 2 other
        </h2>
      </div>
    </div>
  );
}

export default SavedNewsInfo;
