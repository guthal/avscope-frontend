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
      seriesID: datum.seriesID,
    };

    if (datum.seriesID) seriesData.push(content);
    else contentData.push(content);
  });

  return {
    contents: contentData,
    series: seriesData,
  };
};

export const transformGetSeries = (data) =>
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
    seriesID: datum?.seriesID,
    seriesInfo: data.contentSeriesInfo,
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
  seriesID: data.seriesID,
  seriesInfo: data.contentSeriesInfo,
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
