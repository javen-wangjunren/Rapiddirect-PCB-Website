export type ReviewCard = {
  image_url?: string;
  customer_avatar_url?: string;
  customer_name: string;
  customer_industry: string;
  title: string;
  content: string;
};

export type ReviewsContent = {
  title: string;
  desc: string;
  reviews: ReviewCard[];
  cta: {
    text: string;
    href: string;
  };
};
