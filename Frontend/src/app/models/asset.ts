export class Asset {
  constructor(
    public name: string,
    public blob: Blob,
    public contentType: string
  ) {}
}
