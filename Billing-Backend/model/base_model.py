# model/base_model.py
from config.db_config import ConexionOracle
from typing import Type, List, Optional, Any, Dict, TypeVar, cast

T = TypeVar("T", bound="BaseModel")

class BaseModel:
    """
    Clase base para todos los modelos del sistema.
    Provee operaciones CRUD genéricas usando Oracle.
    """

    table_name: str = ""
    pk_field: str = "id"

    @classmethod
    def insert(cls, data: Dict[str, Any]) -> bool:
        if not cls.table_name:
            raise ValueError("table_name no definido en el modelo")

        conn = ConexionOracle().get_connection()
        columns = ", ".join(data.keys())
        placeholders = ", ".join([f":{k}" for k in data.keys()])
        query = f"INSERT INTO {cls.table_name} ({columns}) VALUES ({placeholders})"

        cursor = conn.cursor()
        try:
            cursor.execute(query, data)
            conn.commit()
            return True
        except Exception as e:
            print(f"[ERROR] INSERT en {cls.table_name}: {e}")
            return False
        finally:
            cursor.close()

    @classmethod
    def get_by_id(cls, id_value: Any, model_class: Type['BaseModel']) -> Optional['BaseModel']:
        if not cls.table_name:
            raise ValueError("table_name no definido en el modelo")

        conn = ConexionOracle().get_connection()
        cursor = conn.cursor()
        try:
            query = f"SELECT * FROM {cls.table_name} WHERE {cls.pk_field} = :id"
            cursor.execute(query, {"id": id_value})
            row = cursor.fetchone()
            if row is None:
                return None

            # columns seguro: no hay None
            columns = [str(col[0]) for col in (cursor.description or []) if col and col[0] is not None]
            data: Dict[str, Any] = dict(zip(columns, row))
            return model_class(**data)
        except Exception as e:
            print(f"[ERROR] GET_BY_ID en {cls.table_name}: {e}")
            return None
        finally:
            cursor.close()

    @classmethod
    def list_all(cls, model_class: Type['BaseModel']) -> List['BaseModel']:
        if not cls.table_name:
            raise ValueError("table_name no definido en el modelo")

        conn = ConexionOracle().get_connection()
        cursor = conn.cursor()
        try:
            query = f"SELECT * FROM {cls.table_name}"
            cursor.execute(query)
            rows = cursor.fetchall() or []

            columns = [str(col[0]) for col in (cursor.description or []) if col and col[0] is not None]
            result: List['BaseModel'] = []
            for row in rows:
                if row is None:
                    continue
                row_dict: Dict[str, Any] = dict(zip(columns, row))
                result.append(model_class(**row_dict))
            return result
        except Exception as e:
            print(f"[ERROR] LIST_ALL en {cls.table_name}: {e}")
            return []
        finally:
            cursor.close()

    @classmethod
    def delete(cls, id_value: Any) -> bool:
        if not cls.table_name:
            raise ValueError("table_name no definido en el modelo")

        conn = ConexionOracle().get_connection()
        cursor = conn.cursor()
        try:
            query = f"DELETE FROM {cls.table_name} WHERE {cls.pk_field} = :id"
            cursor.execute(query, {"id": id_value})
            conn.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"[ERROR] DELETE en {cls.table_name}: {e}")
            return False
        finally:
            cursor.close()

    @classmethod
    def update(cls, id_value: Any, data: Dict[str, Any]) -> bool:
        if not cls.table_name:
            raise ValueError("table_name no definido en el modelo")
        if not data:
            raise ValueError("No se proporcionaron datos para actualizar")

        conn = ConexionOracle().get_connection()
        cursor = conn.cursor()
        try:
            set_clause = ", ".join([f"{str(k)} = :{k}" for k in data.keys()])
            query = f"UPDATE {cls.table_name} SET {set_clause} WHERE {cls.pk_field} = :id"
            data_with_id: Dict[str, Any] = {**data, "id": id_value}
            cursor.execute(query, data_with_id)
            conn.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"[ERROR] UPDATE en {cls.table_name}: {e}")
            return False
        finally:
            cursor.close()

    @classmethod
    
    def all(cls: type[T]) -> List[T]:
        return [cast(T, r) for r in cls.list_all(cls)]