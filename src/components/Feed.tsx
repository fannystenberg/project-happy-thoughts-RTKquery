import NewThought from "./NewThought";
import { useAddLikeMutation, useGetThoughtsQuery } from "../api/thoughts";
import { SkeletonLoader } from "../utils/SkeletonLoader";
import { SingleThought } from "./SingleThought";
import styled from "styled-components";

const LoadingAnimation = () => {
  return (
    <LoadingContainer>
      <SkeletonLoader mode="rectangular" height="180px" width="320px" />
      <SkeletonLoader mode="rectangular" height="90px" width="320px" />
      <SkeletonLoader mode="rectangular" height="90px" width="320px" />
      <SkeletonLoader mode="rectangular" height="90px" width="320px" />
      <SkeletonLoader mode="rectangular" height="90px" width="320px" />
      <SkeletonLoader mode="rectangular" height="90px" width="320px" />
    </LoadingContainer>
  );
};

const Feed = () => {
  const { isLoading, isError, data: thoughts } = useGetThoughtsQuery();
  const [addLike] = useAddLikeMutation();

  const handleLike = async (thoughtId: string, like: number) => {
    const updateAmount = like + 1;
    try {
      await addLike({ _id: thoughtId, hearts: updateAmount }).unwrap();
    } catch (error) {
      console.log(error);
      alert("Oh no! Something went wrong, please try again");
    }
  };

  if (isLoading) {
    return <LoadingAnimation />;
  } else if (isError) {
    throw new Error("Could not fetch thoughts");
  } else if (!thoughts) {
    throw new Error("Thoughts is undefined");
  }

  return (
    <Wrapper>
      <NewThought />
      <FeedContainer>
        {thoughts.map((thought) => {
          return (
            <SingleThought
              key={thought._id}
              thought={thought}
              handleLike={handleLike}
            />
          );
        })}
      </FeedContainer>
    </Wrapper>
  );
};

export default Feed;

const LoadingContainer = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

const Wrapper = styled.main`
  margin: 0 auto;
  padding: 0;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeedContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  height: 57vh;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;
