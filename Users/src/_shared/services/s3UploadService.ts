import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function uploadImageToS3(imageFile: Buffer, imageName: string): Promise<string> {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: imageName,
        Body: imageFile,
        ContentType: "image/jpeg" // Cambia según el tipo de archivo
    };

    try {
        const command = new PutObjectCommand(params);
        await s3.send(command);
    } catch (error) {
        console.error("Error al subir la imagen a S3:", error);
        throw new Error("No se pudo subir la imagen a S3");
    }

    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageName}`;
}
