import { restToInternal } from "../src/mappers/restMapper";

describe("REST → Internal mapper", () => {
    it("maps usage correctly", () => {
        const sample = require("./mocks/mvno_rest_spec.json");
        const result = restToInternal(sample);
        expect(result.telgea_user_id).toBe("abc123");
        expect(result.usage_data.total_mb).toBeCloseTo(845.23);
        expect(result.billing_period.end).toBe("2025-04-30T23:59:59Z");
    });
});
