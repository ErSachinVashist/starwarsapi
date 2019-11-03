import io from 'socket.io-client';

let socket = null;
let eventStore = [];
export const InitSocket = (token, callback) => {
    socket = io(process.env.REACT_APP_SOCKET_URL);
    socket.on('connect', function () {
        socket.emit('authentication', {id: token.id, userId: token.userId});
        socket.on('authenticated', function (resp) {
            if (!resp) {
                console.log('Unauthorized !!');
                callback(false)
            } else {
                console.log('You Are online !!');
                callback(resp)
            }
        });
    });
};

export const SubscribeSocket = (collectionName, modelId, method, token, socketAction) => {
    let name = `/${collectionName}/${token}`;

    if (eventStore.indexOf(name) > -1) {
        socket.removeListener(name);
    }
    socket.on(name, socketAction);
    eventStore = [...eventStore, name];
};


export const UnSubscribeSocket = options => {
    const {collectionName, modelId, method, token} = options;

    const name = modelId ?
        `/${collectionName}/${method}/${modelId}/${token}` :
        `/${collectionName}/${method}/${token}`;

    socket.removeListener(name);
};

export const UnSubscribeAll = () => {
    eventStore.map((eventName, index) => {
        return socket.removeAllListeners(eventStore[index]);
    });
    eventStore = [];
};
