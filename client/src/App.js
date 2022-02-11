import React, { useEffect } from "react";
import useFriends from "./hooks/useFriends";
import PaginationNavigation from "./fragments/PaginationNavigation";
import FriendsFragment from "./fragments/FriendFragment";
import HeaderSection from "./fragments/HeaderSection";
import Form from "./components/Form";

import "./App.css";

function App() {
  const {
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
  } = useFriends();

  useEffect(() => {
    getFriends();
  }, [urls.currentUrl]);

  return (
    <div className="pt-5 mx-auto col-12 col-md-4 px-2">
      <HeaderSection handleSort={handleSort} urls={urls} />
      <Form getResult={addFriend} placeholder="Add Friend" />
      <Form getResult={getSearch} placeholder="Search Friend" />
      <PaginationNavigation
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        urls={urls}
      />
      <FriendsFragment
        friends={friends}
        handleDelete={handleDelete}
        toggleLike={toggleLike}
      />
    </div>
  );
}

export default App;
