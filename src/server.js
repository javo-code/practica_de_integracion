import express from 'express';
import morgan from 'morgan';
import MainRouter from "./routes/index.js";
import { errorHandler } from './middlewares/errorHandler.js';
import { Command } from "commander";
import { logger } from "./utils/logger.winston.js";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import config from "./config/config.js"


const mainRouter = new MainRouter();
const app = express();

const commander = new Command();

commander.option("-m <mode>", "mode server", "dev");
commander.parse();

console.log("options", commander.opts());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.SECRET_COOKIES));
app.use(morgan('dev'));

app.use('/api', mainRouter.getRouter());

app.use(errorHandler);

const PORT = config.PORT;
const mode = commander.opts().m

app.listen(PORT, () => {
    logger.info(`🚀 SERVER UP ON PORT ${PORT} IN ${mode} MODE` );
});

export default app;