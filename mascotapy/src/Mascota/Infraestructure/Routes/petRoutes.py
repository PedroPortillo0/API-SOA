from flask import Blueprint, request
from Mascota.Infraestructure.DependencyInyeccion import (
    create_pet_controller,
    delete_pet_controller,
    get_all_pets_controller,
    get_pet_by_id_controller,
    get_pets_by_name_controller,
    update_pet_controller,
)

# Crear el blueprint
pet_routes = Blueprint("pet_routes", __name__)

# Rutas
@pet_routes.route("/", methods=["POST"])
def create_pet():
    return create_pet_controller.handle(request)

@pet_routes.route("/<string:pet_id>", methods=["DELETE"])
def delete_pet(pet_id):
    return delete_pet_controller.handle(pet_id)

@pet_routes.route("/", methods=["GET"])
def get_all_pets():
    return get_all_pets_controller.handle()

@pet_routes.route("/<string:pet_id>", methods=["GET"])
def get_pet_by_id(pet_id):
    return get_pet_by_id_controller.handle(pet_id)

@pet_routes.route('/name/<string:name>', methods=['GET'])
def get_pets_by_name(name):
    return get_pets_by_name_controller.handle(name)

@pet_routes.route("/<string:pet_id>", methods=["PUT"])
def update_pet(pet_id):
    return update_pet_controller.handle(request, pet_id)
