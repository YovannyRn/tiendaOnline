export interface PasswordInterface {
    username: string;
    oldPassword: string;
    newPassword: string;
}

export type PasswordI = Pick<PasswordInterface, "username" | "oldPassword" | "newPassword">