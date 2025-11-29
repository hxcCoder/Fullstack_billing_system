from model.base_model import BaseModel
from typing import Optional, List, Any, cast

class Cliente(BaseModel):
    table_name = "cliente"
    pk_field = "id_cliente"

    def __init__(
        self,
        id_cliente: Optional[int] = None,
        nombre: Optional[str] = None,
        email: Optional[str] = None
    ):
        self.id_cliente = id_cliente
        self.nombre = nombre
        self.email = email

    # Guardar (insert / update)
    def save(self) -> bool:
        data = self.to_dict()
        if self.id_cliente is None:
            return self.insert(data)
        else:
            return self.update(self.id_cliente, data)

    # CRUD
    @classmethod
    def get(cls, id_cliente: int) -> Optional["Cliente"]:
        result = cls.get_by_id(id_cliente, cls)
        return cast(Optional["Cliente"], result)

    @classmethod
    def get_all(cls) -> List["Cliente"]:
        return [cast("Cliente", r) for r in cls.list_all(cls)]

    @classmethod
    def delete(cls, id_value: int) -> bool:
        return super().delete(id_value)

    # Conversión a diccionario
    def to_dict(self) -> dict[str, Any]:
        return {
            "id_cliente": self.id_cliente,
            "nombre": self.nombre,
            "email": self.email
        }
