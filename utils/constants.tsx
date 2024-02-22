interface WebSetting {
  bannerImage: string;
  bannerContain: string;
  navBackgroundColour: string;
}

interface Venue {
  webSetting: WebSetting;
}

export const venue: Venue = {
  webSetting: {
    bannerImage: "/img/brands/bg-image.jpeg",
    bannerContain: "/img/brands/bg-contain.png",
    navBackgroundColour: "#4F372F",
  },
};
