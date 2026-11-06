export type CustomerReview = {
  id: string;
  name: string;
  trip: string;
  rating: 1 | 2 | 3 | 4 | 5 | null;
  publicationApproved: boolean;
  paragraphs: string[];
  excerpt: string;
};

// Names, publication permission and five-star ratings confirmed by the client
// through the site owner on 6 November 2026. See docs/REVIEW-SOURCES.md.
export const customerReviews: CustomerReview[] = [
  {
    id: 'katlego-masibe', name: 'Katlego Masibe', trip: 'Mpumalanga', rating: 5, publicationApproved: true,
    paragraphs: [
      'DDTC have taken me to different places, and all I experienced was an exciting journey with a daily breakfast buffet, beautiful accommodation and activities that show you beautiful places like Mpumalanga.',
      'We went to three different waterfalls, water potholes and the Three Rondavels. Transport is always there from the first day to the last day of the trip, making it easier to see different locations. I recommend DDTC for all my travels.',
    ],
    excerpt: 'Transport is always there from the first day to the last day of the trip, making it easier to see different locations. I recommend DDTC for all my travels.',
  },
  {
    id: 'thandiwe', name: 'Thandiwe', trip: 'Botswana & Victoria Falls · 2023', rating: 5, publicationApproved: true,
    paragraphs: [
      'In 2023, I took a road trip to Botswana travelling with DDTC. We visited Victoria Falls via the Zimbabwe side. It was an amazing experience.',
      'The DDTC crew made sure we were well taken care of, from the transportation to the accommodation. Driving around in a foreign country was made to look easy because DDTC took care of that.',
      'A brilliant experience in another country because DDTC made it possible for us. I will definitely be booking my next trip with DDTC again.',
    ],
    excerpt: 'Driving around in a foreign country was made to look easy because DDTC took care of that.',
  },
  {
    id: 'mosikare-shabba', name: 'Mosikare Shabba', trip: 'Cape Town · February 2022', rating: 5, publicationApproved: true,
    paragraphs: [
      'Travelling with DDTC travel agency is one of the best experiences ever. I travelled with this agency to Cape Town, South Africa, in the Western Cape around February 2022 for a vacation. It was three days travelling, with a two-night stay and daily breakfast at the Capetonian Hotel.',
      'We travelled around Cape Town doing activities, including a visit to Stellenbosch. We went wine tasting, took the cableway at Table Mountain and went on a boat cruise.',
      "With DDTC, you will enjoy more than you expect, and you won't regret choosing them for vacations or baecations. Exploring Cape Town once more with DDTC is one of my best wishes for the future.",
    ],
    excerpt: 'We went wine tasting, took the cableway at Table Mountain and went on a boat cruise.',
  },
  {
    id: 'mrs-van-wyk', name: 'Mrs Van Wyk', trip: 'Tour with DDTC', rating: 5, publicationApproved: true,
    paragraphs: [
      'Our tour with Diutlwileng was quite an adventure and a nature experience. We felt like family and very safe. In short, we were home away from home. Thank you very much, and we hope to use your service again.',
    ],
    excerpt: 'We felt like family and very safe. In short, we were home away from home.',
  },
  {
    id: 'katso-manyathela', name: 'Katso Manyathela', trip: 'South African adventures', rating: 5, publicationApproved: true,
    paragraphs: [
      'If you want to travel and explore adventure around South Africa 🇿🇦, DDTC is the best travel agent ever. 👊❤️',
      "Trips include nightlife entertainment at top-class lounges 💃, a day at the beach, hiking, food and beautiful hotels. WOW! The list is endless. I can't wait for the next trip! 💃",
    ],
    excerpt: "The list is endless. I can't wait for the next trip! 💃",
  },
];

export const publishedReviews = customerReviews.filter((review) => review.publicationApproved);
