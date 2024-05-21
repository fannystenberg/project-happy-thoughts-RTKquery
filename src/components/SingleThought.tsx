import styled from "styled-components";
import { Thought } from "../api/thoughts";
import { formatDistanceToNow, parseISO } from "date-fns";

interface UpdateLikeProps {
  thought: Thought;
  handleLike: (thoughtId: string, hearts: number) => void;
}

export function SingleThought({ thought, handleLike }: UpdateLikeProps) {
  const date = parseISO(thought.createdAt);
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });
  return (
    <ContainerWrapper>
      <Text>{thought.message}</Text>
      <BottomWrapper>
        <div>
          <LikeBtn
            type="button"
            title="Like this post"
            $hasLikes={thought.hearts > 0}
            onClick={() => handleLike(thought._id, thought.hearts)}
          >
            ❤️
          </LikeBtn>
          <span>x {thought.hearts}</span>
        </div>
        <p>{formattedDate}</p>
      </BottomWrapper>
    </ContainerWrapper>
  );
}

const ContainerWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  width: 320px;
  padding: 12px;
  background-color: white;
  opacity: 0.9;
  border: 1px solid rgb(56, 56, 56);
  border-radius: 25px;
  box-shadow: 3x 3px 0px 1px rgba(56, 56, 56, 0.75);
  -webkit-box-shadow: 3px 3px 0px 1px rgba(56, 56, 56, 0.75);
  -moz-box-shadow: 3px 3px 0px 1px rgba(56, 56, 56, 0.75);
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: grey;
`;

const Text = styled.p`
  margin: 5px 5px 10px 5px;
  max-width: 100%;
  overflow-wrap: break-word;
  height: auto;
  font-size: 14px;
`;

const LikeBtn = styled.button<{ $hasLikes: boolean }>`
  border: none;
  border-radius: 50%;
  padding: 5px 6px;
  background-color: ${(props) => props.$hasLikes && "pink"};
`;
