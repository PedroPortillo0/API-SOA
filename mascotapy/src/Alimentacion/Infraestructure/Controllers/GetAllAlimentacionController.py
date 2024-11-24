from flask import jsonify
from Alimentacion.Application.Casos_de_uso.GetAllAlimentacionUseCase import GetAllAlimentacionUseCase


class GetAllAlimentacionController:
    def __init__(self, get_all_alimentacion_use_case: GetAllAlimentacionUseCase):
        self.get_all_alimentacion_use_case = get_all_alimentacion_use_case

    def handle(self):
        """
        Maneja la solicitud para obtener todos los registros de alimentación.
        """
        try:
            alimentaciones = self.get_all_alimentacion_use_case.execute()
            return jsonify([alimentacion.__dict__ for alimentacion in alimentaciones]), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
