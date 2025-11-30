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

    def to_dict(self) -> dict:
        """
        Dict listo para INSERT/UPDATE.
        """
        data = {
            "id_factura": self.id_factura,
            "metodo_pago": self.metodo_pago,
            "monto": self.monto
        }

        if self.id_pago is not None:
            data["id_pago"] = self.id_pago

        return data

    def save(self) -> bool:
        """
        Inserta o actualiza dependiendo si existe id_pago.
        """
        data = self.to_dict()

        # INSERT
        if self.id_pago is None:
            new_id = self.insert(data)
            if new_id:
                self.id_pago = new_id
                return True
            return False

        # UPDATE
        return self.update(self.id_pago, data)

    @classmethod
    def get(cls, id_pago: int) -> Optional["Pago"]:
        result = cls.get_by_id(id_pago, cls)
        return cast(Optional["Pago"], result)

    @classmethod
    def get_all(cls) -> List["Pago"]:
        return [cast("Pago", r) for r in cls.list_all(cls)]

    @classmethod
    def delete_by_id(cls, id_pago: int) -> bool:
        return cls.delete(id_pago)
