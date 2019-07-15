import mysql from 'mysql';
import { MapDataIn, IMapData } from '../../shared/DbMapData';
import { TopicIn, ITopic } from '../../shared/DbTopic';
import { TopicFactory } from '../Models/TopicFactory';
import { DataSetIn } from '../../shared/DataSet';

class Config {
    host = 'localhost';
    user = 'root';
    password = 'password';
    database = "glowpoll";

    static dataTblName = "map";
    static topicTblName = "topic";
    // debug = false;              //true;
    // connectionLimit = 2;        // Default value is 10.
    // waitForConnections = true;  // Default value.
    // queueLimit = 0;             // Unlimited - default value.
}

export class Database {
    connection: any;
    topicFactory: TopicFactory;

    constructor() {
        this.connection = mysql.createConnection(new Config());
        this.topicFactory = new TopicFactory();
    }
    connect() {
        this.connection.connect((err: { message: string; }) => {
            if (err) {
                return console.error('Error connecting database: ' + err.message);
            }
            console.log('Connected to the MySQL server.');
        });
    }
    query(sql: string, ...args: any[]): any {
        return new Promise((resolve, reject) => {
            console.log(sql);
            console.log(args);
            this.connection.query(sql, args, (err: any, rows: any) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    close = () => this.connection.end();

    CreateTopicTable(): any {
        const cols = [
            `id INT NOT NULL AUTO_INCREMENT`,
            `timestamp TIMESTAMP`,
            `lang VARCHAR(15)`,
            `question TEXT`,
            `a VARCHAR(255)`,
            `b VARCHAR(255)`,
            `c VARCHAR(255)`,
            `PRIMARY KEY (id)`,
        ];

        //Create database
        return this.query(`CREATE TABLE ${Config.topicTblName} (${cols})`, []);
    }
    getQuestionsByPage(count: number, offset: number): any {
        let sql = `SELECT question,id FROM ${Config.topicTblName} LIMIT ? OFFSET ?;`;
        return this.query(sql, count, offset);
    }
    getTopicById(topicId: number): any {
        let sql = `SELECT * FROM ${Config.topicTblName} WHERE id = ?`;
        return this.query(sql, topicId);
    }
    AddOrUpdateTopic(topic: ITopic) {
        if (!topic || topic.Topic.length < 1) return;
        const sql =
            `INSERT INTO ${Config.topicTblName} (${TopicIn.Schema}) 
                VALUES ?
            ON DUPLICATE KEY UPDATE
                question = VALUES(question),
                lang = VALUES(lang),
                a = VALUES(a), 
                b = VALUES(b),
                c = VALUES(c);`;
        return this.query(sql, [Object.values(topic.Topic)]);
    }

    CreateDateTable(): any {
        const cols = [
            `id INT NOT NULL AUTO_INCREMENT`,
            `timestamp TIMESTAMP`,
            `topicId INT(11)`,
            `nation VARCHAR(3)`,
            `province VARCHAR(15)`,
            `count INT(11)`,
            `a INT(11)`,
            `b INT(11)`,
            `c INT(11)`,
            `PRIMARY KEY (id)`,
            `CONSTRAINT uniq UNIQUE (topicId,nation,province)`
        ];

        //Create database
        return this.query(`CREATE TABLE ${Config.dataTblName} (${cols})`, []);
    }
    getMapDataByTopicId(topicId: number): any {
        let sql = `SELECT * FROM ${Config.dataTblName} WHERE topicId = ?`;
        // console.log("topicId=" + topicId);
        return this.query(sql, topicId);
    }
    AddOrUpdateMap(data: IMapData) {
        // const sql = `INSERT INTO ${dataTbl.Name} (${Object.keys(entry).join()})
        // VALUES ?`;
        if (!data || data.Map.length < 1) return;
        const sql =
            `INSERT INTO ${Config.dataTblName} (${MapDataIn.Schema}) 
                VALUES ?
            ON DUPLICATE KEY UPDATE
                a = VALUES(a), 
                b = VALUES(b),
                c = VALUES(c),
                count = VALUES(count);`;
        return this.query(sql, Object.values(data.Map));
    }

    UpdateDataSet(dataset: DataSetIn) {
        this.AddOrUpdateTopic(dataset).then((res: any) => console.log("Number of topic record edited: " + res.affectedRows));
        this.AddOrUpdateMap(dataset).then((res: any) => console.log("Number of map records edited: " + res.affectedRows));
    }
}


// const db = new Database();
// // db.CreateTopicTable();
// // db.CreateDateTable();

// var fs = require('fs');
// const path = require('path');

// var dir = './src/server/data/';
// var files = fs.readdirSync(dir);

// files.forEach((file: any) => {
//     file = path.resolve(dir, file);
//     console.log(file);
//     var contents = fs.readFileSync(file);
//     var dataset = JSON.parse(contents);
//     db.UpdateDataSet(dataset);
// });
// db.close();