
export class AccessPermission {
    _id: string;
    userType: string;
    smsPermission: boolean;
    emailPermission: boolean;
    editPermission: boolean;
    deletePermission: boolean;
    constructor(
        _id: string,
        userType: string,
        smsPermission: boolean,
        emailPermission: boolean,
        editPermission: boolean,
        deletePermission: boolean
    ) {
        this._id = _id;
        this.userType = userType;
        this.smsPermission = smsPermission;
        this.emailPermission = emailPermission;
        this.editPermission = editPermission;
        this.deletePermission = deletePermission;
    }
}
