from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from model.producto_m import Producto
from model.cliente_m import Cliente
from model.base_model import BaseModel

app = FastAPI()
templates = Jinja2Templates(directory="app/templates")

# -------------------------
# Rutas de Producto y Cliente
# -------------------------
@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    productos = Producto.all()  # llamamos al método all() de Producto
    clientes = Cliente.all()    # llamamos al método all() de Cliente
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
    # Redirige a la página principal para actualizar la lista
    return RedirectResponse(url="/", status_code=303)
