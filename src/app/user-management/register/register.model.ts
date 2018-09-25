export class Register {
    userName: string;
    password: string;
    mobileNumber: number;
    email: string;
    userType: string;
    constructor(
        userName: string,
        password: string,
        mobileNumber: number,
        email: string,
        userType: string
        ) {
        this.userName = userName;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.userType = userType;
    }
}
