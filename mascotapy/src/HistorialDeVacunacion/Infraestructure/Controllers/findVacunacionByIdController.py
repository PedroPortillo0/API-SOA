import logging
from flask import request, jsonify
from HistorialDeVacunacion.Application.use_case.findVacunacionById import FindVacunacionByIdUseCase

# Configuración básica del logging
logging.basicConfig(level=logging.ERROR, format='%(asctime)s %(levelname)s:%(message)s')

class FindVacunacionByIdController:
    def __init__(self, find_vacunacion_by_id_use_case: FindVacunacionByIdUseCase):
        self.find_vacunacion_by_id_use_case = find_vacunacion_by_id_use_case

    def handle(self, id: str):
        try:
            # Ejecutar el caso de uso
            vacunacion = self.find_vacunacion_by_id_use_case.execute(id)

            # Responder con éxito
            return jsonify(vacunacion.__dict__), 200
        except ValueError as e:
            logging.error(f'Error de validación: {str(e)}')
            return jsonify({'error': str(e)}), 404
        except Exception as e:
            logging.error(f'Error inesperado: {str(e)}')
            return jsonify({'error': str(e)}), 500