from fastapi import APIRouter, Body
from model.cliente_m import Cliente

router = APIRouter(prefix="/clientes", tags=["Clientes"])

@router.get("/")
def get_clients():
    clientes = Cliente.all()
    return [c.to_dict() for c in clientes]

@router.post("/")
def create_client(data: dict = Body(...)):
    c = Cliente(
        nombre=data.get("nombre"),
        email=data.get("email")
    )
    c.save()
    return {"status": "cliente creado"}
