from fastapi import APIRouter, Body, Depends
from Billing_Backend.model.factura_m import Factura
from Billing_Backend.routes.dependencias import get_current_user

router = APIRouter(prefix="/facturas", tags=["Facturas"])

@router.get("/", dependencies=[Depends(get_current_user)])
def listar_facturas():
    facturas = Factura.all()
    return [f.to_dict() for f in facturas]

@router.post("/", dependencies=[Depends(get_current_user)])
def crear_factura(data: dict = Body(...)):
    factura = Factura(
        id_cliente=data.get("id_cliente"),
        fecha=data.get("fecha"),
        total=data.get("total", 0.0)
    )
    factura.save()
    return {"status": "factura creada"}
