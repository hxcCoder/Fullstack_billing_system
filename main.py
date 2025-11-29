from fastapi import FastAPI, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse

# Routers
from Billing_Backend.routes.producto_routes import router as producto_router
from Billing_Backend.routes.cliente_routes import router as cliente_router
from Billing_Backend.routes.factura_routes import router as factura_router

# Models
from Billing_Backend.model.producto_m import Producto
from Billing_Backend.model.cliente_m import Cliente

app = FastAPI()
templates = Jinja2Templates(directory="app/templates")

# -------------------------
# Rutas de frontend con formularios
# -------------------------
@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    productos = Producto.all()
    clientes = Cliente.all()
    return templates.TemplateResponse(
        "index.html",
        {"request": request, "productos": productos, "clientes": clientes}
    )

@app.post("/producto/add")
def add_producto(nombre: str = Form(...), precio: float = Form(...), stock: int = Form(...)):
    p = Producto(nombre=nombre, precio=precio, stock=stock)
    p.save()
    return RedirectResponse(url="/", status_code=303)

@app.post("/cliente/add")
def add_cliente(nombre: str = Form(...), email: str = Form(...)):
    c = Cliente(nombre=nombre, email=email)
    c.save()
    return RedirectResponse(url="/", status_code=303)

# -------------------------
# Routers de API REST
# -------------------------
app.include_router(producto_router)  # prefix="/productos" ya definido en router
app.include_router(cliente_router)   # prefix="/clientes"
app.include_router(factura_router)   # prefix="/facturas"

# -------------------------
# Nota: Ejecutar con:
# uvicorn main:app --reload
# -------------------------

