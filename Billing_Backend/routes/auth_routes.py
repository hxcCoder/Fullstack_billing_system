from fastapi import APIRouter, Body, HTTPException, Depends
from Billing_Backend.model.usuario_m import Usuario
from Billing_Backend.dependencias import get_current_user  # Dependable centralizado
import bcrypt
import jwt
from datetime import datetime, timedelta

router = APIRouter(prefix="/auth", tags=["Auth"])

# Configuración JWT
JWT_SECRET = "tu_super_secreto"
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60

# -------------------------
# Registro de usuario
# -------------------------
@router.post("/register")
def register(data: dict = Body(...)):
    email = data.get("email")
    if any(u.email == email for u in Usuario.all()):
        raise HTTPException(status_code=400, detail="Email ya registrado")
    
    user = Usuario(
        nombre=data.get("nombre"),
        email=email,
        password=data.get("password")
    )
    user.save()
    return {"status": "usuario creado"}

# -------------------------
# Login de usuario
# -------------------------
@router.post("/login")
def login(data: dict = Body(...)):
    email = data.get("email")
    password = data.get("password")

    user = next((u for u in Usuario.all() if u.email == email), None)
    if not user or not bcrypt.checkpw(password.encode(), user.password.encode()):
        raise HTTPException(status_code=401, detail="Email o contraseña incorrecta")

    payload = {
        "id_usuario": user.id_usuario,
        "rol": user.rol,
        "exp": datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MINUTES)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return {"token": token, "rol": user.rol}

# -------------------------
# Rutas protegidas (ejemplo)
# -------------------------
@router.get("/me")
def me(user: Usuario = Depends(get_current_user)):
    return {"id_usuario": user.id_usuario, "nombre": user.nombre, "email": user.email, "rol": user.rol}
