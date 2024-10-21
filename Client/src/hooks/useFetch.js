import { useEffect, useState } from "react";

const useFetch = (url, method, token, body, isFormData) => {
    let [data, setData] = useState(null);
    let [error, setError] = useState(null);
    let [isPending, setIsPending] = useState(true);

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
        
    },[url, method, token, body, isFormData]);

    return {data,error,isPending};
}
 
export default useFetch;
