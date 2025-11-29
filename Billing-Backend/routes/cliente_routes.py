from flask import Blueprint, jsonify, request
from model.cliente_m import Cliente

cliente_bp = Blueprint("cliente", __name__)

# -------------------------
# GET /clientes
# -------------------------
@cliente_bp.get("/")
def get_clients():
    clientes = Cliente.all()
    return jsonify([c.to_dict() for c in clientes])


# -------------------------
# POST /clientes
# -------------------------
@cliente_bp.post("/")
def create_client():
    # Asegura que data sea siempre un dict
    data: dict = request.get_json(force=True) or {}

    c = Cliente(
        nombre=data.get("nombre"),
        email=data.get("email")
    )

    c.save()

    return jsonify({"status": "cliente creado"})
