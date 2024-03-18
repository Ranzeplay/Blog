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


export const createEmptyProjectViewModel = (): ProjectViewModel => ({
  id: '',
  slug: '',
  name: '',
  description: '',
  introduction: '',
  iconUrl: '',
  headImageUrl: '',
  siteUrl: '',
  externalUrls: {},
});