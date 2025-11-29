from flask import Blueprint, jsonify, request
from model.factura_m import Factura

factura_bp = Blueprint("facturas", __name__)

# GET /facturas
@factura_bp.route("/", methods=["GET"])
def listar_facturas():
    facturas = Factura.all()
    return jsonify([f.to_dict() for f in facturas])


# POST /facturas
@factura_bp.route("/", methods=["POST"])
def crear_factura():
    data = request.json

    factura = Factura(
        id_cliente=data.get("id_cliente"),
        fecha=data.get("fecha"),
        total=data.get("total", 0.0)
    )

    factura.save()

    return jsonify({"status": "factura creada"})
