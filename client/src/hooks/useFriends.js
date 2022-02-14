import { useState, useEffect } from "react";
import axios from "axios";
import { v4 } from "uuid";

const useFriends = () => {
  const baseURL = "http://localhost:5000";
  const [friends, setFriends] = useState([]);
  const [urls, setUrls] = useState({
    currentUrl: "/getFriends/0",
    nextUrl: "",
    prevUrl: "",
  });

  useEffect(() => {
    getFriends();
  }, [urls.currentUrl]);

  const handleNextPage = () => {
    setUrls((prev) => ({ ...prev, currentUrl: prev.nextUrl }));
  };
  const handlePrevPage = () => {
    setUrls((prev) => ({ ...prev, currentUrl: prev.prevUrl }));
  };

  const handleSort = () => {
    const newUrl = urls.currentUrl.includes("Friend")
      ? "/getSorted/0"
      : "/getFriends/0";
    setUrls((prev) => ({ ...prev, currentUrl: newUrl }));
  };
  const getFriends = async () => {
    try {
      const response = await axios.get(baseURL + urls.currentUrl);
      console.log("The response is here", response);
      const { next_url, prev_url } = response.data;
      setUrls((prev) => ({ ...prev, nextUrl: next_url, prevUrl: prev_url }));
      setFriends(response?.data?.friends);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(baseURL + `/deleteFriend/${id}`);
      // setFriends((prev) => prev.filter((friend) => friend.id !== id));
      getFriends();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleLike = async (id) => {
    try {
      await axios.put(baseURL + `/toggleFav/${id}`);
      setFriends((prev) =>
        prev.map((friend) =>
          friend.id === id ? { ...friend, favorite: !friend.favorite } : friend
        )
      );
    } catch (e) {
      console.error(e);
    }
  };

  const addFriend = async (newFriendName) => {
    console.log("This is called", newFriendName);
    if (!newFriendName) return;
    const payload = {
      name: newFriendName,
      favorite: false,
      id: v4(),
    };
    try {
      await axios.post(baseURL + "/addFriend", payload);
      getFriends();
    } catch (e) {
      console.error(e);
    }
  };

  const getSearch = async (searchFriend) => {
    if (!searchFriend) return;
    setUrls((prev) => ({ ...prev, currentUrl: `/getSearch/${searchFriend}` }));
  };

  return {
    getFriends,
    getSearch,
    addFriend,
    urls,
    friends,
    handleDelete,
    handleNextPage,
    handlePrevPage,
    handleSort,
    toggleLike,
  };
};

export default useFriends;
