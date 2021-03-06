export class InterB2cMarket {
    customerName: string;
    mobileNumber: string;
    countryCode: string;
    gender: string;
    email: string;
    dateOfBirth: string;
    nationality: string;
    country: string;
    categoryType: string;
    designation: string;
    location: string;
    constructor(
        customerName: string,
        countryCode: string,
        mobileNumber: string,
        gender: string,
        email: string,
        dateOfBirth: string,
        country: string,
        nationality: string,
        categoryType: string,
        designation: string,
        location: string
    ) {
        this.customerName = customerName;
        this.countryCode = countryCode;
        this.mobileNumber = mobileNumber;
        this.gender = gender;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.nationality = nationality;
        this.country = country;
        this.designation = designation;
        this.categoryType = categoryType;
        this.location = location;
    }
}
