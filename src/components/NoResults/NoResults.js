import './NoResults.css';
import notFound from '../../images/no-results__image/no-result.svg'

function NoResults(){
    return(
        <section className='no-results'>
            <div className='no-results__container'>
            <img src={notFound} className='no-results__image' alt='Nothing found'></img>
            <h4 className='no-results__title'>
                Nothing Found
            </h4>
            <p className='no-results__description'>
                Sorry, but nothing matched your search terms
            </p>
        </div>
        </section>
    )
}

export default NoResults;