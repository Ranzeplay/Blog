export class Comment {
  constructor(
    public content: string,
    public time: Date,
    public author: string,
    public emailAddress: string
  ) {}
}
