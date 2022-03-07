// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function App() {
    const store = useSelector(state => state);
    // const dispatch = useDispatch();
    console.log(store);

    return (
        <>
            <div className="App">redux-saga</div>
            <div>
                <Link to={'/blog'}>Open BLOG</Link>
            </div>
        </>
    );
}

export default App;
