from fastapi import APIRouter, Body
from Billing_Backend.model.producto_m import Producto

router = APIRouter(prefix="/productos", tags=["Productos"])

@router.get("/")
def get_products():
    productos = Producto.get_all()
    return [p.to_dict() for p in productos]

@router.post("/")
def create_product(data: dict = Body(...)):
    p = Producto(
        nombre=data.get("nombre"),
        precio=data.get("precio"),
        stock=data.get("stock"),
    )
    p.save()
    return {"status": "producto creado"}
