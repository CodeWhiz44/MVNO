import express from "express";
import { restUsageHandler } from "./adapters/rest/usageHandler";
import { soapChargeSmsHandler } from "./adapters/soap/chargeSmsHandler";
import { logger } from "./utils/logger";
import { config } from "./utils/config";

const app = express();

app.use(express.json());
app.use(express.text({ type: "*/xml" }));

app.post("/mvno/usage", restUsageHandler);
app.post("/mvno/charge-sms", soapChargeSmsHandler);

app.listen(config.port, () =>
    logger.info(`MVNO adapter listening on :${config.port}`)
);
