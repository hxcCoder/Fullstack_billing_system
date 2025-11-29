from fastapi import APIRouter, Body, Depends, HTTPException
from Billing_Backend.model.producto_m import Producto
from Billing_Backend.main import get_current_user, Usuario  # importar dependable y modelo

router = APIRouter(prefix="/productos", tags=["Productos"])

@router.get("/", dependencies=[Depends(get_current_user)])
def get_products():
    productos = Producto.get_all()
    return [p.to_dict() for p in productos]

@router.post("/", dependencies=[Depends(get_current_user)])
def create_product(data: dict = Body(...)):
    p = Producto(
        nombre=data.get("nombre"),
        precio=data.get("precio"),
        stock=data.get("stock"),
    )
    p.save()
    return {"status": "producto creado"}
