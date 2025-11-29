"use client"

import { useState } from "react"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()

    await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    alert("Usuario creado (siempre que el backend esté listo)")
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4 p-6 border rounded-xl shadow">
        <h1 className="text-2xl font-bold">Crear Cuenta</h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          Registrarse
        </button>
      </form>
    </div>
  )
}
