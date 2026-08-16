import { useState } from 'react'

function Form() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // logique d'envoi (appel API, etc.)
        console.log('Email soumis :', email)
    }

    return (
        <>
        <form onSubmit={handleSubmit} className=" flex flex-col justify-center pl-6">

            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="mail"
                className="border-b-2 border-black pb-1 mb-4 bg-transparent outline-none font-gravitas text-txt text-black"
            />

            <button
                type="submit"
                className="text-red-600 font-gravitas font-bold text-left hover:underline"
            >
                Je m'abonne
            </button>

        </form>
        </>
    )
}

export default Form