import { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";

const FeedContext = createContext();

export const FeedProvider = ({children}) => {
    const token = localStorage.getItem("token");
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const findUserById = (userId) => {
      const user = users.find(user => user._id===userId);
      return user;
    }

    useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
          setError(null);
    
          try {
            const { data: postData, error: postError } = await fetchData("/api/posts",'GET', token);
            const { data: userData, error: userError } = await fetchData("/api/user/users", "GET", token);

            if (postError) setError(postError);
            if (userError) setError(userError);

            if (!postError && !userError) {
                setPosts(postData);
                setUsers(userData);
            }
          } catch (error) {
              setError("Something went wrong!");
          } finally {
              setLoading(false);
          }
        };
        fetchPosts();
    },[token]);

    const createPost = async(newPostData) => {
        setLoading(true);
        setError(null);

        try{
            const formData = new FormData();
            formData.append("userId", newPostData.userId);
            formData.append("description", newPostData.description);
            formData.append("image", newPostData.file);
    
            const {data, error} = await fetchData(`/api/posts/newpost`, 'POST', token, formData, true);
            if(error){
                alert("Error updating create status", error);
            }
            else{
                //setPosts((prev) => prev.filter((post) => post._id !== postId));
                setPosts((prev) => [data, ...prev]);
                alert("post created");
            }
        } catch(error){
            setError(error);
        }
    }

    const deletePost = async(postId) => {
      setLoading(true);
      setError(null);

      try{
        const {error} = await fetchData(`/api/posts/${postId}`, 'DELETE', token);
        if(error){
            alert("Error updating follows status", error);
        }
        else{
          alert("post deleted");
        }
      } catch(error){
        setError(error);
      }
    }
    return (
        <FeedContext.Provider
          value={{
            posts,
            users,
            loading,
            error,
            findUserById,
            createPost,
            deletePost
          }}
        >
          {children}
        </FeedContext.Provider>
      );
};
export const useFeed = () => useContext(FeedContext);