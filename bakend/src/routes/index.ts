import express from 'express';
import path from "path";
import * as fs from "fs";
import {JSONValue, mapStrNumberToJSON} from "../utils/JSONUtils";
import createError from "http-errors";
var router = express.Router();

const {load} = require("csv-load-sync");
const ressources_path = path.join(path.resolve(__dirname, '../..'), 'resources');

const number_users_per_country = load(path.join(ressources_path, 'number-of-internet-users-by-country.csv'));
const mobile_users_per_country = load(path.join(ressources_path, 'mobile-cellular-subscriptions-per-100-people.csv'));
const broadband_users_per_country = load(path.join(ressources_path, 'broadband-penetration-by-country.csv'));
const share_users_per_country = load(path.join(ressources_path, 'share-of-individuals-using-the-internet.csv'));

/* GET home page. */
router.get('/', function(req: any, res: { render: (arg0: string, arg1: { title: string; }) => void; }, next: any) {
    res.render('index', { title: 'Express' });
});

router.get('/ong/:year', function(req: any, res: any, next: any) {
    const year: number = +req.params.year;
    let total: JSONValue = {};
    let acc: number = 0;
    total["country"] = "total";

    const filtered_countries = number_users_per_country.filter((m: any) => +m.Year == year);

    if (filtered_countries.length === 0){
        res.status(404).json("ressource not found");
    }

    const results: Array<JSONValue> = filtered_countries.map((m: any) => {
       const res: JSONValue = {};
       res["country"] = m.Entity;
       res["numberUser"] = +m['Number of internet users (OWID based on WB & UN)'];
       acc += res["numberUser"];
       return res;
    });

    total["numberUser"] = acc;
    results.push(total);

    res.status(200).json(results);
});

router.get('/gov/:country', function(req: any, res: any, next: any) {
    const country: string = req.params.country.toLowerCase();
    let results: Map<string, Array<number>> = new Map();

    const filtered_mobile = mobile_users_per_country.filter((m: any) => m.Entity.toLowerCase() === country && +m.Year >= 2004);

    if (filtered_mobile.length === 0){
        res.status(404).json("ressource not found");
    }

    const filtered_broadband = broadband_users_per_country.filter((m: any) => m.Entity.toLowerCase() === country && +m.Year >= 2004);
    const filtered_share = share_users_per_country.filter((m: any) => m.Entity.toLowerCase() === country && +m.Year >= 2004);

    const broadband_years = filtered_broadband.map((m: any) => +m.Year);
    const mobile_years = filtered_mobile.map((m: any) => +m.Year);
    const share_years = filtered_share.map((m: any) => +m.Year);

    const years: Array<number> = <Array<number>>[... new Set(broadband_years.filter((y: number) => mobile_years.indexOf(y) !== -1 && share_years.indexOf(y) !== -1))];

    const broadband: Array<number> = <Array<number>>filtered_broadband
        .filter((m: any) => years.indexOf(+m.Year) !== -1)
        .map((m: any) =>  +m['Fixed broadband subscriptions (per 100 people)']);

    const mobile: Array<number> = <Array<number>>filtered_mobile
        .filter((m: any) => years.indexOf(+m.Year) !== -1)
        .map((m: any) => +m['Mobile cellular subscriptions (per 100 people)']);

    const share: Array<number> = <Array<number>>filtered_share
        .filter((m: any) => years.indexOf(+m.Year) !== -1)
        .map((m: any) =>  +m['Individuals using the Internet (% of population)']);

    results.set('year', years);
    results.set('mobile', mobile);
    results.set('broadband', broadband);
    results.set('share', share);

    res.status(200).json(mapStrNumberToJSON(results));
});

export { router };
