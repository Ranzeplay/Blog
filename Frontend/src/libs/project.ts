export type ProjectViewModel = {
  id: string;
  slug: string;
  name: string;
  description: string;
  introduction: string;
  iconUrl: string;
  headImageUrl: string;
  siteUrl: string;
  externalUrls: Record<string, string>;
};
