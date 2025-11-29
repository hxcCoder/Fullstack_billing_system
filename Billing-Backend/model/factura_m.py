from .base_model import BaseModel
from typing import Optional, List, cast

class Factura(BaseModel):
    table_name = "factura"
    pk_field = "id_factura"

    def __init__(
        self,
        id_factura: Optional[int] = None,
        id_cliente: Optional[int] = None,
        fecha: Optional[str] = None,  # o datetime según tu DB
        total: float = 0.0
    ):
        self.id_factura = id_factura
        self.id_cliente = id_cliente
        self.fecha = fecha
        self.total = total

    def save(self) -> bool:
        data = self.to_dict()
        if self.id_factura is None:
            return self.insert(data)
        else:
            return self.update(self.id_factura, data)

    @classmethod
    def get(cls, id_factura: int) -> Optional["Factura"]:
        result = BaseModel.get_by_id(id_factura, cls)
        return cast(Optional["Factura"], result)

    @classmethod
    def all(cls) -> List["Factura"]:
        return [cast("Factura", r) for r in BaseModel.list_all(cls)]

    @classmethod
    def delete_by_id(cls, id_factura: int) -> bool:
        return BaseModel.delete(id_factura)

    def to_dict(self) -> dict:
        return {
            "id_factura": self.id_factura,
            "id_cliente": self.id_cliente,
            "fecha": self.fecha,
            "total": self.total,
        }
