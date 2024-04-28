export declare class SignupDTO {
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly role: string;
    readonly address: {
        addr1: string;
        addr2?: string;
        city: string;
        state: string;
        country: string;
        zip: string;
    };
    readonly password: string;
}
