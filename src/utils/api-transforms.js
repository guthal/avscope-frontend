import { EXPIRY_TIMING } from "../configs/app";

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
      isAvailable: datum.isAvailable,
      purchaseType: datum.type,
      price: datum.price,
      weeks: datum.weeks,
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
      name: datum.seriesName,
      seasonId: season.seasonId,
      carouselUrl:
        season.thumbnail ||
        "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
      imageUrl:
        season.thumbnail ||
        "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png",
      description: season.description,
      seasonNo: season.seasonNo,
      isAvailable: season.isAvailable,
    }));

    return {
      seriesName: datum.seriesName,
      seriesID: datum.seriesId,
      seasons,
      creatorID: datum.userId,
    };
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
  genres: data.genre || [],
  cast: data.cast || [],
  rating: data.rating,
  duration: data.duration,
  seriesID: data.seriesId,
  seriesInfo: data.contentSeriesInfo,
  contentURL: data.contentUrl,
});

export const transformGetHistoryData = data => {
  const currentDate = new Date();
  const returnData = data.map(historyData => {
    let isTicketValid;
    const expiryDate = new Date(historyData.purchaseDate);
    const purchaseDate = new Date(historyData.purchaseDate);
    if (historyData.purchaseType === "r") {
      expiryDate.setDate(purchaseDate.getDate() + EXPIRY_TIMING.RENT_DAYS);
      isTicketValid = currentDate <= expiryDate;
    }
    if (historyData.purchaseType === "w") {
      expiryDate.setHours(purchaseDate.getHours() + EXPIRY_TIMING.WEEKLY_HOURS);
      isTicketValid = currentDate <= expiryDate;
    }
    if (historyData.purchaseType === "b") {
      isTicketValid = true;
    }
    return {
      purchaseDate: purchaseDate,
      expiryDate: expiryDate,
      contentId: historyData.productId,
      purchasePrice: historyData.purchasePrice,
      purchaseType: historyData.purchaseType,
      ticketId: historyData.purchaseId,
      name: historyData.contentTitle,
      posterUrl: historyData.thumbnail,
      isTicketValid: isTicketValid,
    };
  });

  return returnData.sort((a, b) => {
    if (a.purchaseDate < b.purchaseDate) return 1;
    else if (a.purchaseDate > b.purchaseDate) return -1;
    return 0;
  });
};

export const transformGetUserContentPurchase = data => {
  const currentDate = new Date();

  const mostRecentPurchase = Math.max(
    ...data.map(userPurchase => new Date(userPurchase.purchaseDate))
  );
  const mostRecentPurchaseContent = data.find(
    userPurchase =>
      new Date(userPurchase.purchaseDate).valueOf() === mostRecentPurchase
  );

  let isTicketValid = false;
  const expiryDate = new Date(mostRecentPurchaseContent.purchaseDate);
  const purchaseDate = new Date(mostRecentPurchaseContent.purchaseDate);

  if (mostRecentPurchaseContent.purchaseType === "r") {
    expiryDate.setDate(purchaseDate.getDate() + EXPIRY_TIMING.RENT_DAYS);

    isTicketValid = currentDate <= expiryDate;
  }

  if (mostRecentPurchaseContent.purchaseType === "w") {
    expiryDate.setHours(purchaseDate.getHours() + EXPIRY_TIMING.WEEKLY_HOURS);
    isTicketValid = currentDate <= expiryDate;
  }

  if (mostRecentPurchaseContent.purchaseType === "b") isTicketValid = true;

  return {
    userId: mostRecentPurchaseContent.userId,
    purchaseDate: mostRecentPurchaseContent.purchaseDate,
    productId: mostRecentPurchaseContent.productId,
    purchaseId: mostRecentPurchaseContent.purchaseId,
    purchaseType: mostRecentPurchaseContent.purchaseType,
    purchasePrice: mostRecentPurchaseContent.purchasePrice,
    contentTitle: mostRecentPurchaseContent.contentTitle,
    thumbnail: mostRecentPurchaseContent.thumbnail,
    isTicketValid,
  };
};

export const transformGetCreators = data =>
  data.map(creator => ({
    id: creator.userId,
    email: creator.email,
    name: `${creator.fname} ${creator.lname}`,
    phone: creator.phone,
    address: creator.address,
    office: creator.office,
    zip: creator.zip,
    city: creator.city,
    state: creator.state,
  }));

export const transformPostLoginResponse = data => {
  const name = data.fname + " " + data.lname;

  return {
    userId: data.userId,
    username: data.username,
    name: name,
    utype: data.utype,
    userDate: data.date,
    userHistory: data.history,
  };
};

export const transformPostSignupResponse = data => {
  const name = data.fname + " " + data.lname;

  return {
    userId: data.userId,
    username: data.username,
    name: name,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    utype: data.utype,
    userDate: data.date,
    userHistory: data.history,
  };
};

export const transformGetVerifyUser = data => {
  const name = data.fname + " " + data.lname;

  return {
    userId: data.userId,
    username: data.username,
    name: name,
    utype: data.utype,
    userDate: data.date,
    userHistory: data.history,
    userWatchlist: data.watchlist,
  };
};

export const transformPostGetContentsRevenue = data =>
  data.map(datum => ({
    contentType: datum.contentType,
    creatorID: datum.creatorId,
    purchaseType: datum.purchaseType,
    revenue: datum.totalRevenue,
    earnings: datum.earnings,
    contentTitle: datum.contentTitle,
    purchaseCount: datum.purchaseCount,
  }));

export const transformPostPayCreatorEarning = data => {
  /**
   * Rewrite checking what response comes here
   */
  return data;
};

export const transformGetWatchlist = data => {
  const returnData = data.map(watchlistData => {
    return {
      contentId: watchlistData.contentId,
      contentTitle: watchlistData.contentTitle,
      thumbnail: watchlistData.thumbnail,
    };
  });
  return returnData;
};

export const transformGetStaticPage = data => {
  return {
    head: data.title,
    body: data.description,
  };
};
