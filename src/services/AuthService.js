const URL = 'http://127.0.0.1:5000';
const AUTH_URL = 'auth';
const REGISTER_URL = `${ URL }/${ AUTH_URL }/register`;
const LOGIN_URL = `${ URL }/${ AUTH_URL }/login`;
const IS_VERIFIED_URL = `${ URL }/${ AUTH_URL }/is-verified`;
const DASHBOARD_URL = `${ URL }/dashboard`;

export default class AuthService {
    static register = async(body) => {
        try {
            const token = (await (await fetch(REGISTER_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })).json())?.token;
            if (token !== undefined) {
                localStorage.setItem('token', token);
                return token;
            }
            return '';
        } catch (exception) {
            console.error(exception);
        }
    }

    static login = async(body) => {
        try {
            const token = (await (await fetch(LOGIN_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })).json())?.token;
            if (token !== undefined) {
                localStorage.setItem('token', token);
                return token;
            }
            return '';
        } catch (exception) {
            console.error(exception);
        }
    }

    static logout = () => {
        localStorage.removeItem('token');
    }

    static isVerified = async () => {
        return await (await fetch(IS_VERIFIED_URL, { method: 'GET', headers: { token: localStorage.token } })).json()
    }

    static dashboard = async() => {
        try {
            const name = (await (await fetch(DASHBOARD_URL, { method: 'GET', headers: { token: localStorage.token } })).json())?.name;
            if (name !== undefined)
                return name;
            return '';
        } catch (exception) {
            console.error(exception);
        }
    }
}
