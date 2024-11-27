from flask import jsonify, request
from Alimentacion.Application.Casos_de_uso.GetByIdAlimentacionUseCase import GetByIdAlimentacionUseCase


class GetByIdAlimentacionController:
    def __init__(self, get_by_id_alimentacion_use_case: GetByIdAlimentacionUseCase):
        self.get_by_id_alimentacion_use_case = get_by_id_alimentacion_use_case

    def handle(self, alimentacion_id: str):
        """
        Maneja la solicitud para obtener un registro de alimentación por su ID.
        """
        try:
            alimentacion = self.get_by_id_alimentacion_use_case.execute(alimentacion_id)

            if alimentacion:
                return jsonify(alimentacion.__dict__), 200
            else:
                return jsonify({"message": "Alimentación no encontrada"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500
