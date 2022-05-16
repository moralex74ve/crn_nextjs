import { useRouter } from "next/router"

export default function LoginPage() {
    const router = useRouter()
     

  return (
      <>
            <div className="container">
                <div className=" m-4 p-5 d-flex justify-content-center align-items-center ;"  >
                        <button
                            className="btn btn-lg btn-primary text-center  "
                            onClick={() => router.push('/api/auth/signin')}
                        >
                            Logueate Para Entrar
                        </button> 
                </div>
            </div>
        </>
  )
}
