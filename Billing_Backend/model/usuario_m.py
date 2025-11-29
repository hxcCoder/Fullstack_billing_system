import bcrypt
from Billing_Backend.model.base_model import BaseModel
from typing import Optional, cast

class Usuario(BaseModel):
    table_name = "usuario"
    pk_field = "id_usuario"

    def __init__(self, id_usuario=None, nombre=None, email=None, password=None, rol="user"):
        self.id_usuario = id_usuario
        self.nombre = nombre
        self.email = email
        self.password = password
        self.rol = rol

    def hash_password(self, plain: str) -> str:
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(plain.encode(), salt)
        return hashed.decode()

    def check_password(self, plain: str) -> bool:
        if not self.password:
            return False
        return bcrypt.checkpw(plain.encode(), self.password.encode())


    def save(self) -> bool:
        data = self.to_dict()
        if self.password:
            data["password"] = self.hash_password(self.password)
        if self.id_usuario is None:
            return self.insert(data)
        else:
            return self.update(self.id_usuario, data)

    @classmethod
    def get(cls, id_usuario: int) -> Optional["Usuario"]:
        result = BaseModel.get_by_id(id_usuario, cls)
        return cast(Optional["Usuario"], result)

    @classmethod
    def all(cls):
        return [cast("Usuario", r) for r in BaseModel.list_all(cls)]

    @classmethod
    def delete_by_id(cls, id_usuario: int) -> bool:
        return BaseModel.delete(id_usuario)

    def to_dict(self):
        return {
            "id_usuario": self.id_usuario,
            "nombre": self.nombre,
            "email": self.email,
            "password": self.password,
            "rol": self.rol
        }
