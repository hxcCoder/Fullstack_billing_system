import psycopg2
from psycopg2.extras import RealDictCursor
import os

class ConexionPostgres:
    _connection = None

    @classmethod
    def get_connection(cls):
        if cls._connection is None:
            cls._connection = psycopg2.connect(
                host=os.getenv("DB_HOST", "localhost"),
                port=os.getenv("DB_PORT", "5432"),
                database=os.getenv("DB_NAME", "billing"),
                user=os.getenv("DB_USER", "postgres"),
                password=os.getenv("DB_PASSWORD", "postgres"),
                cursor_factory=RealDictCursor
            )
        return cls._connection


def get_db():
    conn = ConexionPostgres.get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)  # <--- aquí
    try:
        yield cur
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cur.close()

