export class MobileSend {
    mobileNumber: [number];
    message: string;
    constructor(
        mobileNumber: [number],
        message: string,
    ) {
        this.mobileNumber = mobileNumber;
        this.message = message;
    }
}
