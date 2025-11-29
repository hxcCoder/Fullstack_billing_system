from fastapi import APIRouter, Body, Depends
from Billing_Backend.model.cliente_m import Cliente
from Billing_Backend.main import get_current_user, Usuario

router = APIRouter(prefix="/clientes", tags=["Clientes"])

@router.get("/", dependencies=[Depends(get_current_user)])
def get_clients():
    clientes = Cliente.all()
    return [c.to_dict() for c in clientes]

@router.post("/", dependencies=[Depends(get_current_user)])
def create_client(data: dict = Body(...)):
    c = Cliente(
        nombre=data.get("nombre"),
        email=data.get("email")
    )
    c.save()
    return {"status": "cliente creado"}
