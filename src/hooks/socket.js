import { io } from 'socket.io-client';
export const BaseURL = 'http://localhost:5000'
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

const token = getCookie('token');
const URL = process.env.NODE_ENV === 'production' ? undefined : BaseURL ;

export const socket = io(URL, {
    query: {
        token: token,
    },
});
