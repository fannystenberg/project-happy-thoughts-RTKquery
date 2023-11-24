/* eslint-disable no-underscore-dangle */
import { useState } from "react";
import NewThought from "./NewThought";
import { useGetThoughtsQuery } from "../api/thoughts";

const API = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

const Feed = () => {
  const { isLoading, data: thoughts } = useGetThoughtsQuery();
  const [thoughtsList, setThoughtsList] = useState<any[]>([]);

  const handleLike = (thoughtId: string) => {
    fetch(`${API}/${thoughtId}/like`, { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        const UpdateLikes = thoughtsList.map((like: any) => {
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

  if (!thoughts) {
    return null;
  }

  return (
    <>
      <section>
        <NewThought />
      </section>
      <section className="feedContainer">
        {!isLoading &&
          thoughts.map((thought) => {
            return (
              <div key={thought._id} className="feedWrapper">
                <p className="postText">{thought.message}</p>
                <button
                  type="button"
                  className={thought.hearts === 0 ? "noLikesBtn" : "likesBtn"}
                  onClick={() => handleLike(thought._id)}
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
                <p className="dateOfPost">{thought.createdAt}</p>
              </div>
            );
          })}
        {isLoading && (
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
