import NewThought from "./NewThought";
import { useAddLikeMutation, useGetThoughtsQuery } from "../api/thoughts";
import { LoadingSpinner } from "../utils/LoadingSpinner";
import { SingleThought } from "./SingleThought";

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
    return <LoadingSpinner />;
  }

  if (isError) {
    throw new Error("Could not fetch thoughts");
  }

  if (!thoughts) {
    throw new Error("Thoughts is undefined");
  }

  return (
    <>
      <section>
        <NewThought />
      </section>
      <section className="feedContainer">
        {thoughts.map((thought) => {
          return (
            <SingleThought
              key={thought._id}
              thought={thought}
              handleLike={handleLike}
            />
          );
        })}
      </section>
    </>
  );
};

export default Feed;
