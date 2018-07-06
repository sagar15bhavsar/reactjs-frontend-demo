
export const apiFetch = async (api, method, data) => {
    try {
        let query = {
            headers: {
            }
        }
        if (method && method !== undefined) {
            query.method = method
        }
        if (data && data !== undefined) {
            query.body = JSON.stringify(data)
        }
        console.log("REQUEST", api, query)
        const res = await fetch(api, query)

        const json = await res.json();

        return json;
        console.log("RESPONSE",json)
    } catch (e) {
        console.log("apiFetch", e)
        return null;
    }
}