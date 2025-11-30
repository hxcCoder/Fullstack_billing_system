from Billing_Backend.model.base_model import BaseModel
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
        self.id_producto = id_producto
        self.nombre = nombre
        self.precio = precio
        self.stock = stock

    # ---------------------------
    #      SERIALIZACIÓN
    # ---------------------------
    def to_dict(self) -> dict:
        """
        Diccionario listo para INSERT/UPDATE.
        """
        data = {
            "nombre": self.nombre,
            "precio": self.precio,
            "stock": self.stock
        }

        if self.id_producto is not None:
            data["id_producto"] = self.id_producto

        return data

    # ---------------------------
    #         CRUD
    # ---------------------------
    def save(self) -> bool:
        """
        Inserta si no hay id_producto; actualiza si existe.
        """
        data = self.to_dict()

        if self.id_producto is None:
            new_id = self.insert(data)
            if new_id is not None:
                self.id_producto = new_id
                return True
            return False

        return self.update(self.id_producto, data)

    @classmethod
    def get(cls, id_producto: int) -> Optional["Producto"]:
        result = cls.get_by_id(id_producto, cls)
        return cast(Optional["Producto"], result)

    @classmethod
    def all(cls) -> List["Producto"]:
        return [cast("Producto", r) for r in cls.list_all(cls)]

    @classmethod
    def delete_by_id(cls, id_producto: int) -> bool:
        return cls.delete(id_producto)
