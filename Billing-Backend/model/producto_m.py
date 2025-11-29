from .base_model import BaseModel
from typing import Optional, List, cast

class Producto(BaseModel):
    table_name = "producto"
    pk_field = "id_producto"

    def __init__(
        self,
        id_producto: Optional[int] = None,
        nombre: Optional[str] = None,
        precio: Optional[float] = 0.0,
        stock: Optional[int] = 0
    ):
        self.id_producto: Optional[int] = id_producto
        self.nombre: Optional[str] = nombre
        self.precio: Optional[float] = precio
        self.stock: Optional[int] = stock

    def to_dict(self) -> dict:
        return {
            "id_producto": self.id_producto,
            "nombre": self.nombre,
            "precio": self.precio,
            "stock": self.stock
        }

    def save(self) -> bool:
        data = self.to_dict()
        return self.insert(data) if self.id_producto is None else self.update(self.id_producto, data)

    @classmethod
    def get(cls, id_producto: int) -> Optional["Producto"]:
        result = cls.get_by_id(id_producto, cls)
        return cast(Optional["Producto"], result)

    @classmethod
    def get_all(cls) -> List["Producto"]:
        return [cast("Producto", r) for r in cls.list_all(cls)]

    @classmethod
    def delete_by_id(cls, id_producto: int) -> bool:
        return cls.delete(id_producto)
