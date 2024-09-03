const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName, logFolder) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, "..", 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, "..",'logs'));
        }
        if (!fs.existsSync(path.join(__dirname, "..", 'logs', logFolder))) {
            await fsPromises.mkdir(path.join(__dirname, "..", "logs",  logFolder));
        }

        await fsPromises.appendFile(path.join(__dirname, "..", 'logs', logFolder,  logName), logItem);
    } catch (err) {
        console.log(err);
    }
}
module.exports = { logEvents }
