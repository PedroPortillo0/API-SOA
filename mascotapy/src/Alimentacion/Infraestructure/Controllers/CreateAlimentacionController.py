from flask import request, jsonify
from Alimentacion.Domain.Entities.AlimentacionMascota import Alimentacion
from Alimentacion.Application.Casos_de_uso.CreateAlimentacionUseCase import CreateAlimentacionUseCase
from Mascota.Infraestructure.Persistence.PetRepository import PetRepository


class CreateAlimentacionController:
    def __init__(self, create_alimentacion_use_case: CreateAlimentacionUseCase, pet_repository: PetRepository):
        self.create_alimentacion_use_case = create_alimentacion_use_case
        self.pet_repository = pet_repository

    def handle(self):
        """
        Maneja la solicitud POST para crear un nuevo registro de alimentación.
        """
        try:
            # Obtener datos del cuerpo de la solicitud
            data = request.get_json()
            print(f"Datos recibidos en el controlador: {data}")  # Depuración

            # Validar campos requeridos
            required_fields = ["tipo_alimento", "nombre_alimento", "cantidad", "mascota_id"]
            missing_fields = [field for field in required_fields if field not in data]

            if missing_fields:
                return jsonify({"error": f"Faltan campos requeridos: {', '.join(missing_fields)}"}), 400

            # Verificar si el ID de la mascota existe
            mascota_id = data["mascota_id"]
            if not self.pet_repository.exists(mascota_id):  # Verifica si el método `exists` está correctamente definido
                return jsonify({"error": f"La mascota con ID {mascota_id} no existe"}), 400

            # Crear la instancia de Alimentacion
            alimentacion = Alimentacion(
                tipo_alimento=data["tipo_alimento"],
                nombre_alimento=data["nombre_alimento"],
                cantidad=data["cantidad"],
                mascota_id=mascota_id
            )

            # Ejecutar el caso de uso
            result = self.create_alimentacion_use_case.execute(alimentacion)

            if result:
                return jsonify({"message": "Alimentación creada exitosamente"}), 201
            else:
                return jsonify({"error": "Error al crear la alimentación"}), 400
        except Exception as e:
            # Manejo de excepciones y registro
            print(f"Error en el controlador: {e}")
            return jsonify({"error": str(e)}), 500
