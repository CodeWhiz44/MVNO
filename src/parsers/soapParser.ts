import { XMLParser } from "fast-xml-parser";

export interface ChargeSmsDTO {
    UserID: string;
    PhoneNumber: string;
    MessageID: string;
    Timestamp: string;
    ChargeAmount: string;
    Currency: string;
}

export function parseChargeSmsSoap(xml: string): ChargeSmsDTO {
    const parser = new XMLParser({
        ignoreAttributes: false,
        ignoreDeclaration: true,
        ignorePiTags: true,
        trimValues: true,
    });

    const json = parser.parse(xml);
    const body = json?.Envelope?.Body?.ChargeSMS;
    if (!body) throw new Error("Invalid ChargeSMS SOAP envelope");

    return {
        UserID: body.UserID,
        PhoneNumber: body.PhoneNumber,
        MessageID: body.MessageID,
        Timestamp: body.Timestamp,
        ChargeAmount: body.ChargeAmount,
        Currency: body.Currency,
    };
}
