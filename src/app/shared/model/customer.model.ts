export class Customer {
    _id: string;
    customerName: string;
    mobileNumber: number;
    whatsAppNo: number;
    landLine: number;
    email: string;
    companyName: string;
    companyAddress: string;
    location: string;
    gst: number;
    customerGrade: string;
    brandName: string;
    constructor(
        customerName: string,
        mobileNumber: number,
        whatsAppNo: number,
        landLine: number,
        email: string,
        companyName: string,
        companyAddress: string,
        location: string,
        gst: number,
        customerGrade: string,
        brandName: string
    ) {
        this.customerName = customerName;
        this.mobileNumber = mobileNumber;
        this.whatsAppNo = whatsAppNo;
        this.landLine = landLine;
        this.email = email;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.location = location;
        this.gst = gst;
        this.customerGrade = customerGrade;
        this.brandName = brandName;
    }
}
