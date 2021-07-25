export const AVSCOPE_ADS = [
  {
    name: "Cadbury",
    img_url: {
      landscape: "https://i.ytimg.com/vi/tQhkbWRH9X0/maxresdefault.jpg",
      portrait:
        "https://www.cadbury.com.au/media/wysiwyg/MONDOM3674_CaramilkMarble_MobileBanner_640x700.png",
      square:
        "https://pbs.twimg.com/profile_images/1381550902587326467/vb1EW6Sh.png",
    },
    video_id: "",
    link: "https://www.cadburygifting.in",
    amount: 600,
    meta: {
      mame: "Cadbury",
    },
  },
  {
    name: "Nike",
    img_url: {
      landscape:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35463b103211209.5f8d57c277188.jpg",
      portrait:
        "https://i.pinimg.com/236x/35/6c/65/356c6536455a03b9b8049a68accdfd0e--nike-running-motivation-nike-running-quotes.jpg",
      square:
        "https://www.marketing91.com/wp-content/uploads/2020/06/Nike-Advertising-Introduction.jpg",
    },
    video_id: "",
    link: "https://www.nike.com/in/",
    amount: 800,
    meta: {
      mame: "Nike",
    },
  },
  {
    name: "Kanti Sweets",
    img_url: {
      landscape:
        "https://cdn.urbanpiper.com/media/gallery_images/Kanti-Banner-2_COMPRESSED_1.png",
      portrait:
        "https://cdn.urbanpiper.com/media/gallery_images/2018/08/29/A3_poster-19-06-2018_COMPRESSED.jpg",
      square:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC2EwDv84c_FCpINOtTp1vMc26aofPrFKn4w&usqp=CAU",
    },
    video_id: "",
    link: "https://www.kantisweets.com/",
    amount: 300,
    meta: {
      name: "Kanti Sweets",
    },
  },
];

export const PRIORITIZED_ADS = AVSCOPE_ADS.sort((a, b) => {
  if (a.amount < b.amount) return 1;
  else if (a.amount > b.amount) return -1;
  return 0;
}).map((ad) => ({
  name: ad.name,
  carouselUrl: ad.img_url.landscape,
  posterUrl: ad.img_url.portrait,
  url: ad.link,
  isExternalUrl: true,
}));

export const getRandomAd = () => {
  var cumulativeAmounts = [];

  for (let i = 0; i < AVSCOPE_ADS.length; i++)
    cumulativeAmounts[i] =
      AVSCOPE_ADS[i].amount + (cumulativeAmounts[i - 1] || 0);

  var random = Math.random() * cumulativeAmounts[cumulativeAmounts.length - 1];

  for (let i = 0; i < cumulativeAmounts.length; i++)
    if (cumulativeAmounts[i] > random) return AVSCOPE_ADS[i];
};
