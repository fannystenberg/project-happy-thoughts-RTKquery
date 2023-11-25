import { Thought } from "../api/thoughts";

interface UpdateLikeProps {
  thought: Thought;
  handleLike: (thoughtId: string, hearts: number) => void;
}

export function SingleThought({ thought, handleLike }: UpdateLikeProps) {
  return (
    <div className="feedWrapper">
      <p className="postText">{thought.message}</p>
      <button
        type="button"
        className={thought.hearts === 0 ? "noLikesBtn" : "likesBtn"}
        onClick={() => handleLike(thought._id, thought.hearts)}
      >
        <span className="heart" role="img" aria-label="Like this post">
          ❤️
        </span>
      </button>
      <span className="sumOfLikes">x {thought.hearts}</span>
      <p className="dateOfPost">{thought.createdAt}</p>
    </div>
  );
}
