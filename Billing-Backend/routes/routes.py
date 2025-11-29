from flask import Blueprint, jsonify, request
from model.producto_m import Producto
from model.cliente_m import Cliente

routes = Blueprint("routes", __name__)

@routes.post("/products")
def create_product():
    data = request.get_json()

    p = Producto(
        nombre=data.get("name"),
        precio=data.get("price"),
        stock=data.get("stock")
    )

    p.save()

    return jsonify({"status": "producto creado"}), 201



@routes.get("/clients")
def get_clients():
    clientes = Cliente.all()
    return jsonify([c.to_dict() for c in clientes])


@routes.post("/products")
def create_product():
    data = request.get_json()

    p = Producto(
        nombre=data.get("name"),
        precio=data.get("price"),
        stock=data.get("stock"),
    )
    p.save()

    return jsonify({"status": "producto creado"}), 201
