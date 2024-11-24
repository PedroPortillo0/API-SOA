from flask import Request, jsonify, Response
from Mascota.Application.Casos_de_uso.GetPetByName import GetPetsByNameUseCase

class GetPetsByNameController:
    def __init__(self, get_pets_by_name_use_case: GetPetsByNameUseCase):
        self.get_pets_by_name_use_case = get_pets_by_name_use_case

    def handle(self, name: str) -> Response:
        try:
            name = name.strip()  # Elimina espacios en blanco al inicio y al final
            pets = self.get_pets_by_name_use_case.execute(name)
            if not pets:
                return jsonify({"error": f"No se encontraron mascotas con el nombre '{name}'"}), 404
            return jsonify([pet.__dict__ for pet in pets]), 200
        except ValueError as e:
            return jsonify({"error": str(e)}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500
