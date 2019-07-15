export class TopicFactory {
    TopicCount: number;

    constructor() {
        this.TopicCount = 1; // TODO: this should come from a DB call
    }

    GetRandom(): number {
        return Math.ceil(Math.random() * this.TopicCount);
    }
}
