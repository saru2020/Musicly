import React from 'react';
import HomeView from './Components/HomeView';
import { Provider } from 'react-redux';
import { store } from './redux';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <HomeView />
        </Provider>
    )
};

export default App;