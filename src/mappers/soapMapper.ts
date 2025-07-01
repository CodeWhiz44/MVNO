import { InternalUsageRecord, SmsCharge } from "../models/internal";

export function soapChargeSmsToInternal(
    chargeSmsBody: any
): Pick<InternalUsageRecord, "sms_charges"> {
    const sms: SmsCharge = {
        message_id: chargeSmsBody.MessageID,
        timestamp: chargeSmsBody.Timestamp,
        amount: Number(chargeSmsBody.ChargeAmount),
        currency: chargeSmsBody.Currency,
    };
    return { sms_charges: [sms] };
}
