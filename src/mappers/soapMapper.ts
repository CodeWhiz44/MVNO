import { InternalUsageRecord, SmsCharge } from "../models/internal";
import { ChargeSmsDTO } from "../parsers/soapParser";

export function soapChargeSmsDtoToInternal(
    dto: ChargeSmsDTO
): Pick<InternalUsageRecord, "telgea_user_id" | "msisdn" | "sms_charges"> {
    const sms: SmsCharge = {
        message_id: dto.MessageID,
        timestamp: dto.Timestamp,
        amount: Number(dto.ChargeAmount),
        currency: dto.Currency,
    };

    return {
        telgea_user_id: dto.UserID,
        msisdn: dto.PhoneNumber,
        sms_charges: [sms],
    };
}
