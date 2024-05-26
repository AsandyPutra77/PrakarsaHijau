export const baseUrl = '/*TODO: link api kita*/'
export const _fetchWithAuth = async (url, options= {}) => {
    fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,

        },
    });
}