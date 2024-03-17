export type CategoryViewModel = {
  slug: string;
  name: string;
  articleSlugs: string[];
};

export const createEmptyCategoryViewModel = (): CategoryViewModel => ({
  slug: '',
  name: '',
  articleSlugs: [],
});
