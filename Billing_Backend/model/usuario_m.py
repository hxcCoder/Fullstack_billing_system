from Billing_Backend.model.base_model import BaseModel
from typing import Optional, List, cast
import hashlib

class Usuario(BaseModel):
    table_name = "usuario"
    pk_field = "id_usuario"

    def __init__(
        self,
        id_usuario: Optional[int] = None,
        nombre: Optional[str] = None,
        email: Optional[str] = None,
        password: Optional[str] = None
    ):
        self.id_usuario = id_usuario
        self.nombre = nombre
        self.email = email
        self.password = password

    # Hashea la contraseña
    def hash_password(self, plain: str) -> str:
        return hashlib.sha256(plain.encode()).hexdigest()

    # Guardar usuario (insert / update)
    def save(self) -> bool:
        data = self.to_dict()
        # Si password existe, se hashea antes de guardar
        if self.password:
            data["password"] = self.hash_password(self.password)
        if self.id_usuario is None:
            return self.insert(data)
        else:
            return self.update(self.id_usuario, data)

    # Métodos de clase CRUD
    @classmethod
    def get(cls, id_usuario: int) -> Optional["Usuario"]:
        result = BaseModel.get_by_id(id_usuario, cls)
        return cast(Optional["Usuario"], result)

    @classmethod
    def all(cls) -> List["Usuario"]:
        return [cast("Usuario", r) for r in BaseModel.list_all(cls)]

    @classmethod
    def delete_by_id(cls, id_usuario: int) -> bool:
        return BaseModel.delete(id_usuario)

    # Convertir a diccionario
    def to_dict(self) -> dict:
        return {
            "id_usuario": self.id_usuario,
            "nombre": self.nombre,
            "email": self.email,
            "password": self.password  # opcional: puede omitirse al mostrar
        }
