from Billing_Backend.config.db_config import get_db
from typing import Type, List, Optional, Any, Dict, TypeVar, cast

T = TypeVar("T", bound="BaseModel")

class BaseModel:
    """
    Clase base para todos los modelos del sistema.
    Provee operaciones CRUD genéricas usando PostgreSQL con RealDictCursor.
    """

    table_name: str = ""
    pk_field: str = "id"

    # -----------------------------
    # INSERT
    # -----------------------------
    @classmethod
    def insert(cls, data: Dict[str, Any]) -> Optional[int]:
        if not cls.table_name:
            raise ValueError("table_name no definido en el modelo")

        columns = ", ".join(data.keys())
        placeholders = ", ".join(["%s"] * len(data))
        values = tuple(data.values())

        query = f"INSERT INTO {cls.table_name} ({columns}) VALUES ({placeholders}) RETURNING {cls.pk_field}"

        with next(get_db()) as cur:
            try:
                cur.execute(query, values)
                row = cur.fetchone()
                return row[cls.pk_field] if row else None
            except Exception as e:
                print(f"[ERROR] INSERT en {cls.table_name}: {e}")
                return None

    # -----------------------------
    # GET BY ID
    # -----------------------------
    @classmethod
    def get_by_id(cls, id_value: Any, model_class: Type['BaseModel']) -> Optional['BaseModel']:
        if not cls.table_name:
            raise ValueError("table_name no definido en el modelo")

        query = f"SELECT * FROM {cls.table_name} WHERE {cls.pk_field} = %s"

        with next(get_db()) as cur:
            try:
                cur.execute(query, (id_value,))
                row = cur.fetchone()
                return model_class(**row) if row else None
            except Exception as e:
                print(f"[ERROR] GET_BY_ID en {cls.table_name}: {e}")
                return None

    # -----------------------------
    # LIST ALL
    # -----------------------------
    @classmethod
    def list_all(cls, model_class: Type['BaseModel']) -> List['BaseModel']:
        if not cls.table_name:
            raise ValueError("table_name no definido en el modelo")

        query = f"SELECT * FROM {cls.table_name}"

        with next(get_db()) as cur:
            try:
                cur.execute(query)
                rows = cur.fetchall() or []
                return [model_class(**r) for r in rows]
            except Exception as e:
                print(f"[ERROR] LIST_ALL en {cls.table_name}: {e}")
                return []

    # -----------------------------
    # DELETE
    # -----------------------------
    @classmethod
    def delete(cls, id_value: Any) -> bool:
        if not cls.table_name:
            raise ValueError("table_name no definido en el modelo")

        query = f"DELETE FROM {cls.table_name} WHERE {cls.pk_field} = %s"

        with next(get_db()) as cur:
            try:
                cur.execute(query, (id_value,))
                return cur.rowcount > 0
            except Exception as e:
                print(f"[ERROR] DELETE en {cls.table_name}: {e}")
                return False

    # -----------------------------
    # UPDATE
    # -----------------------------
    @classmethod
    def update(cls, id_value: Any, data: Dict[str, Any]) -> bool:
        if not cls.table_name:
            raise ValueError("table_name no definido en el modelo")
        if not data:
            raise ValueError("No se proporcionaron datos para actualizar")

        set_clause = ", ".join([f"{key} = %s" for key in data.keys()])
        values = tuple(data.values()) + (id_value,)

        query = f"UPDATE {cls.table_name} SET {set_clause} WHERE {cls.pk_field} = %s"

        with next(get_db()) as cur:
            try:
                cur.execute(query, values)
                return cur.rowcount > 0
            except Exception as e:
                print(f"[ERROR] UPDATE en {cls.table_name}: {e}")
                return False

    # -----------------------------
    # ALL (helper)
    # -----------------------------
    @classmethod
    def all(cls: type[T]) -> List[T]:
        return [cast(T, r) for r in cls.list_all(cls)]
