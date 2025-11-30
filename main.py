from fastapi import FastAPI, Request, Form, Depends, Header
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse
from typing import Optional
import jwt
import os

from Billing_Backend.model.producto_m import Producto
from Billing_Backend.model.cliente_m import Cliente
from Billing_Backend.model.usuario_m import Usuario
from Billing_Backend.routes.auth_routes import JWT_SECRET, JWT_ALGORITHM, get_current_user

app = FastAPI()
templates = Jinja2Templates(directory="app/templates")

# -------------------------
# Usuario opcional (frontend)
# -------------------------
def get_current_user_optional(authorization: Optional[str] = Header(None)) -> Optional[Usuario]:
    if authorization:
        try:
            token = authorization.split(" ")[1]
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            user_id = payload.get("id_usuario")
            return Usuario.get(user_id)
        except Exception:
            return None
    return None

# --------------------------------------
# Rutas frontend
# --------------------------------------
@app.get("/", response_class=HTMLResponse)
def index(request: Request, user: Optional[Usuario] = Depends(get_current_user_optional)):
    productos = Producto.all()
    clientes = Cliente.all()
    return templates.TemplateResponse(
        "index.html",
        {"request": request, "productos": productos, "clientes": clientes, "usuario": user}
    )

@app.post("/producto/add")
def add_producto(
    nombre: str = Form(...),
    precio: float = Form(...),
    stock: int = Form(...),
    user: Usuario = Depends(get_current_user)
):
    p = Producto(nombre=nombre, precio=precio, stock=stock)
    p.save()
    return RedirectResponse("/", status_code=303)

@app.post("/cliente/add")
def add_cliente(
    nombre: str = Form(...),
    email: str = Form(...),
    user: Usuario = Depends(get_current_user)
):
    c = Cliente(nombre=nombre, email=email)
    c.save()
    return RedirectResponse("/", status_code=303)

# --------------------------------------
# API REST protegida
# --------------------------------------
from Billing_Backend.routes.producto_routes import router as producto_router
from Billing_Backend.routes.cliente_routes import router as cliente_router
from Billing_Backend.routes.factura_routes import router as factura_router

app.include_router(producto_router, dependencies=[Depends(get_current_user)])
app.include_router(cliente_router, dependencies=[Depends(get_current_user)])
app.include_router(factura_router, dependencies=[Depends(get_current_user)])

# --------------------------------------
# Auth
# --------------------------------------
from Billing_Backend.routes.auth_routes import router as auth_router
app.include_router(auth_router)
