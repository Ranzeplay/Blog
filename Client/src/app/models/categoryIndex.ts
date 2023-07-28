export class CategoryIndex {
  constructor(public name: string, public count: number) {}

  public static newEmpty(): CategoryIndex {
    return new CategoryIndex('', 0);
  }
}
