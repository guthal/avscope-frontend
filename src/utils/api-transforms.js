import { ENDPOINTS } from "../configs/api";

export const transformGetContents = (data) => {
  const contentData = [];
  const seriesData = [];
  data.forEach((datum) => {
    const content = {
      id: datum.id,
      description: datum.description,
      name: datum.title,
      carouselUrl:
        datum.thumbnail.pic2030 ||
        "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
      imageUrl:
        datum.thumbnail.picsq ||
        "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
      genres: datum.genres || [],
      seriesID: datum.seriesId,
    };

    if (datum.seriesId) seriesData.push(content);
    else contentData.push(content);
  });

  return {
    contents: contentData,
    series: seriesData,
  };
};

export const transformGetSeriesContents = (data) =>
  data.map((datum) => ({
    id: datum.id,
    description: datum.description,
    name: datum.title,
    carouselUrl:
      datum.thumbnail.pic2030 ||
      "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
    imageUrl:
      datum.thumbnail.picsq ||
      "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
    genres: datum.genres || [],
    seriesID: datum.seriesId,
    seriesInfo: datum.contentSeriesInfo,
  }));

export const transformGetContent = (data) => ({
  id: data.id,
  description: data.description,
  name: data.title,
  posterUrl:
    data.thumbnail.picsq ||
    "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
  purchase_type: data.type,
  price: data.price,
  genres: data.genres || [],
  cast: data.cast || [],
  rating: data.rating,
  duration: data.duration,
  seriesID: data.seriesId,
  seriesInfo: data.contentSeriesInfo,
});

export const transformGetHistoryData = (data) => {
  const currentDate = new Date();
  const returnData = data.map((historyData) => {
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

export const transformGetUserContentPurchases = (data) =>
  data.map((datum) => ({
    userId: datum.userId,
    purchaseDate: datum.purchaseDate,
    contentId: datum.contentId,
    purchaseId: datum.purchaseId,
    purchaseType: datum.purchaseType,
    purchasePrice: datum.purchasePrice,
    contentTitle: datum.contentTitle,
    thumbnail: datum.thumbnail,
  }));
