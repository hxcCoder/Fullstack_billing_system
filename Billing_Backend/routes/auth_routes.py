from fastapi import APIRouter, Body, HTTPException, Depends
from Billing_Backend.model.usuario_m import Usuario
from typing import Optional
import bcrypt
import jwt
from datetime import datetime, timedelta
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter(prefix="/auth", tags=["Auth"])

# Configuración JWT
JWT_SECRET = "tu_super_secreto"  # cambia esto en producción
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60

security = HTTPBearer()

# -------------------------
# Función para obtener usuario actual desde JWT
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
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

# -------------------------
# Registro de usuario
# -------------------------
@router.post("/register")
def register(data: dict = Body(...)):
    nombre = data.get("nombre")
    email = data.get("email")
    password = data.get("password")

    # Validación básica
    if not nombre or not email or not password:
        raise HTTPException(status_code=400, detail="Nombre, email y contraseña son requeridos")

    # Revisar si ya existe
    if any(u.email == email for u in Usuario.all()):
        raise HTTPException(status_code=400, detail="Email ya registrado")

    # Hashear contraseña
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    # Crear usuario
    user = Usuario(nombre=nombre, email=email, password=hashed_pw)
    user.save()

    return {"status": "usuario creado"}

# -------------------------
# Login de usuario
# -------------------------
@router.post("/login")
def login(data: dict = Body(...)):
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Email y contraseña son requeridos")

    user = next((u for u in Usuario.all() if u.email == email), None)
    if not user or not user.password:
        raise HTTPException(status_code=401, detail="Email o contraseña incorrecta")

    if not bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
        raise HTTPException(status_code=401, detail="Email o contraseña incorrecta")

    payload = {
        "id_usuario": user.id_usuario,
        "rol": getattr(user, "rol", "user"),
        "exp": datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MINUTES)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return {"token": token, "rol": getattr(user, "rol", "user")}

# -------------------------
# Ruta protegida
# -------------------------
@router.get("/me")
def me(user: Usuario = Depends(get_current_user)):
    return {
        "id_usuario": user.id_usuario,
        "nombre": user.nombre,
        "email": user.email,
        "rol": getattr(user, "rol", "user")
    }
