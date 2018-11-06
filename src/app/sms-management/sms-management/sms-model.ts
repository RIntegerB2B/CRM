export class MobileSend {
    mobileNumber: [string];
    message: string;
    smsHeader: string;
    constructor(
        mobileNumber: [string],
        message: string,
        smsHeader: string,
    ) {
        this.mobileNumber = mobileNumber;
        this.message = message;
        this.smsHeader = smsHeader;
    }
}
