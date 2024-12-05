from flask import Blueprint, request
from HistorialDeVacunacion.Infraestructure.dependencyInyeccion import (
    create_vacunacion_controller,
    find_all_vacunacion_controller,
    find_vacunacion_by_id_controller,
)

# Crear el blueprint
vacunacion_routes = Blueprint("vacunacion_routes", __name__)

# Rutas
@vacunacion_routes.route("/", methods=["POST"])
def create_vacunacion():
    return create_vacunacion_controller.handle(request)

@vacunacion_routes.route("/", methods=["GET"])
def get_all_vacunaciones():
    return find_all_vacunacion_controller.handle()

@vacunacion_routes.route("/<string:id>", methods=["GET"])
def get_vacunacion_by_id(id):
    return find_vacunacion_by_id_controller.handle(id)

