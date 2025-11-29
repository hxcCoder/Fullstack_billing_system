from flask import Blueprint, jsonify, request
from model.producto_m import Producto
from model.cliente_m import Cliente

routes = Blueprint("routes", __name__)

# ------------------------
# GET /products
# ------------------------
@routes.get("/products")
def get_products():
    productos = Producto.all()   # <- correcto
    return jsonify([p.to_dict() for p in productos])


# ------------------------
# GET /clients
# ------------------------
@routes.get("/clients")
def get_clients():
    clientes = Cliente.all()
    return jsonify([c.to_dict() for c in clientes])


# ------------------------
# POST /products
# ------------------------
@routes.post("/products")
def create_product():
    data = request.get_json() or {}

    p = Producto(
        nombre=data.get("name"),
        precio=data.get("price"),
        stock=data.get("stock"),
    )

    p.save()

    return jsonify({"status": "producto creado"}), 201
