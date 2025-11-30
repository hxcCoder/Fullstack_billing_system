from Billing_Backend.model.base_model import BaseModel
from typing import Optional, List, cast, Union
from datetime import datetime

class Factura(BaseModel):
    table_name = "factura"
    pk_field = "id_factura"

    def __init__(
        self,
        id_factura: Optional[int] = None,
        id_cliente: Optional[int] = None,
        fecha: Optional[Union[str, datetime]] = None,
        total: float = 0.0
    ):
        self.id_factura = id_factura
        self.id_cliente = id_cliente
        self.fecha = fecha
        self.total = total

    # ---------------------------
    #  SERIALIZACIÓN / DICT
    # ---------------------------
    def to_dict(self) -> dict:
        """
        Devuelve un diccionario listo para INSERT/UPDATE.
        """
        data = {
            "id_cliente": self.id_cliente,
            "fecha": self._format_fecha(self.fecha),
            "total": self.total,
        }
        return data

    def _format_fecha(self, fecha):
        """Convierte datetime a string si fuese necesario."""
        if isinstance(fecha, datetime):
            return fecha.strftime("%Y-%m-%d %H:%M:%S")
        return fecha

    # ---------------------------
    #        CRUD
    # ---------------------------
    def save(self) -> bool:
        """
        Inserta o actualiza el registro.
        """
        data = self.to_dict()

        if self.id_factura is None:
            # INSERT
            new_id = self.insert(data)
            if new_id is not None:
                self.id_factura = new_id
                return True
            return False

        # UPDATE
        return self.update(self.id_factura, data)

    @classmethod
    def get(cls, id_factura: int) -> Optional["Factura"]:
        """
        Devuelve un objeto Factura por su ID.
        """
        result = cls.get_by_id(id_factura, cls)
        return cast(Optional["Factura"], result)

    @classmethod
    def all(cls) -> List["Factura"]:
        """
        Devuelve todos los registros como lista de objetos.
        """
        return [cast("Factura", r) for r in cls.list_all(cls)]

    @classmethod
    def delete_by_id(cls, id_factura: int) -> bool:
        """
        Elimina un registro por su ID.
        """
        return cls.delete(id_factura)
