from flask import Request, jsonify, Response
from Mascota.Application.Casos_de_uso.GetAllPetsUseCase import GetAllPetsUseCase


class GetAllPetsController:
    def __init__(self, get_all_pets_use_case: GetAllPetsUseCase):
        """
        Inicializa el controlador con el caso de uso GetAllPetsUseCase.
        """
        self.get_all_pets_use_case = get_all_pets_use_case

    def handle(self) -> Response:
        """
        Maneja la solicitud para obtener todas las mascotas.
        """
        try:
            # Ejecutar el caso de uso para obtener todas las mascotas
            pets = self.get_all_pets_use_case.execute()

            # Si no hay mascotas, devolver un mensaje adecuado
            if not pets:
                return jsonify({"message": "No hay mascotas registradas"}), 200

            # Devolver las mascotas en formato JSON
            return jsonify([pet.__dict__ for pet in pets]), 200

        except Exception as e:
            # Manejar errores y responder con un estado 500
            return jsonify({"error": str(e)}), 500
