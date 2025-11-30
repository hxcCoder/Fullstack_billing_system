from Billing_Backend.model.base_model import BaseModel
from typing import Optional, List, cast

class Pago(BaseModel):
    table_name = "pago"
    pk_field = "id_pago"

    def __init__(
        self,
        id_pago: Optional[int] = None,
        id_factura: Optional[int] = None,
        metodo_pago: Optional[str] = None,
        monto: Optional[float] = None
    ):
        self.id_pago = id_pago
        self.id_factura = id_factura
        self.metodo_pago = metodo_pago
        self.monto = monto

    # ---------------------------
    #      SERIALIZACIÓN
    # ---------------------------
    def to_dict(self) -> dict:
        """
        Diccionario listo para INSERT/UPDATE.
        """
        data = {
            "id_factura": self.id_factura,
            "metodo_pago": self.metodo_pago,
            "monto": self.monto
        }

        if self.id_pago is not None:
            data["id_pago"] = self.id_pago

        return data

    # ---------------------------
    #         CRUD
    # ---------------------------
    def save(self) -> bool:
        """
        Inserta si no hay id_pago; actualiza si existe.
        """
        data = self.to_dict()

        if self.id_pago is None:
            # INSERT
            new_id = self.insert(data)
            if new_id is not None:
                self.id_pago = new_id
                return True
            return False

        # UPDATE
        return self.update(self.id_pago, data)

    @classmethod
    def get(cls, id_pago: int) -> Optional["Pago"]:
        """
        Devuelve un objeto Pago por su ID.
        """
        result = cls.get_by_id(id_pago, cls)
        return cast(Optional["Pago"], result)

    @classmethod
    def all(cls) -> List["Pago"]:
        """
        Devuelve todos los registros como lista de objetos.
        """
        return [cast("Pago", r) for r in cls.list_all(cls)]

    @classmethod
    def delete_by_id(cls, id_pago: int) -> bool:
        """
        Elimina un registro por su ID.
        """
        return cls.delete(id_pago)
