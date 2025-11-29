from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

JWT_SECRET = "tu_super_secreto"
JWT_ALGORITHM = "HS256"
auth_scheme = HTTPBearer()

def get_current_user(token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    try:
        payload = jwt.decode(token.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

def require_role(role: str):
    def decorator(func):
        def wrapper(user=Depends(get_current_user), *args, **kwargs):
            if user["rol"] != role:
                raise HTTPException(status_code=403, detail="No tienes permiso")
            return func(user=user, *args, **kwargs)
        return wrapper
    return decorator
