from fastapi import FastAPI, Request, Form, Depends, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import datetime, timedelta
import jwt

# Modelos
from Billing_Backend.model.producto_m import Producto
from Billing_Backend.model.cliente_m import Cliente
from Billing_Backend.model.usuario_m import Usuario

# Routers
from Billing_Backend.routes.producto_routes import router as producto_router
from Billing_Backend.routes.cliente_routes import router as cliente_router
from Billing_Backend.routes.factura_routes import router as factura_router
from Billing_Backend.routes.auth_routes import router as auth_router

# -------------------------
# Configuración JWT
# -------------------------
JWT_SECRET = "tu_super_secreto"
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60
security = HTTPBearer()

# -------------------------
# Dependable para obtener usuario actual
# -------------------------
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Usuario:
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("id_usuario")
        if not user_id:
            raise HTTPException(status_code=401, detail="Token inválido")
        user = Usuario.get(user_id)
        if not user:
            raise HTTPException(status_code=401, detail="Usuario no encontrado")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

# -------------------------
# Inicialización de la app
# -------------------------
app = FastAPI()
templates = Jinja2Templates(directory="app/templates")

# -------------------------
# Frontend: formularios protegidos
# -------------------------
@app.get("/", response_class=HTMLResponse)
def index(request: Request, user: Usuario = Depends(get_current_user)):
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
    return RedirectResponse(url="/", status_code=303)

@app.post("/cliente/add")
def add_cliente(
    nombre: str = Form(...),
    email: str = Form(...),
    user: Usuario = Depends(get_current_user)
):
    c = Cliente(nombre=nombre, email=email)
    c.save()
    return RedirectResponse(url="/", status_code=303)

# -------------------------
# Routers API REST protegidos
# -------------------------
app.include_router(producto_router, dependencies=[Depends(get_current_user)])
app.include_router(cliente_router, dependencies=[Depends(get_current_user)])
app.include_router(factura_router, dependencies=[Depends(get_current_user)])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])

# -------------------------
# Ejecutar:
# uvicorn main:app --reload
# -------------------------
