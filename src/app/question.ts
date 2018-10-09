export interface Question {

  constructor(
    public id: number,
    public qn: string,
    public options: string[],
    public correct: number,
    public answer: number
  ) {}

}
