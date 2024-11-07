import nodemailer from 'nodemailer';
import { ServicioCorreo } from '../../Domain/Repositories/ServicioCorreo';

export class NodemailerServicioCorreo implements ServicioCorreo {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async enviarCorreo(destinatario: string, asunto: string, mensaje: string): Promise<void> {
        console.log(`Destinatario: ${destinatario}`);
        console.log(`Asunto: ${asunto}`);
        console.log(`Mensaje: ${mensaje}`);
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: destinatario,
            subject: asunto,
            text: mensaje,
        };
    
        await this.transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${destinatario}`);
    }
    
    
}
