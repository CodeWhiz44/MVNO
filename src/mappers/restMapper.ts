import { InternalUsageRecord } from "../models/internal";

type RestUsage = {
    user_id: string;
    msisdn: string;
    usage: {
        data: {
            total_mb: number;
            roaming_mb: number;
            country: string;
        };
        period: { start: string; end: string };
    };
    network: { type: string; provider_code: string };
};

export function restToInternal(payload: RestUsage): InternalUsageRecord {
    return {
        telgea_user_id: payload.user_id,
        msisdn: payload.msisdn,
        usage_data: {
            total_mb: payload.usage.data.total_mb,
            roaming_mb: payload.usage.data.roaming_mb,
            country: payload.usage.data.country,
            network_type: payload.network.type,
            provider_code: payload.network.provider_code,
        },
        sms_charges: [],
        billing_period: {
            start: payload.usage.period.start,
            end: payload.usage.period.end,
        },
    };
}
