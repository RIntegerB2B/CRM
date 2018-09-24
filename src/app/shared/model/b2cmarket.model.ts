export class B2cMarket {
    customerName: string;
    gender: string;
    mobileNumber: number;
    email: string;
    dateOfBirth: string;
    nationality: string;
    categoryType: string;
    designation: string;
    location: string;
    constructor(
        customerName: string,
        gender: string,
        mobileNumber: number,
        email: string,
        dateOfBirth: string,
        nationality: string,
        categoryType: string,
        designation: string,
        location: string
    ) {
        this.customerName = customerName;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.nationality = nationality;
        this.designation = designation;
        this.categoryType = categoryType;
        this.location = location;
    }
}
