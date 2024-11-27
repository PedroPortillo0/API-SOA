from flask import Request, jsonify, Response
from Mascota.Application.Casos_de_uso.DeletePetUseCase import DeletePetUseCase


class DeletePetController:
    def __init__(self, delete_pet_use_case: DeletePetUseCase):
        """
        Inicializa el controlador con el caso de uso DeletePetUseCase.
        """
        self.delete_pet_use_case = delete_pet_use_case

    def handle(self, pet_id: str) -> Response:
        """
        Maneja la solicitud para eliminar una mascota.
        """
        try:
            # Ejecutar el caso de uso para eliminar la mascota
            self.delete_pet_use_case.execute(pet_id)

            # Responder con un estado 204 (Sin Contenido) si la eliminación fue exitosa
            return Response(status=204)

        except ValueError as e:
            # Manejar errores relacionados con lógica de negocio (e.g., mascota no encontrada)
            return jsonify({"error": str(e)}), 404

        except Exception as e:
            # Manejar otros errores inesperados
            return jsonify({"error": str(e)}), 500
