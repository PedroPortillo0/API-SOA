

export interface ServicioCorreo {
    enviarCorreo(destinatario: string, asunto: string, mensaje: string): Promise<void>;
}