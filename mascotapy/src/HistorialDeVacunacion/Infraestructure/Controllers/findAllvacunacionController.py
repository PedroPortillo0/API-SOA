import logging
from flask import jsonify
from HistorialDeVacunacion.Application.use_case.findAllvacunacion import FindAllVacunacionUseCase

# Configuración básica del logging
logging.basicConfig(level=logging.ERROR, format='%(asctime)s %(levelname)s:%(message)s')

class FindAllVacunacionController:
    def __init__(self, find_all_vacunacion_use_case: FindAllVacunacionUseCase):
        self.find_all_vacunacion_use_case = find_all_vacunacion_use_case

    def handle(self):
        try:
            # Ejecutar el caso de uso
            vacunaciones = self.find_all_vacunacion_use_case.execute()

            # Responder con éxito
            return jsonify([vacunacion.__dict__ for vacunacion in vacunaciones]), 200
        except Exception as e:
            logging.error(f'Error inesperado: {str(e)}')
            return jsonify({'error': str(e)}), 500