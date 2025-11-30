from fastapi import APIRouter, Body, HTTPException
from Billing_Backend.model.usuario_m import Usuario
import bcrypt
import jwt
from datetime import datetime, timedelta

router = APIRouter(prefix="/auth", tags=["Auth"])

# Configuración JWT
JWT_SECRET = "tu_super_secreto"
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60

# -------------------------
# Login de usuario seguro
# -------------------------
@router.post("/login")
def login(data: dict = Body(...)):
    email = data.get("email")
    password = data.get("password")

    # Validación básica de entrada
    if not email or not password:
        raise HTTPException(status_code=400, detail="Email y contraseña son requeridos")

    # Buscar usuario
    user = next((u for u in Usuario.all() if u.email == email), None)
    if not user:
        raise HTTPException(status_code=401, detail="Email o contraseña incorrecta")

    # Verificar contraseña solo si existe
    if not user.password:
        raise HTTPException(status_code=401, detail="Email o contraseña incorrecta")

    # Verificación segura con bcrypt
    if not bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
        raise HTTPException(status_code=401, detail="Email o contraseña incorrecta")

    # Generar token JWT
    payload = {
        "id_usuario": user.id_usuario,
        "rol": user.rol,
        "exp": datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MINUTES)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return {"token": token, "rol": user.rol}
