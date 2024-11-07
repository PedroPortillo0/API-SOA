import { ServicioCorreo } from '../Domain/Repositories/ServicioCorreo';

export class ServicioNotificacion {
    constructor(private readonly servicioCorreo: ServicioCorreo) {}

    async enviarCorreoDeBienvenida(destinatario: string, nombre: string): Promise<void> {
        console.log('Destinatario:', destinatario);
        console.log('Nombre:', nombre);
    
        const asunto = 'Bienvenido a Nuestra Plataforma';
        const mensaje = `Hola ${nombre},\n\n¡Bienvenido a nuestra plataforma! Nos alegra que estés aquí.\n\nSaludos,\nEl Equipo`;
        await this.servicioCorreo.enviarCorreo(destinatario, asunto, mensaje);
    }
    
    
}
