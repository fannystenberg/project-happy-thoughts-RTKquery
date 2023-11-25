import { useState } from "react";
import Confetti from "react-confetti";
import { useAddThoughtMutation } from "../api/thoughts";

const NewThought = () => {
  const initialValue = { message: "" };
  const [newThought, setNewThought] = useState(initialValue);
  const [confetti, setConfetti] = useState({ showConfetti: false });
  const [addThought, { isError }] = useAddThoughtMutation();

  const messageTooShort = newThought.message.length < 5;
  const messageTooLong = newThought.message.length > 140;

  const alertText = () => {
    if (messageTooShort) {
      return "Oh no! Too short message, needs to be minimum 5 characters";
    } else if (messageTooLong) {
      return "Oh no! Too long message, keep it within 140 characters";
    }
  };

  const handleAddThought = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (messageTooShort || messageTooLong) {
      alert(alertText());
      return;
    }
    try {
      await addThought(newThought).unwrap();
      setConfetti({ showConfetti: true });
      setNewThought(initialValue);
      setTimeout(() => setConfetti({ showConfetti: false }), 3000);
    } catch (error) {
      console.log(isError, error);
      alert("Oh no! Something went wrong, please try again");
    }
  };

  return (
    <>
      {confetti.showConfetti && <Confetti numberOfPieces={200} />}
      <div className="newPostWrapper">
        <form onSubmit={handleAddThought}>
          <label htmlFor="newPost" className="newPostTitle">
            What is making you happy right now?
            <textarea
              id="newPost"
              placeholder="Type something here.."
              rows={4}
              cols={40}
              value={newThought.message}
              onChange={(e) => setNewThought({ message: e.target.value })}
            />
          </label>
          <p
            className={
              newThought.message.length > 140 ? "counterTooMany" : "counter"
            }
          >
            {newThought.message.length} / 140
          </p>
          <button className="postBtn" type="submit">
            <span>
              <span className="heart" role="img" aria-label="heart">
                ❤️{" "}
              </span>
              Send happy thought
              <span className="heart" role="img" aria-label="heart">
                {" "}
                ❤️
              </span>
            </span>
          </button>
        </form>
      </div>
    </>
  );
};

export default NewThought;
