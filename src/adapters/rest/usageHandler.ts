import { Request, Response } from "express";
import { restToInternal } from "../../mappers/restMapper";
import { httpClient } from "../../utils/httpClient";
import { config } from "../../utils/config";
import { logger } from "../../utils/logger";

export async function restUsageHandler(req: Request, res: Response) {
    try {
        const internalRecord = restToInternal(req.body);
        await httpClient.post(config.normalizerUrl, internalRecord);
        res.status(204).end();
    } catch (err) {
        logger.error({ err }, "REST handler failed");
        res.status(500).send("internal-error");
    }
}
