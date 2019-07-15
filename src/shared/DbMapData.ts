export class DbMapData {
    id?: number;
    topicId: number;
    count: number | undefined;
    nation: string | undefined;
    province: string | undefined;
    a: number | undefined;
    b: number | undefined;
    c: number | undefined;

    constructor(topicId: number, nation: string, prov: string, a: number, b: number,
        c: number, cnt: number) {
        this.topicId = topicId;
        this.nation = nation;
        this.province = prov;
        this.a = a;
        this.b = b;
        this.c = c;
        this.count = cnt;
    }
}

export interface IMapData {
    Map: any[]
}

export class MapDataIn implements IMapData {
    static Schema = "topicId, nation, province, count, a, b, c";
    Map: any[];

    constructor() {
        this.Map = [];
    }

    Add(topicId: number, nation: string, prov: string, cnt: number, a: number, b: number, c: number) {
        this.Map.push([topicId, nation, prov, cnt, a, b, c]);
    }
}