
const initLocalStorage ={
    'isAuthenticated' : false,
    'user' : null
};

export const loadState = () => {
    try {
        const localData = localStorage.getItem('userState');
        if (localData === null) {
            return initLocalStorage;
        }
        else {
            return JSON.parse(localData);
        }
    } catch (err) {
        // ingnore errors
    }
};


export const saveState = userState => {
    try {
        let finalData={isAuthenticated:userState.isAuthenticated,user:userState.user};
        const localData = JSON.stringify(finalData);
        localStorage.setItem('userState', localData);
    } catch (err) {
        // ingnore errors
    }
};
