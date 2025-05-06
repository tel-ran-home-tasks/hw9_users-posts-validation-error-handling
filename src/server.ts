import {PORT} from "./config/userConfig.js";
import {userService} from "./config/appConfig.js";
import express, {Request, Response, NextFunction} from 'express';
import {apiRouter} from "./routes/apiRoutes.js";
import {logger} from "./events/logger.js";
import {UserPostError} from "./utils/types.js";

export const launchServer = () => {

    userService.restoreDataFromFile();

    const app = express();

    app.use(express.json());

    app.use('/api', apiRouter);

    app.use((req: Request, res: Response) => {
        res.status(404).send('Not Found');
    });

    app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
        const error = UserPostError.fromError(err);
        logger.log(`Error ${error.status}: ${error.message}`);
        res.status(error.status).json({
            error: error.message,
            status: error.status
        });
    });


    const server = app.listen(PORT, () => {
        console.log(`server running at http://localhost:${PORT}`);
    });


    process.on('SIGINT', () => {
        userService.saveDataToFile();
        logger.log("Saving data...");
        logger.saveToFile("Server stopped by Ctrl+C");
        server.close(() => {
            process.exit(0);
        });
    });
};