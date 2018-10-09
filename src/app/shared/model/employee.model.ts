export class Employee {
    _id: string;
    empName: string;
    empNo: string;
    gender: string;
    landLine: string;
    email: string;
    mobileNumber: string;
    whatsappNo: string;
    dateOfJoin: string;
    dateOfBirth: string;
    designation: string;
    address: string;
    constructor(
        empName: string,
        empNo: string,
        gender: string,
        landLine: string,
        email: string,
        mobileNumber: string,
        whatsappNo: string,
        dateOfBirth: string,
        dateOfJoin: string,
        designation: string,
        address: string
    ) {
        this.empName = empName;
        this.empNo = empNo;
        this.gender = gender;
        this.landLine = landLine;
        this.email = email;
        this.dateOfJoin = dateOfJoin;
        this.mobileNumber = mobileNumber;
        this.whatsappNo = whatsappNo;
        this.dateOfBirth = dateOfBirth;
        this.designation = designation;
        this.address = address;
    }
}
