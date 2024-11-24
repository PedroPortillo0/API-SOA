from flask import Blueprint, request
from Alimentacion.Infraestructure.DependencyInyeccion import (
    create_alimentacion_controller,
    get_all_alimentacion_controller,
    get_by_id_alimentacion_controller,
)

# Crear el blueprint
alimentacion_routes = Blueprint("alimentacion_routes", __name__)

# Rutas
@alimentacion_routes.route("/create", methods=["POST"])
def create_alimentacion():
    """
    Ruta para crear un registro de alimentación.
    """
    return create_alimentacion_controller.handle()

@alimentacion_routes.route("/", methods=["GET"])
def get_all_alimentacion():
    """
    Ruta para obtener todos los registros de alimentación.
    """
    return get_all_alimentacion_controller.handle()

@alimentacion_routes.route("/<string:alimentacion_id>", methods=["GET"])
def get_by_id_alimentacion(alimentacion_id):
    """
    Ruta para obtener un registro de alimentación por ID.
    """
    return get_by_id_alimentacion_controller.handle(alimentacion_id)
