import { useState } from "react";
import Confetti from "react-confetti";
import { useAddThoughtMutation } from "../api/thoughts";
import styled from "styled-components";
import { useForm, useWatch } from "react-hook-form";

interface FormValues {
  message: string;
}

const NewThought = () => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
    setError,
  } = useForm<FormValues>({ defaultValues: { message: "" } });
  const [confetti, setConfetti] = useState({ showConfetti: false });
  const [addThought] = useAddThoughtMutation();

  const newThought = useWatch({ control, name: "message" });

  const onSubmit = async (data: FormValues) => {
    try {
      await addThought(data).unwrap();
      reset();
      setConfetti({ showConfetti: true });
      setTimeout(() => setConfetti({ showConfetti: false }), 3000);
    } catch (error) {
      console.error(error);
      setError("message", {
        type: "custom",
        message: "Oh no! Something went wrong, please try again",
      });
    }
  };

  return (
    <section>
      {confetti.showConfetti && <Confetti numberOfPieces={200} />}
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledLabel htmlFor="newPost">
            What is making you happy right now?
            <StyledTextArea
              id="newPost"
              placeholder="Type something here.."
              rows={4}
              cols={40}
              {...register("message", {
                required: true,
                minLength: {
                  value: 5,
                  message: "Your message must be at least 5 characters long",
                },
                maxLength: {
                  value: 140,
                  message: "Your message can't be longer than 140 characters",
                },
              })}
            />
            <ErrorText>{errors.message?.message}</ErrorText>
          </StyledLabel>
          <Counter $length={newThought.length}>
            {newThought.length} / 140
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

const ErrorText = styled.p`
  color: red;
`;

const Counter = styled.p<{ $length: number }>`
  position: relative;
  float: right;
  color: ${(props) => (props.$length > 140 ? "red" : "grey")};
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
