from flask import Blueprint, jsonify, request
from model.producto_m import Producto

producto_bp = Blueprint("producto", __name__)

@producto_bp.get("/")
def get_products():
    productos = Producto.get_all()  # ← usa el método de tu modelo
    return jsonify([p.to_dict() for p in productos])

@producto_bp.post("/")
def create_product():
    data = request.get_json(force=True) or {}

    p = Producto(
        nombre=data.get("nombre"),
        precio=data.get("precio"),
        stock=data.get("stock")
    )
    p.save()

    return jsonify({"status": "producto creado"})
