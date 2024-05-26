import { _fetchWithAuth, baseUrl } from "../../network";

export const feedbackAPI = {
    createFeedback: async (payload) => {
        const response = await _fetchWithAuth(`${baseUrl}/feedback`, {
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

    getFeedbacks: async () => {
        const response = await fetch(`${baseUrl}/feedbacks`)
        const {
            status,
            message,
            data: { feedbacks },
        } = await response.json()

        if (status !== 'success') {
            throw new Error(message)
        }

        return feedbacks
    },

    getFeedback: async (id) => {
        const response = await fetch(`${baseUrl}/feedbacks/${id}`)
        const {
            status,
            message,
            data: { detailFeedback },
        } = await response.json()

        if ( status !== 'success' ) {
            throw new Error(message)
        }

        return detailFeedback
    },
}