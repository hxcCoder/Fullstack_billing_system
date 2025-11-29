from .base_model import BaseModel
from typing import Optional, List, cast

class Cliente(BaseModel):
    table_name = "cliente"
    pk_field = "id_cliente"

    def __init__(self, id_cliente: Optional[int] = None, nombre: Optional[str] = None, email: Optional[str] = None):
        self.id_cliente: Optional[int] = id_cliente
        self.nombre: Optional[str] = nombre
        self.email: Optional[str] = email

    def to_dict(self) -> dict:
        return {
            "id_cliente": self.id_cliente,
            "nombre": self.nombre,
            "email": self.email
        }

    def save(self) -> bool:
        data = self.to_dict()
        return self.insert(data) if self.id_cliente is None else self.update(self.id_cliente, data)

    @classmethod
    def get(cls, id_cliente: int) -> Optional["Cliente"]:
        result = cls.get_by_id(id_cliente, cls)
        return cast(Optional["Cliente"], result)

    @classmethod
    def all(cls) -> List["Cliente"]:
        return [cast("Cliente", r) for r in cls.list_all(cls)]

    @classmethod
    def delete_by_id(cls, id_cliente: int) -> bool:
        return cls.delete(id_cliente)
