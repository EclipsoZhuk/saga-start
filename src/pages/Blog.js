import { useDispatch } from 'react-redux';

export default function Blog() {
    // const blogData = useSelector(state => state.app.blog);
    const dispatch = useDispatch();

    return (
        <div>
            Blog
            <div>
                <button onClick={() => dispatch({ type: 'LOAD_SOME_DATA' })}>
                    Load Some Data
                </button>
            </div>
        </div>
    );
}
