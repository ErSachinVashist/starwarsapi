import { configureStore,getDefaultMiddleware} from 'redux-starter-kit'
import rootReducer from './rootReducer';

export default function configureAppStore(){
    const store = configureStore({
        reducer:rootReducer,
        middleware:[...getDefaultMiddleware()],
        devTools:true
    })

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./rootReducer', () => {
            const nextReducer = require('./rootReducer').default;
            store.replaceReducer(nextReducer)
        })
    }

    return store

}
