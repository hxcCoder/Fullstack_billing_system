from Billing_Backend.model.base_model import BaseModel
from typing import Optional, List, Any, cast

class DetalleFactura(BaseModel):
    table_name = "detalle_factura"
    pk_field = "id_detalle"

    def __init__(
        self,
        id_detalle: Optional[int] = None,
        id_factura: Optional[int] = None,
        id_producto: Optional[int] = None,
        cantidad: Optional[int] = None,
        precio_unitario: Optional[float] = 0.0,
    ):
        self.id_detalle = id_detalle
        self.id_factura = id_factura
        self.id_producto = id_producto
        self.cantidad = cantidad
        self.precio_unitario = precio_unitario

    # Guardar (insert / update)
    def save(self) -> bool:
        data = self.to_dict()
        if self.id_detalle is None:
            return self.insert(data)
        else:
            return self.update(self.id_detalle, data)

    # CRUD
    @classmethod
    def get(cls, id_detalle: int) -> Optional["DetalleFactura"]:
        result = cls.get_by_id(id_detalle, cls)
        return cast(Optional["DetalleFactura"], result)

    @classmethod
    def get_all(cls) -> List["DetalleFactura"]:
        return [cast("DetalleFactura", r) for r in cls.list_all(cls)]

    @classmethod
    def delete(cls, id_value: int) -> bool:
        return super().delete(id_value)

    # Conversión a diccionario
    def to_dict(self) -> dict[str, Any]:
        return {
            "id_detalle": self.id_detalle,
            "id_factura": self.id_factura,
            "id_producto": self.id_producto,
            "cantidad": self.cantidad,
            "precio_unitario": self.precio_unitario,
        }
