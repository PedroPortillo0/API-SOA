from flask import Request, jsonify, Response
from Mascota.Application.Casos_de_uso.CreatePetUseCase import CreatePetUseCase
from Mascota.Domain.Entities.Pet import Pet


class CreatePetController:
    def __init__(self, create_pet_use_case: CreatePetUseCase):
        """
        Inicializa el controlador con el caso de uso CreatePetUseCase.
        """
        self.create_pet_use_case = create_pet_use_case

    def handle(self, request: Request) -> Response:
        """
        Maneja la solicitud para crear una nueva mascota.
        """
        try:
            # Obtener los datos del cuerpo de la solicitud
            data = request.json
            if not data:
                return jsonify({"error": "No se proporcionaron datos"}), 400

            # Crear instancia de Pet a partir de los datos
            pet = Pet(**data)

            # Ejecutar el caso de uso para crear la mascota
            self.create_pet_use_case.execute(pet)

            # Responder con un estado 201 (Creado)
            return jsonify({"message": "Mascota creada exitosamente"}), 201

        except Exception as e:
            # Manejar errores y responder con un estado 500
            return jsonify({"error": str(e)}), 500
