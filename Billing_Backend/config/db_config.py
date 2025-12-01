# Billing_Backend/config/db_config.py
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db():
    conn = psycopg2.connect(
        host="localhost",
        database="billing_system",
        user="postgres",
        password="TU_PASSWORD",
        port=5432
    )
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        yield cur
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        cur.close()
        conn.close()
