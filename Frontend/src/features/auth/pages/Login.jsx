

export const Login = () => {
  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-center  p-10 gap-2">
      <section className="flex flex-col items-center justify-center gap-5 bg-[#1e88e5] p-10 border-4 border-[#bbdefb]">
        <h1 className="text-[#0d47a1]">Login</h1>
        <input className="p-2 rounded-md text-[#bbdefb]" type="email" placeholder="Enter your email" required/>
        <input className="p-2 rounded-md text-[#bbdefb]" type="password" placeholder="Enter your password" required />
        <button className="bg-[#0d47a1] p-2 rounded-md">Login</button>
      </section>
    </main>
    </>
  )
}
