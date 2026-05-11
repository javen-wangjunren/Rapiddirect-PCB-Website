export type WhyChooseUsAdvantage = {
  icon_url?: string;
  title: string;
  highlight: string;
  desc: string;
};

export type WhyChooseUsStat = {
  number: string;
  label: string;
};

export type WhyChooseUsContent = {
  title: string;
  desc: string;
  advantages: WhyChooseUsAdvantage[];
  stats_bar: {
    stats: WhyChooseUsStat[];
    button: { text: string; href: string };
  };
};
