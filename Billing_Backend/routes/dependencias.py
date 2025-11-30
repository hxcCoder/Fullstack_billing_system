from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from Billing_Backend.model.usuario_m import Usuario
import jwt

SECRET_KEY = "CAMBIA_POR_UNA_LLAVE_SEGURA"
ALGORITHM = "HS256"

auth_scheme = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)) -> Usuario:
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Token inválido")

        usuario = Usuario.get(user_id)
        if not usuario:
            raise HTTPException(status_code=401, detail="Usuario no encontrado")

        return usuario

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except Exception:
        raise HTTPException(status_code=401, detail="Token inválido")
