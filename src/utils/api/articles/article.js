import { _fetchWithAuth, baseUrl } from "../../network";

export const articleAPI = {
    createArticle: async (payload) => {
        const response = await _fetchWithAuth(`${baseUrl}/article`, {
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

    getArticles: async () => {
        const response = await fetch(`${baseUrl}/articles`)
        const {
            status,
            message,
            data: { articles },
        } = await response.json()

        if (status !== 'success') {
            throw new Error(message)
        }

        return articles
    },

    getArticle: async (id) => {
        const response = await fetch(`${baseUrl}/articles/${id}`)
        const {
            status,
            message,
            data: { detailArticle },
        } = await response.json()

        if ( status !== 'success' ) {
            throw new Error(message)
        }

        return detailArticle
    },
}