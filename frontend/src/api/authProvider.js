// При пуші розкоментувати
const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`

// При розробці розкоментувати
// const API_URL = 'http://127.0.0.1:8000/api/v1'

const authProvider = {
    /**
     * Перевіряє, чи користувач залогінений
     */
    login: ({ username, password }) => {
        return fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Невірні дані')
                }
                return response.json()
            })
            .then((auth) => {
                localStorage.setItem('token', auth.access_token)
                localStorage.setItem('token_expires_in', auth.expires_in)
            })
            .catch((error) => {
                throw error
            })
    },

    /**
     * Перевіряє, чи користувач залогінений (при завантаженні сторінки)
     */
    checkAuth: async () => {
        const token = localStorage.getItem('token')
        if (token) {
            return Promise.resolve()
        }

        return Promise.reject({message: 'Потрібна авторизація'})
    },

    /**
     * Вихід з системи
     */
    logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('token_expires_in')
        return Promise.resolve()
    },

    /**
     * Обробка помилок (401 / 403 = не авторизований)
     */
    checkError: async (error) => {
        const status = error.status || (error.response && error.response.status)
        if (status === 401 || status === 403) {
            localStorage.removeItem('token')
            localStorage.removeItem('token_expires_in')
            return Promise.reject()
        }
        return Promise.resolve()
    },

    /**
     * Отримання дозволів
     */
    getPermissions: () => Promise.resolve()
}

export default authProvider
