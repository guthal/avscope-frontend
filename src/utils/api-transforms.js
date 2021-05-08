export const transformGetContents = (data) =>
  data.map((content) => ({
    id: content.id,
    description: content.description,
    name: content.name,
    posterUrl: content.posterUrl,
  }));

export const transformGetContent = (data) => ({
  id: data.id,
  description: data.description,
  name: data.name,
  posterUrl: data.posterUrl,
});
