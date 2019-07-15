export interface ITopic {
    Topic: any[];
}

export class TopicIn implements ITopic {
    static Schema = "question, a, b, c, lang, id";
    Topic: any[];

    constructor(question: string, a: string, b: string, c: string, lang: string, srcId?: number) {
        this.Topic = [question, a, b, c, lang];
    }
}
