import axios from "axios";

export const getContents = (a, b) => {
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

  // eslint-disable-next-line
  return axios.get("/cdacdaved").then((res) => res.data);
};
