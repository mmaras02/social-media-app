export const fetchData = async(url, method, token, body, isFormData) => {
    try {
        const response = await fetch(url, {
            method:method,
            body: method != 'GET' ? (isFormData ? body : JSON.stringify(body)) : undefined,
            headers: {
                'Authorization': `Bearer ${token}`,
                ...(isFormData ? {} : {'Content-Type': 'application/json'}),
            },
        });
        if(!response.ok){
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return { data, error: null };

    } catch (error){
        return { data: null, error: error.message };
    }
};