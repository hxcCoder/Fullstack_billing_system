from fastapi import APIRouter, Body, HTTPException, Depends
from Billing_Backend.model.usuario_m import Usuario
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import bcrypt
import jwt
from datetime import datetime, timedelta

router = APIRouter(prefix="/auth", tags=["Auth"])

# -------------------------
# Configuración JWT
# -------------------------
JWT_SECRET = "tu_super_secreto"
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60

# -------------------------
# Seguridad HTTP Bearer
# -------------------------
security = HTTPBearer()

# -------------------------
# Registro de usuario
# -------------------------
@router.post("/register")
def register(data: dict = Body(...)):
    # Evita duplicados
    if any(u.email == data.get("email") for u in Usuario.all()):
        raise HTTPException(status_code=400, detail="Email ya registrado")
    
    user = Usuario(
        nombre=data.get("nombre"),
        email=data.get("email"),
        password=data.get("password")
    )
    user.save()
    return {"status": "usuario creado"}

# -------------------------
# Login de usuario
# -------------------------
@router.post("/login")
def login(data: dict = Body(...)):
    users = [u for u in Usuario.all() if u.email == data.get("email")]
    if not users:
        raise HTTPException(status_code=401, detail="Email no encontrado")
    
    user = users[0]
    if not check_password(data.get("password"), user.password):
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")

    payload = {
        "sub": user.id_usuario,
        "rol": user.rol,
        "exp": datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MINUTES)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return {"token": token, "rol": user.rol}

# -------------------------
# Función para verificar password
# -------------------------
def check_password(plain: str, hashed: str) -> bool:
    if not plain or not hashed:
        return False
    return bcrypt.checkpw(plain.encode(), hashed.encode())

# -------------------------
# Dependable para proteger rutas
# -------------------------
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Token inválido")
        user = Usuario.get(user_id)
        if user is None:
            raise HTTPException(status_code=401, detail="Usuario no encontrado")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")
