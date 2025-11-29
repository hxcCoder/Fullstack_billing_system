from flask import Blueprint, jsonify, request
from Billing_Backend.model.producto_m import Producto
from Billing_Backend.model.cliente_m import Cliente

routes = Blueprint("routes", __name__)

# GET /products
@routes.get("/products")
def get_products():
    try:
        productos = Producto.all()
        return jsonify([p.to_dict() for p in productos])
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# GET /clients
@routes.get("/clients")
def get_clients():
    try:
        clientes = Cliente.all()
        return jsonify([c.to_dict() for c in clientes])
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# POST /products
@routes.post("/products")
def create_product():
    try:
        data = request.get_json() or {}

        p = Producto(
            nombre=data.get("name"),
            precio=data.get("price"),
            stock=data.get("stock"),
        )
        p.save()

        return jsonify({"status": "producto creado"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
