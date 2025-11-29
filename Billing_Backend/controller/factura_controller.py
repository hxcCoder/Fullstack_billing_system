from Billing_Backend.model.base_model import BaseModel
from typing import Optional, List, Any, Type, cast

class Factura(BaseModel):
    table_name = "factura"
    pk_field = "id_factura"

    def __init__(
        self,
        id_factura: Optional[int] = None,
        id_cliente: Optional[int] = None,
        fecha: Optional[str] = None,  # o datetime según tu DB
        total: Optional[float] = 0.0
    ):
        self.id_factura = id_factura
        self.id_cliente = id_cliente
        self.fecha = fecha
        self.total = total

    # Guardar (insert / update)
    def save(self) -> bool:
        data = self.to_dict()
        if self.id_factura is None:
            return self.insert(data)
        else:
            return self.update(self.id_factura, data)

    # CRUD
    @classmethod
    def get(cls, id_factura: int) -> Optional["Factura"]:
        result = cls.get_by_id(id_factura, cls)
        return cast(Optional["Factura"], result)

    @classmethod
    def get_all(cls) -> List["Factura"]:
        return [cast("Factura", r) for r in cls.list_all(cls)]

    @classmethod
    def delete(cls, id_value: int) -> bool:
        return super().delete(id_value)

    # Conversión a diccionario
    def to_dict(self) -> dict[str, Any]:
        return {
            "id_factura": self.id_factura,
            "id_cliente": self.id_cliente,
            "fecha": self.fecha,
            "total": self.total,
        }
