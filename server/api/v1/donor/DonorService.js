import fs from 'fs';
import path from 'path';
import { parse } from 'fast-csv';
import { Donor, sequelize } from '../../../models';
import DonorValidation from './DonorValidation';
import { sendMail } from '../../../common/Email';

export default class DonorService {
    constructor(req) { this.req = req };

    async validate(operation, data) {
        await DonorValidation()[operation].validate(
            data, { abortEarly: false }
        );
    }

    async get({ current = 0, pageSize = 5, name }) {
        const filter = {};
        if (name) {
            filter.name = name;
        }
        const donations = await Donor.findAndCountAll({
            where: filter,
            limit: pageSize,
            offset: current * pageSize,
        });
        const totalAmount = await Donor.sum('amount');
        donations.totalAmount = totalAmount;
        return donations;
    }

    __formatData(row, hasHeader) {
        if (hasHeader) {
            const keys = Object.keys(row);
            return {
                donorId: row[keys[0]],
                name: row[keys[1]].length > 0 ? row[keys[1]] : 'Anonymous',
                email: row[keys[2]].length > 0 ? row[keys[2]] : 'Anonymous',
                gender: row[keys[3]].length > 0 ? row[keys[3]] : 'Anonymous',
                address: row[keys[4]].length > 0 ? row[keys[4]] : 'Anonymous',
                amount: parseInt(row[keys[5]]),
            };
        } else {
            return {
                donorId: row[0],
                name: row[1].length > 0 ? row[1] : 'Anonymous',
                email: row[2].length > 0 ? row[2] : 'Anonymous',
                gender: row[3].length > 0 ? row[3] : 'Anonymous',
                address: row[4].length > 0 ? row[4] : 'Anonymous',
                amount: parseInt(row[5]),
            };
        }
    }

    async __extractData(configParse) {
        return new Promise((resolve, reject) => {
            const data = [];
            const [nameFile] = fs.readdirSync(path.join(__dirname, 'uploads'));
            const pathFile = path.join(__dirname, `uploads/${nameFile}`);
            fs.createReadStream(path.resolve(pathFile))
                .pipe(parse(configParse))
                .on('error', reject)
                .on('data', row => {
                    const dataFormatted = 
                        this.__formatData(row, configParse.headers);
                    data.push(dataFormatted);
                })
                .on('end', () => {
                    resolve(data)
                });
        })
    }

    async create() {
        const { hasHeader: headers, delimiter, skipRows } = this.req.query;
        const options = {};
        if (headers) {
            options.headers = headers === 'true' ? true : false;
        }
        if (skipRows) {
            options.skipRows = skipRows;
        }
        if (!delimiter) {
            options.delimiter = ';';
        }
        const bulkData = await this.__extractData(options);
        if (bulkData) {
            const transaction =  await sequelize.transaction();
            for (const item of bulkData) {
                await this.validate('create', item);
            }
            const donations = await Donor.bulkCreate(bulkData);
            await transaction.commit();
            await sendMail(donations);
            return donations;
        }
    }
}
