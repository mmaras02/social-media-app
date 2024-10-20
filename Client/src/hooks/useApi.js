import { useEffect, useState } from "react";

const useApi = (url, method, token, body, isFormData) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        if(!token){
            setIsPending(false);
            setError("Missing token");
        }
        fetch(url,{
            method:method,
            body:isFormData ? body : JSON.stringify(body),
            headers: {
                'Authorization': `Bearer ${token}`,
                ...(isFormData ? {} : {'Content-Type': 'application/json'})
        }})
        .then((res) => {
            if(!res.ok){
                throw Error("unable to fetch data");
            }
            return res.json();
        })
        .then((data) => {
            setData(data)
            setError(null);
            setIsPending(false);
        })
        .catch(err => {
            setError(err.message);
            setIsPending(false);
        });
        
    },[url, method, token, body, isFormData])

    return {data,error,isPending};
}
 
export default useApi;
