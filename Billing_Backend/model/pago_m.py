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
        self.id_pago: Optional[int] = id_pago
        self.id_factura: Optional[int] = id_factura
        self.metodo_pago: Optional[str] = metodo_pago
        self.monto: Optional[float] = monto

    def to_dict(self) -> dict:
        return {
            "id_pago": self.id_pago,
            "id_factura": self.id_factura,
            "metodo_pago": self.metodo_pago,
            "monto": self.monto
        }

    def save(self) -> bool:
        data = self.to_dict()
        return self.insert(data) if self.id_pago is None else self.update(self.id_pago, data)

    @classmethod
    def get(cls, id_pago: int) -> Optional["Pago"]:
        result = cls.get_by_id(id_pago, cls)
        return cast(Optional["Pago"], result)

    @classmethod
    def all(cls) -> List["Pago"]:
        return [cast("Pago", r) for r in cls.list_all(cls)]

    @classmethod
    def delete_by_id(cls, id_pago: int) -> bool:
        return cls.delete(id_pago)
