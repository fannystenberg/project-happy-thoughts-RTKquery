import { useState } from "react";
import Confetti from "react-confetti";
import { useAddThoughtMutation } from "../api/thoughts";
import styled from "styled-components";

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
    <section>
      {confetti.showConfetti && <Confetti numberOfPieces={200} />}
      <Wrapper>
        <form onSubmit={handleAddThought}>
          <StyledLabel htmlFor="newPost">
            What is making you happy right now?
            <StyledTextArea
              id="newPost"
              placeholder="Type something here.."
              rows={4}
              cols={40}
              value={newThought.message}
              onChange={(e) => setNewThought({ message: e.target.value })}
            />
          </StyledLabel>
          <Counter $error={newThought.message.length > 140}>
            {newThought.message.length} / 140
          </Counter>
          <StyledBtn type="submit">
            <span role="img" aria-label="heart">
              ❤️
            </span>
            Send happy thought
            <span role="img" aria-label="heart">
              ❤️
            </span>
          </StyledBtn>
        </form>
      </Wrapper>
    </section>
  );
};

export default NewThought;

const Wrapper = styled.div`
  box-sizing: border-box;
  background-color: white;
  margin: 10px;
  width: 320px;
  border: 1px solid rgb(56, 56, 56);
  padding: 14px;
  border-radius: 25px;
  box-shadow: 3x 3px 0px 1px rgba(56, 56, 56, 0.75);
  -webkit-box-shadow: 3px 3px 0px 1px rgba(56, 56, 56, 0.75);
  -moz-box-shadow: 3px 3px 0px 1px rgba(56, 56, 56, 0.75);
`;

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.8;
`;

const StyledTextArea = styled.textarea`
  padding: 5px;
  max-width: 315px;
  background-color: rgb(251, 241, 243);
  border: none;
  border-radius: 8px;
  color: black;

  &:focus {
    outline: none;
    background-color: white;
    border: 2px solid pink;
  }
`;

const Counter = styled.p<{ $error: boolean }>`
  position: relative;
  float: right;
  color: ${(props) => (props.$error ? "red" : "grey")};
`;

const StyledBtn = styled.button`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  align-items: center;
  margin-top: 5px;
  background-color: pink;
  border-radius: 20px;
  border: none;
  padding: 6px 8px;
  font-family: "Nunito";
  font-weight: 600;
  color: white;
  cursor: pointer;
`;
