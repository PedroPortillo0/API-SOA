from flask import Request, jsonify, Response
from Mascota.Application.Casos_de_uso.UpdatePetUseCase import UpdatePetUseCase


class UpdatePetController:
    def __init__(self, update_pet_use_case: UpdatePetUseCase):
        """
        Inicializa el controlador con el caso de uso UpdatePetUseCase.
        """
        self.update_pet_use_case = update_pet_use_case

    def handle(self, request: Request, pet_id: str) -> Response:
        """
        Maneja la solicitud para actualizar una mascota por su ID.
        """
        try:
            # Obtener los datos del cuerpo de la solicitud
            data = request.json
            if not data:
                return jsonify({"error": "No se proporcionaron datos para actualizar la mascota"}), 400

            # Ejecutar el caso de uso para actualizar la mascota
            self.update_pet_use_case.execute(pet_id, data)

            # Responder con un estado 200 (OK) si la actualización fue exitosa
            return jsonify({"message": f"Mascota con ID '{pet_id}' actualizada correctamente"}), 200

        except ValueError as e:
            # Manejar errores relacionados con lógica de negocio (e.g., mascota no encontrada)
            return jsonify({"error": str(e)}), 404

        except Exception as e:
            # Manejar otros errores inesperados
            return jsonify({"error": str(e)}), 500
