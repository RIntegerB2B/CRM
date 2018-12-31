export class EmailSend {
    email: [string];
    emailType: [string];
    emailMessage: string;
    subjectTitle: string;
    constructor(
        email: [string],
        emailType: [string],
        emailMessage: string,
        subjectTitle: string,
    ) {
        this.email = email;
        this.emailType = emailType;
        this.emailMessage = emailMessage;
        this.subjectTitle = subjectTitle;
    }
}
