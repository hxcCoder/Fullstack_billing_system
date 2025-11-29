import { useEffect } from "react"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  useEffect(() => {
    const token = getCookie("token")
    if (!token) router.push("/login")
  }, [])

    return <>{children}</>
}
