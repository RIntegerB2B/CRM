
export class AccessPermission {
    userType: string;
    currentDate: string;
    b2bCustomer: [string];
    b2cMarket: [string];
    menuList: [string];
    constructor(
        userType: string,
        currentDate: string,
        b2bCustomer: [string],
        b2cMarket: [string],
        menuList: [string]
    ) {
        this.userType = userType;
        this.currentDate = currentDate;
        this.b2bCustomer = b2bCustomer;
        this.b2cMarket = b2cMarket;
        this.menuList = menuList;
    }
}
