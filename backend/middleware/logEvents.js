import format from "date-fns";
import { v4 as uuid } from "uuid";

const fs = require("node:fs");
const fsPromises = require("node:fs").promises;
const path = require("node:path");

export const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\thh:mm:ss")}`;
  const logtime = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logtime
    );
  } catch (err) {
    console.log(err);
  }
};

export const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}\n`, "reqLog.txt");
  next();
};


