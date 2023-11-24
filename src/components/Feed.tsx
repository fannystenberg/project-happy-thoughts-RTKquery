/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import NewPost from "./NewPost.js";

const API = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

const Feed = () => {
  const [thoughtsList, setThoughtsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}`)
      .then((response) => response.json())
      .then((data) => setThoughtsList(data))
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const HandleLike = (thoughtId) => {
    fetch(`${API}/${thoughtId}/like`, { method: "PATCH" })
      .then((response) => response.json())
      .then((data) => {
        const UpdateLikes = thoughtsList.map((like) => {
          if (like._id === data._id) {
            like.hearts += 1;
            return like;
          } else {
            return like;
          }
        });
        setThoughtsList(UpdateLikes);
      });
  };

  return (
    <>
      <section>
        <NewPost />
      </section>
      <section className="feedContainer">
        {!loading &&
          thoughtsList.map((thought) => {
            return (
              <div key={thought._id} className="feedWrapper">
                <p className="postText">{thought.message}</p>
                <button
                  type="button"
                  className={thought.hearts === 0 ? "noLikesBtn" : "likesBtn"}
                  onClick={() => HandleLike(thought._id)}
                >
                  <span
                    className="heart"
                    role="img"
                    aria-label="Like this post"
                  >
                    ❤️
                  </span>
                </button>
                <span className="sumOfLikes">x {thought.hearts}</span>
                <p className="dateOfPost">
                  <ReactTimeAgo
                    date={thought.createdAt}
                    locale="en-US"
                    timeStyle="round-minute"
                  />
                </p>
              </div>
            );
          })}
        {loading && (
          <div className="lds-spinner">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        )}
      </section>
    </>
  );
};

export default Feed;
