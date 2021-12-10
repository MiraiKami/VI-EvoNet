import express from 'express';
import path from "path";
import csv from "csv-parser";
import * as fs from "fs";
import {mapStrMapToJSON} from "../utils/JSONUtils";
import createError from "http-errors";
var router = express.Router();

var ressources_path = path.join(path.resolve(__dirname, '../..'), 'resources');

/* GET home page. */
router.get('/', function(req: any, res: { render: (arg0: string, arg1: { title: string; }) => void; }, next: any) {
    res.render('index', { title: 'Express' });
});

router.get('/ong/share/:year', function(req: any, res: any, next: any) {
    const year: number = +req.params.year;
    const results: Array<any> = [];
    let total: number = 0;
    fs.createReadStream(path.join(ressources_path, 'number-of-internet-users-by-country.csv'))
        .pipe(csv())
        .on('data', (data: any) => {
            if (year === +data.Year){
                let countryName = data.Entity;
                let countryUsers = +data['Number of internet users (OWID based on WB & UN)'];
                total += countryUsers;
                results.push({country: countryName, users: countryUsers});
            }
        })
        .on('end', () => {
            if (results.length !== 0){
                results.push({country: 'total', users: total});
                res.status(200).json(results);
            } else {
                res.status(400).json('Data for year ' + year + ' could not be found');
            }
        });
});

router.get('/gov/:country/mobile', function(req: any, res: any, next: any) {
    const country: string = req.params.country.toLowerCase();
    let results: Map<string, Map<string, number>> = new Map();
    fs.createReadStream(path.join(ressources_path, 'mobile-cellular-subscriptions-per-100-people.csv'))
        .pipe(csv())
        .on('data', (data: any) => {
            if (data.Entity.toLowerCase() === country) {
                let year = data.Year;
                let percentUsers = +data['Mobile cellular subscriptions (per 100 people)'];
                if (results.get(year) === undefined) {
                    results.set(year, new Map());
                }
                results.get(year).set('percentUsers', percentUsers);
            }
        })
        .on('end', () => {
            if (results.size !== 0) {
                res.status(200).json(mapStrMapToJSON(results));
            } else {
                next(createError(404));
            }
        });
});

router.get('/gov/:country/broadband', function(req: any, res: any, next: any) {
    const country: string = req.params.country.toLowerCase();
    let results: Map<string, Map<string, number>> = new Map();
    fs.createReadStream(path.join(ressources_path, 'broadband-penetration-by-country.csv'))
        .pipe(csv())
        .on('data', (data: any) => {
            if (data.Entity.toLowerCase() === country){
                let year = data.Year;
                let broadbandPenetration = +data['Fixed broadband subscriptions (per 100 people)'];
                if (results.get(year) === undefined) {
                    results.set(year, new Map());
                }
                results.get(year).set('broadbandPenetration', broadbandPenetration);
            }
        })
        .on('end', () => {
            if (results.size !== 0) {
                res.status(200).json(mapStrMapToJSON(results));
            } else {
                next(createError(404));
            }
        });
});

router.get('/gov/:country/share', function(req: any, res: any, next: any) {
    const country: string = req.params.country.toLowerCase();
    let results: Map<string, Map<string, number>> = new Map();
    fs.createReadStream(path.join(ressources_path, 'share-of-individuals-using-the-internet.csv'))
        .pipe(csv())
        .on('data', (data: any) => {
            if (data.Entity.toLowerCase() === country){
                let year = data.Year;
                let share = +data['Individuals using the Internet (% of population)'];
                if (results.get(year) === undefined) {
                    results.set(year, new Map());
                }
                results.get(year).set('share', share);
            }
        })
        .on('end', () => {
            if (results.size !== 0) {
                res.status(200).json(mapStrMapToJSON(results));
            } else {
                next(createError(404));;
            }
        });
});

export { router };
