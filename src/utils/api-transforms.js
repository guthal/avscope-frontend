import { HOME_PAGE } from "../configs/app";
import { ENDPOINTS } from "../configs/api";

export const transformGetContents = data =>
  data.map(content => ({
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

export const transformGetContent = data => ({
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

export const transformGetHistoryData = data => {
  const currentDate = new Date();
  const returnData = data.map(historyData => {
    var isTicketValid;
    const expiryDate = new Date(historyData.purchaseDate);
    const purchaseDate = new Date(historyData.purchaseDate);
    if (historyData.purchaseType === "r") {
      expiryDate.setDate(purchaseDate.getDate() + ENDPOINTS.RENT_EXPIRY_DAYS);
      isTicketValid = currentDate <= expiryDate;
    }
    if (historyData.purchaseType === "w") {
      expiryDate.setHours(
        purchaseDate.getHours() + ENDPOINTS.WEEKLY_EXPIRY_HOURS
      );
      isTicketValid = currentDate <= expiryDate;
    }
    return {
      purchaseDate: purchaseDate,
      purchasePrice: historyData.purchasePrice,
      purchaseType: historyData.purchaseType,
      ticketId: historyData.purchaseId,
      name: historyData.contentTitle,
      posterUrl: historyData.thumbnail.picsq,
      isTicketValid: isTicketValid,
    };
  });
  return returnData;
};

export const transformPostLoginResponse = data => {
  /**
   * Will add response from POST login ENDPOINT here
   */
};

export const transformPostSignupResponse = data => {
  /**
   * Will add response from POST signup ENDPOINT here
   */
};
