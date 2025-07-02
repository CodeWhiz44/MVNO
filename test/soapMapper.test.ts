import { readFileSync } from "fs";
import { parseChargeSmsSoap } from "../src/parsers/soapParser";
import { soapChargeSmsDtoToInternal } from "../src/mappers/soapMapper";

describe("SOAP ChargeSMS → Internal mapper", () => {
    const xml = readFileSync(__dirname + "/mocks/mvno_soap_spec.xml", "utf8");

    it("parses the SOAP envelope into a DTO", () => {
        const dto = parseChargeSmsSoap(xml);
        expect(dto.UserID).toBe("abc123");
        expect(dto.ChargeAmount).toBe("0.05");
    });

    it("maps DTO into InternalUsageRecord fields", () => {
        const dto = parseChargeSmsSoap(xml);
        const internal = soapChargeSmsDtoToInternal(dto);

        expect(internal.telgea_user_id).toBe("abc123");
        expect(internal.msisdn).toBe("+46701234567");
        expect(internal.sms_charges).toHaveLength(1);
        expect(internal.sms_charges[0].amount).toBeCloseTo(0.05);
        expect(internal.sms_charges[0].currency).toBe("EUR");
    });
});
