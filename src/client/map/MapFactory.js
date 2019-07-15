import { ShadeBlendAndConvert } from './pSBC';
import Datamap from 'datamaps';

class MapConst {
    static colorA = "#FF0000";
    static colorB = "#0000FF";
    static maxCount = 100000;
    static borderColor = "#ccc";
}

// class DbDatum {
//     a!: number;
//     b!: number;
//     c!: number;
//     count!: number;
//     province!: string;
// }

// class Tpoic {
//     a!: string;
//     b!: string;
//     c!: string;
//     questoin!: string;
// }

class Datum {
    // a: number;
    // b: number;
    // c: number;
    // count: number;
    // fillColor: string;

    constructor(dbDatum) {
        this.a = dbDatum.a;
        this.b = dbDatum.b;
        this.c = dbDatum.c;
        this.count = dbDatum.count;
        this.fillColor = this.setColor(dbDatum);
    }

    getMixScale = input => Math.sin((input - 0.5) * 3.14) / 2 + 0.5; //make values near 0.5 more sensitive.
    getGreyScale = input => 1 - Math.log(input) / Math.log(MapConst.maxCount); //make values near 0.5 more sensitive.
    // const getGreyScale = (input) => 1 - Math.atan(input / maxCount) / 1.57; //make values near 0.5 more sensitive.

    setColor(datum) {
        let sum = datum.a + datum.b + 1;
        let mix = ShadeBlendAndConvert.pSBC(this.getMixScale(datum.a / sum),
            MapConst.colorA, MapConst.colorB, true); //use linear pSBC mixing
        let shade = ShadeBlendAndConvert.pSBC(this.getGreyScale(sum), mix, false, true); //use linear pSBC mixing
        return shade;
    }
}

export class MapFactory {
    convert(dbData) {
        let data = {};
        for (let i in dbData) {
            data[dbData[i].province] = new Datum(dbData[i]);
        }
        return data;
    }

    makeMap(elementId, data) {
        let mapData = this.convert(data.map);
        // console.log(data);
        const topic = data.topic; //a bug or something
        let map = new Datamap({
            scope: 'usa',
            element: document.getElementById(elementId),
            geographyConfig: {
                highlightBorderColor: '#bada55',
                highlightBorderWidth: 3,
                borderColor: MapConst.borderColor,
                borderWidth: 0.5,
                popupTemplate: function (geography, data) {
                    return '<div class="hoverinfo">' + geography.properties.name
                        + ' <br/> ' + topic.a + ':' + data.a + ' '
                        + ' <br/> ' + topic.b + ':' + data.b + ' '
                        + ' <br/> Total Votes:' + data.count + ' '
                },
            },
            // topic: data.topic,
            data: mapData
        });
        map.labels();
    }
}