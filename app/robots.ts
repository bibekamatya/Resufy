import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/builder", "/resume", "/api/"],
      },
    ],
    sitemap: "https://resufy.vercel.app/sitemap.xml",
  };
}
