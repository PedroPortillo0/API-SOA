import logging
from flask import request, jsonify
from HistorialDeVacunacion.Application.use_case.createVacunacion import CreateVacunacionUseCase

# Configuración básica del logging
logging.basicConfig(level=logging.ERROR, format='%(asctime)s %(levelname)s:%(message)s')

class CreateVacunacionController:
    def __init__(self, create_vacunacion_use_case: CreateVacunacionUseCase):
        self.create_vacunacion_use_case = create_vacunacion_use_case

    def handle(self):
        try:
            # Obtener los datos del request
            data = request.get_json()
            if not data:
                return jsonify({'error': 'No se proporcionaron datos'}), 400

            id_mascota = data.get('id_mascota')
            fecha_vacunacion = data.get('fecha_vacunacion')
            vacuna = data.get('vacuna')
            lote = data.get('lote')

            # Validar que todos los campos requeridos estén presentes
            if not all([id_mascota, fecha_vacunacion, vacuna, lote]):
                return jsonify({'error': 'Faltan campos requeridos'}), 400

            # Ejecutar el caso de uso
            self.create_vacunacion_use_case.execute(id_mascota, fecha_vacunacion, vacuna, lote)

            # Responder con éxito
            return jsonify({'message': 'Vacunación creada exitosamente'}), 201

        except KeyError as e:
            logging.error(f'Falta el campo requerido: {str(e)}')
            return jsonify({'error': f'Falta el campo requerido: {str(e)}'}), 400
        except Exception as e:
            logging.error(f'Error inesperado: {str(e)}')
            return jsonify({'error': str(e)}), 500