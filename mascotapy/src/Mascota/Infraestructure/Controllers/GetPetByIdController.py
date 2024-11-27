from flask import Request, jsonify, Response
from Mascota.Application.Casos_de_uso.GetPetByIdUseCase import GetPetByIdUseCase


class GetPetByIdController:
    def __init__(self, get_pet_by_id_use_case: GetPetByIdUseCase):
        """
        Inicializa el controlador con el caso de uso GetPetByIdUseCase.
        """
        self.get_pet_by_id_use_case = get_pet_by_id_use_case

    def handle(self, pet_id: str) -> Response:
        """
        Maneja la solicitud para obtener una mascota por su ID.
        """
        try:
            # Ejecutar el caso de uso para obtener la mascota por ID
            pet = self.get_pet_by_id_use_case.execute(pet_id)

            # Devolver la mascota en formato JSON
            return jsonify(pet.__dict__), 200

        except ValueError as e:
            # Manejar errores relacionados con lógica de negocio (e.g., mascota no encontrada)
            return jsonify({"error": str(e)}), 404

        except Exception as e:
            # Manejar otros errores inesperados
            return jsonify({"error": str(e)}), 500
