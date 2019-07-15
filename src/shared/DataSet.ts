import { ITopic, TopicIn } from './DbTopic'
import { MapDataIn, IMapData } from './DbMapData';

export class DataSet {
    Topic: TopicIn;
    Map: MapDataIn;

    constructor(topic: TopicIn, map: MapDataIn) {
        this.Topic = topic;
        this.Map = map;
    }
}

export class DataSetIn implements ITopic, IMapData {
    Topic: any[];
    Map: any[];

    constructor(topic: TopicIn, map: MapDataIn) {
        this.Topic = topic.Topic;
        this.Map = map.Map;
    }
}