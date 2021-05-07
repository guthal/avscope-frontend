export const transformGetContents = (data) =>
  data.map((content) => ({
    id: content.id,
    description: content.description,
    title: content.title,
    posterUrl: content.posterUrl,
  }));

export const transformGetContent = (data) => ({
  id: data.id,
  description: data.description,
  title: data.title,
  posterUrl: data.posterUrl,
});
