import axios from "axios";

export const getContents = () => {
  // TODO: Delete statement below post API implementation
  return Promise.resolve([
    {
      contentId: "1",
      contentName: "Batman",
      contentDescription: "I'm Batman",
      contentStar: "Batman",
    },
    {
      contentId: "2",
      contentName: "Joker",
      contentDescription: "?? This guy had no popular quotes",
      contentStar: "Joker",
    },
    {
      contentId: "3",
      contentName: "Dark Knight",
      contentDescription: "Why so serious?? :)",
      contentStar: "Joker",
    },
  ]);

  return axios.get("/").then((res) => res.data);
};
