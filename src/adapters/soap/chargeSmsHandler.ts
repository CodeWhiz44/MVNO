import { Request, Response } from "express";
import { parseChargeSmsSoap } from "../../parsers/soapParser";
import { soapChargeSmsDtoToInternal } from "../../mappers/soapMapper";
import { httpClient } from "../../utils/httpClient";
import { config } from "../../utils/config";
import { logger } from "../../utils/logger";

export async function soapChargeSmsHandler(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const rawXml = req.body;
        const dto = parseChargeSmsSoap(rawXml);
        const partial = soapChargeSmsDtoToInternal(dto);
        await httpClient.post(config.normalizerUrl, partial);
        res.status(204).end();
    } catch (err) {
        logger.error({ err }, "SOAP handler failed");
        res.status(400).send("invalid-soap");
    }
}
