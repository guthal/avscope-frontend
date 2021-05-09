import { HOME_PAGE } from "../configs/app";

export const transformGetContents = (data) =>
  data.map((content) => ({
    id: content.id,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." ||
      content.description,
    name: content.title,
    carouselUrl:
      HOME_PAGE.CAROUSEL_IMAGES[Math.floor(Math.random() * 3)] ||
      content.thumbnail.pic2030 ||
      "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
    imageUrl:
      HOME_PAGE.CAROUSEL_IMAGES[Math.floor(Math.random() * 3)] ||
      content.thumbnail.picsq ||
      "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
    genres: content.genres || [],
  }));

export const transformGetContent = (data) => ({
  id: data.id,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." ||
    data.description,
  name: data.title,
  posterUrl:
    HOME_PAGE.CAROUSEL_IMAGES[0] ||
    data.thumbnail.picsq ||
    "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
  purchase_type: data.type,
  price: data.price,
  genres: data.genres || ["Action", "Thirller", "Spy"],
  cast: data.cast || [],
  rating: data.rating || "8.4",
  duration: data.duration || "2h 35m",
});

export const transformGetHistoryData = (data) => {
  return data.map((history) => {
    const isTicketValid = new Date() <= history.endDate;
    return {
      purchaseDate: history.startDate,
      ticketId: history.ticketId,
      name: history.name,
      posterUrl: history.posterUrl,
      isTicketValid: isTicketValid,
    };
  });
};
