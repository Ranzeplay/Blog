export class TagIndex {
  constructor(public name: string, public count: number) {}

  public static newEmpty(): TagIndex {
    return new TagIndex('', 0);
  }
}
