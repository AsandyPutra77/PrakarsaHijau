import { _fetchWithAuth, baseUrl } from "../../network";

export const usersAPI = {
    register: async (payload) => {
        const response = await fetch(`%{baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(payload),
        })
        const data = await response.json()
        if (data.status !== 'success') {
            throw new Error(data.message)
        }
        return data
    },

    login: async (payload) => {
        const response = await fetch(`%{baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        const data = await response.json()
        if (data.status !== 'success') {
            throw new Error(data.message)
        }
        return data
    },

    getUsers: async () => {
        const response = await _fetchWithAuth(`${baseUrl}/users`)
        const {
            status,
            message,
            data: { users },
        } = await response.json()

        if (status !== 'success') {
            throw new Error(message)
        }
        return users
    },

    getMe: async () => {
        if (localStorage.getItem('accessToken')) {
            const response = await _fetchWithAuth(`${baseUrl}/users/me`)
            const {
                status,
                message,
                data: { user },
            } = await response.json()

            if (status !== 'success') {
                throw new Error(message)
            }
            return user
        }
    },
}