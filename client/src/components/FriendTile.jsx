import React from "react";
import FilledStar from "../icons/filledStar";
import Trash from "../icons/Trash";
import Unfilled from "../icons/UnfilledStar";
const FriendTile = ({ friend, toggleLike, handleDelete }) => {
  return (
    <div
      key={friend["id"]}
      className="mx-auto p-2 border d-flex justify-content-between align-items-center "
    >
      <div className="col-6">
        <div className="fw-bold">{friend.name}</div>
        <small className="text-muted">is your friend</small>
      </div>
      <div className="col-4 col-lg-2 d-flex justify-content-around">
        <button
          className="mx-1 btn btn-sm btn-outline-secondary"
          onClick={() => toggleLike(friend["id"])}
        >
          {friend.favorite ? <FilledStar /> : <Unfilled />}
        </button>
        <button
          className="mx-1 btn btn-sm btn-outline-secondary"
          onClick={() => handleDelete(friend["id"])}
        >
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default FriendTile;
