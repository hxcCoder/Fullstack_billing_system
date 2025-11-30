import bcrypt
from Billing_Backend.model.base_model import BaseModel
from typing import Optional, cast


class Usuario(BaseModel):
    table_name = "usuario"
    pk_field = "id_usuario"

    def __init__(
        self,
        id_usuario: Optional[int] = None,
        nombre: Optional[str] = None,
        email: Optional[str] = None,
        password: Optional[str] = None,
        rol: str = "user"
    ):
        self.id_usuario = id_usuario
        self.nombre = nombre
        self.email = email
        self.password = password
        self.rol = rol

    # -------------------------
    #   MÉTODOS DE PASSWORD
    # -------------------------
    def hash_password(self, plain: str) -> str:
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(plain.encode(), salt)
        return hashed.decode()

    def check_password(self, plain: str) -> bool:
        if not self.password:
            return False
        return bcrypt.checkpw(plain.encode(), self.password.encode())

    # -------------------------
    #   MÉTODOS CRUD
    # -------------------------
    def save(self) -> bool:
        data = self.to_dict()

        # Si trae password en texto → hashear
        if self.password and not self.password.startswith("$2b$"):
            data["password"] = self.hash_password(self.password)

        # INSERT
        if self.id_usuario is None:
            new_id = self.insert(data)
            if new_id:
                self.id_usuario = new_id
                return True
            return False

        # UPDATE
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

    # -------------------------
    #   SERIALIZACIÓN
    # -------------------------
    def to_dict(self):
        data = {
            "nombre": self.nombre,
            "email": self.email,
            "password": self.password,
            "rol": self.rol
        }

        if self.id_usuario is not None:
            data["id_usuario"] = self.id_usuario

        return data
