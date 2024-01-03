import * as emailjs from '@emailjs/nodejs';
import { EmailModel } from './email.model';
export declare class EmailService {
    constructor();
    sendMail(email: EmailModel): Promise<emailjs.EmailJSResponseStatus>;
}
