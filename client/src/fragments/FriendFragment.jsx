import React from "react";
import FriendTile from "../components/FriendTile";
const FriendsFragment = ({ friends, handleDelete, toggleLike }) => {
  return (
    <div className="my-3">
      {friends.map((friend) => (
        <FriendTile
          friend={friend}
          handleDelete={handleDelete}
          toggleLike={toggleLike}
          key={friend.id}
        />
      ))}
    </div>
  );
};

export default FriendsFragment;
