import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Thought {
  _id: string;
  message: string;
  hearts: number;
  createdAt: string;
  __v: number;
}

type ThoughtsResponse = Thought[];

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app",
  }),
  tagTypes: ["Thought"],
  endpoints: (build) => ({
    getThoughts: build.query<ThoughtsResponse, void>({
      query: () => "/thoughts",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Thought" as const, _id })),
              { type: "Thought", id: "LIST" },
            ]
          : [{ type: "Thought", id: "LIST" }],
    }),
    addThought: build.mutation<Thought, Partial<Thought>>({
      query: (body) => ({
        url: "/thoughts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Thought", id: "LIST" }],
    }),
    addLike: build.mutation<void, Pick<Thought, "_id"> & Partial<Thought>>({
      query: ({ _id, ...patch }) => ({
        url: `/thoughts/${_id}/like`,
        method: "POST",
        body: patch,
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: "Thought", _id }],
    }),
  }),
});

export const {
  useGetThoughtsQuery,
  useAddThoughtMutation,
  useAddLikeMutation,
} = api;
