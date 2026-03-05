/** Public admin profile info (safe for client). Passwords live in env. */
export const ADMIN_PROFILES = [
  {
    id: "lakshay" as const,
    name: "Lakshay Garg",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D5603AQGCeJ0CovLBEw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1726515273375?e=1773878400&v=beta&t=as-mkiQUfStEWGrI5ZHfzmb2WV9ocoWPyN9gsAEdU2Q",
  },
  {
    id: "ben" as const,
    name: "Ben Shlemis",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D5603AQGHttE6XwHUAQ/profile-displayphoto-shrink_200_200/B56ZNhIyqXGkAc-/0/1732501515975?e=1773878400&v=beta&t=lruKPBdZl_ljDyTPU1RsAHulfh3OnRREyoB5IFdZaHQ",
  },
  {
    id: "kayvan" as const,
    name: "Kayvan Danesh",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D5603AQGtHoskkcrFHg/profile-displayphoto-scale_200_200/B56ZoPlL.AIYAc-/0/1761197998415?e=1773878400&v=beta&t=f43MYpnM2Ij8qDttfWNOliE3LRmoiiPmcJY6RrCkHug",
  },
] as const;

export type AdminId = (typeof ADMIN_PROFILES)[number]["id"];
