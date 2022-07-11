import type { NextPage } from 'next'
import App from '../components/App';
import ClientOnly from '../components/ClientOnly';

const Home: NextPage = () => {
    return (
        <div>
            <App />
        </div>
    );
};

export default Home
