from .base_model import BaseModel
from typing import Optional, List, cast

class DetalleFactura(BaseModel):
    table_name = "detalle_factura"
    pk_field = "id_detalle"

    def __init__(
        self,
        id_detalle: Optional[int] = None,
        id_factura: Optional[int] = None,
        id_producto: Optional[int] = None,
        cantidad: Optional[int] = None,
        precio_unitario: Optional[float] = None,
    ):
        self.id_detalle = id_detalle
        self.id_factura = id_factura
        self.id_producto = id_producto
        self.cantidad = cantidad
        self.precio_unitario = precio_unitario

    def save(self) -> bool:
        data = self.to_dict()
        if self.id_detalle is None:
            return self.insert(data)
        else:
            return self.update(self.id_detalle, data)

    @classmethod
    def get(cls, id_detalle: int) -> Optional["DetalleFactura"]:
        result = BaseModel.get_by_id(id_detalle, cls)
        return cast(Optional["DetalleFactura"], result)

    @classmethod
    def all(cls) -> List["DetalleFactura"]:
        return [cast("DetalleFactura", r) for r in BaseModel.list_all(cls)]

    @classmethod
    def delete_by_id(cls, id_detalle: int) -> bool:
        return BaseModel.delete(id_detalle)

    def to_dict(self) -> dict:
        return {
            "id_detalle": self.id_detalle,
            "id_factura": self.id_factura,
            "id_producto": self.id_producto,
            "cantidad": self.cantidad,
            "precio_unitario": self.precio_unitario,
        }
