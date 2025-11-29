import { API_URL } from "./api"

// ---------- PRODUCTOS ----------
export async function getProductos() {
  const res = await fetch(`${API_URL}/productos/`, { cache: "no-store" })
  if (!res.ok) throw new Error("Error obteniendo productos")
  return res.json()
}

export async function createProducto(data: {
  nombre: string
  precio: number
  stock: number
}) {
  const res = await fetch(`${API_URL}/productos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

// ---------- CLIENTES ----------
export async function getClientes() {
  const res = await fetch(`${API_URL}/clientes/`, { cache: "no-store" })
  if (!res.ok) throw new Error("Error obteniendo clientes")
  return res.json()
}

export async function createCliente(data: {
  nombre: string
  email: string
}) {
  const res = await fetch(`${API_URL}/clientes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

// ---------- FACTURAS ----------
export async function getFacturas() {
  const res = await fetch(`${API_URL}/facturas/`)
  if (!res.ok) throw new Error("Error obteniendo facturas")
  return res.json()
}

export async function createFactura(data: {
  id_cliente: number
  fecha: string
  total: number
}) {
  const res = await fetch(`${API_URL}/facturas/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}
