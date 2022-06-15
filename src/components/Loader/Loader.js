import './Loader.css';

function Loader(){
    return(
        <section className='loader'>
            <div className='loader__content'>
                <div className='loader__spiner'></div>
                <p className='loader__text'>
                    Searching for news...
                </p>
            </div>
        </section>
    )
}

export default Loader;