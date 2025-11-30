from Billing_Backend.model.base_model import BaseModel
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

    # -------------------------
    #   SERIALIZACIÓN
    # -------------------------
    def to_dict(self) -> dict:
        """
        Devuelve un diccionario listo para INSERT/UPDATE.
        No incluye la PK si es None.
        """
        data = {
            "id_factura": self.id_factura,
            "id_producto": self.id_producto,
            "cantidad": self.cantidad,
            "precio_unitario": self.precio_unitario,
        }
        if self.id_detalle is not None:
            data["id_detalle"] = self.id_detalle
        return data

    # -------------------------
    #        CRUD
    # -------------------------
    def save(self) -> bool:
        """
        Inserta o actualiza el registro.
        """
        data = self.to_dict()

        if self.id_detalle is None:
            # INSERT
            new_id = self.insert(data)
            if new_id is not None:
                self.id_detalle = new_id
                return True
            return False

        # UPDATE
        return self.update(self.id_detalle, data)

    @classmethod
    def get(cls, id_detalle: int) -> Optional["DetalleFactura"]:
        """
        Devuelve un objeto DetalleFactura por su ID.
        """
        result = cls.get_by_id(id_detalle, cls)
        return cast(Optional["DetalleFactura"], result)

    @classmethod
    def all(cls) -> List["DetalleFactura"]:
        """
        Devuelve todos los registros como lista de objetos.
        """
        return [cast("DetalleFactura", r) for r in cls.list_all(cls)]

    @classmethod
    
    def delete_by_id(cls, id_detalle: int) -> bool:
        """
        Elimina un registro por su ID.
        """
        return cls.delete(id_detalle)
