from fastapi import APIRouter, Body
from model.factura_m import Factura

router = APIRouter(prefix="/facturas", tags=["Facturas"])

@router.get("/")
def listar_facturas():
    facturas = Factura.all()
    return [f.to_dict() for f in facturas]

@router.post("/")
def crear_factura(data: dict = Body(...)):
    factura = Factura(
        id_cliente=data.get("id_cliente"),
        fecha=data.get("fecha"),
        total=data.get("total", 0.0)
    )
    factura.save()
    return {"status": "factura creada"}
