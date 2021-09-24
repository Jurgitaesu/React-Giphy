import {useRef, useState, useEffect} from 'react';
import Input from './components/Input';
import Grid from './components/Grid';
import Modal from './components/Modal';
import Loader from './components/Loader';

function App() {
    const keywordRef = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [gifs, setGifs] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (isLoading) {
            const fetchGifs = async () => {
                try {
                    const API_KEY = process.env.REACT_APP_API_KEY;
                    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=12&offset=${offset}`);
                    const data = await response.json();
                    const fetchedGifs = data.data;
                    if (fetchedGifs.length === 0) {
                        return setError('No more gifs to show, try another keyword');
                    }
                    setError('');
                    setGifs([...gifs, ...fetchedGifs]);
                    setOffset((offset) => offset + 13);
                } catch (e) {
                    setError(e);
                }
            };
            fetchGifs();
        }
        setIsLoading(false);

    }, [isLoading]);

    const handleSearch = () => {
        setGifs([]);
        setOffset(() => 0);
        if (keywordRef.current.value === '') {
            return setError('Please type a keyword');
        }
        if (typeof keywordRef.current.value === 'string' || 'number') {
            setKeyword(keywordRef.current.value);
            setIsLoading(true);
            return keywordRef.current.value = '';
        } else {
            setError('Keyword should contain only characters or numbers');
        }
    }
    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;
        if (scrollTop + clientHeight > scrollHeight - 5) {
            setTimeout(function () {
                setIsLoading(true);
            }, 500);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openModal = (id) => {
        const selectedImage = gifs.find(x => x.id === id);
        setImageSrc(selectedImage.images.original.url);
    }

    return (
        <div className="container">
            <h2>Search for gifs on Giphy API</h2>
            <Input keywordRef={keywordRef} handleSearch={handleSearch}/>
            {isLoading ? <Loader/> : null}
            {!!error && <div className="error">{error}</div>}
            <Grid gifs={gifs} openModal={openModal}/>
            {!!imageSrc &&
            <Modal imageSrc={imageSrc} setImageSrc={setImageSrc}/>
            }
        </div>
    );
}

export default App;