/**
 * Data Provider для react-admin.
 * Мапить виклики react-admin → наш FastAPI backend.
 *
 * react-admin викликає методи: getList, getOne, create, update, delete, getMany
 * Ми транслюємо їх у звичайні fetch запити до /api/v1/...
 */

// При пуші розкоментувати
// const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`

// При розробці розкоментувати
const API_URL = `http://127.0.0.1:8000/api/v1`

const ADMIN_RESOURCES = ['vacancies', 'questions', 'fundraiser']

/**
 * Отримує JWT токен із localStorage
 */
const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    const headers = { 'Content-Type': 'application/json' }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    return headers
}

const dataProvider = {
    // ──────────────────────────────────────────
    // GET LIST  →  GET /resource?include_inactive=true
    // ──────────────────────────────────────────
    getList: async (resource, param) => {
        const isAdminResource = ADMIN_RESOURCES.includes(resource)
        const query = isAdminResource ? '?include_inactive=true' : ''

        const responce = await fetch(`${API_URL}/${resource}${query}`)

        if (!responce.ok) {
            throw new Error(`Помилка отримання списку: ${responce.statusText}`)
        }

        const data = await responce.json()
        const total = parseInt(responce.headers.get('X-Total-Count') ?? data.length, 10)

        return {data, total}
    },

    // ──────────────────────────────────────────
    // GET ONE  →  GET /resource/{id}
    // ──────────────────────────────────────────
    getOne: async (resource, param) => {
        const responce = await fetch(`${API_URL}/${resource}/${param.id}`)

        if (!responce.ok) {
            throw new Error(`Запис не знайдено: ${responce.statusText}`)
        }

        const data = await responce.json()

        return {data}
    },

    // ──────────────────────────────────────────
    // GET MANY  →  кілька GET /resource/{id}
    // (react-admin використовує для reference fields)
    // ──────────────────────────────────────────
    getMany: async (resource, param) => {
        const promises = param.ids.map((id) => fetch(`${API_URL}/${resource}/${id}`).then((r) => r.json()))

        const data = await Promise.all(promises)
        return {data}
    },

    // ──────────────────────────────────────────
    // CREATE  →  POST /resource
    // ──────────────────────────────────────────
    create: async (resource, param) => {
        const responce = await fetch(`${API_URL}/${resource}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(param.data)
        })

        if (!responce.ok) {
            const error = await responce.json().catch(() => ({}))
            throw new Error(error.detail ?? `Помилка створення: ${responce.statusText}`)
        }

        const data = await responce.json()
        return {data}
    },

    // ──────────────────────────────────────────
    // UPDATE  →  PUT /resource/{id}
    // ──────────────────────────────────────────
    update: async (resource, param) => {
        const responce = await fetch(`${API_URL}/${resource}/${param.id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(param.data)
        })

        if (!responce.ok) {
            const error = await responce.json().catch(() => ({}))
            throw new Error(error.detail ?? `Помилка оновлення: ${responce.statusText}`)
        }

        const data = await responce.json()
        return {data}
    },

    // ──────────────────────────────────────────
    // DELETE  →  DELETE /resource/{id}
    // ──────────────────────────────────────────
    delete: async (resource, param) => {
        const responce = await fetch(`${API_URL}/${resource}/${param.id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        })

        if (!responce.ok) {
            throw new Error(`Помилка видалення: ${responce.statusText}`)
        }

        const data = await responce.json()
        return {data}
    },

    // ──────────────────────────────────────────
    // DELETE MANY  →  кілька DELETE (масове видалення)
    // ──────────────────────────────────────────
    deleteMany: async (resource, param) => {
        const headers = getAuthHeaders()
        const promises = param.ids.map((id) => fetch(`${API_URL}/${resource}/${id}`, {
            method: 'DELETE',
            headers
        }))
        await Promise.all(promises)
        return {data: param.ids}
    },

    // Заглушки
    getManyReference: async (resource, param) => {
        return {data: [], total: 0}
    },

    updateMany: async (resource, param) => {
        return {data: param.ids}
    }
}

export default dataProvider
