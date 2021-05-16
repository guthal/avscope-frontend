import { ENDPOINTS } from "../configs/api";

export const transformGetContents = data => {
  const contentData = [];
  const seriesData = [];
  data.forEach(datum => {
    const content = {
      id: datum.id,
      description: datum.description,
      name: datum.title,
      carouselUrl:
        datum.thumbnail ||
        "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
      imageUrl:
        datum.thumbnail ||
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

export const transformGetAllSeries = data =>
  data.map(datum => {
    const seasons = datum.seasons.map(season => ({
      id: season.startContentId,
      name: data.seriesName,
      carouselUrl:
        season.thumbnail ||
        "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
      imageUrl:
        season.thumbnail ||
        "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
      description: season.description,
      seasonNo: season.seasonNo,
    }));
    return { seriesName: datum.seriesName, seriesID: datum.seriesId, seasons };
  });

export const transformGetSeriesContents = data =>
  data.map(datum => ({
    id: datum.id,
    description: datum.description,
    name: datum.title,
    carouselUrl:
      datum.thumbnail ||
      "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
    imageUrl:
      datum.thumbnail ||
      "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
    genres: datum.genres || [],
    seriesID: datum.seriesId,
    seriesInfo: datum.contentSeriesInfo,
  }));

export const transformGetSeries = data => ({
  title: data.seriesName,
  seasons: data.seasons,
  id: data.seriesId,
  rating: data.rating,
});

export const transformGetContent = data => ({
  id: data.id,
  description: data.description,
  name: data.title,
  posterUrl:
    data.thumbnail ||
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
      posterUrl: historyData.thumbnail,
      isTicketValid: isTicketValid,
    };
  });
  return returnData;
};

export const transformGetUserContentPurchases = data =>
  data.map(datum => ({
    userId: datum.userId,
    purchaseDate: datum.purchaseDate,
    contentId: datum.contentId,
    purchaseId: datum.purchaseId,
    purchaseType: datum.purchaseType,
    purchasePrice: datum.purchasePrice,
    contentTitle: datum.contentTitle,
    thumbnail: datum.thumbnail,
  }));

export const transformGetCreators = data =>
  data.map(creator => ({
    id: creator.userId,
    email: creator.email,
    name: creator.user,
    phone: creator.phone,
    address: creator.address,
    office: creator.office,
    zip: creator.zip,
    city: creator.city,
    state: creator.state,
  }));

export const transformPostLoginResponse = data => {
  /**
   * Will add response from POST login ENDPOINT here
   */
  return {
    userId: data.userId,
    username: data.username,
    utype: data.utype,
    userDate: data.date,
    userHistory: data.history,
  };
};

export const transformPostSignupResponse = data => {
  /**
   * Will add response from POST signup ENDPOINT here
   */
  return {
    userId: data.userId,
    userFName: data.fname,
    userLName: data.lname,
    userName: data.username,
    userDate: data.date,
    utype: data.utype,
  };
};
