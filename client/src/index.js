import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { throttle } from 'lodash';
// import * as serviceWorker from './serviceWorker';
import configureAppStore from './store';
import App from './app'
import { saveState } from './helpers/localStorage';

const store = configureAppStore();

store.subscribe( throttle( () => {
    saveState(store.getState().UserReducer);
}, 1000));


const returnApp=App=>{
    return ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.querySelector('#root')
    );
}

// if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./app',()=>{
//         const NextApp = require('./app').default;
//         returnApp(NextApp);
//     })
// }
//
// serviceWorker.register();
returnApp(App);
