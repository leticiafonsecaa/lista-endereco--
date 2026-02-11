import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const regrasFormulario = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  cep: z.string().min(1, "CEP obrigatório"),
  rua: z.string().min(1, "Rua obrigatória"),
  numero: z.string().min(1, "Número obrigatório"),
  bairro: z.string().min(1, "Bairro obrigatório"),
  cidade: z.string().min(1, "Cidade obrigatória"),
  uf: z.string().length(2, "Use 2 letras")
})

type FormType = z.infer<typeof regrasFormulario>

function App() {
  const [enderecos, setEnderecos] = useState<FormType[]>([])

  const formulario = useForm<FormType>({
    resolver: zodResolver(regrasFormulario)
  })

  function cadastrarEndereco(dados: FormType) {
    setEnderecos([...enderecos, dados])
    formulario.reset()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white p-6 rounded-md shadow-sm">
        <h1 className="text-xl font-bold mb-6">Cadastro de Endereços</h1>

        <form
          onSubmit={formulario.handleSubmit(cadastrarEndereco)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          noValidate
        >
          {[
            ["nome", "Nome"],
            ["email", "Email"],
            ["cep", "CEP"],
            ["rua", "Rua"],
            ["numero", "Número"],
            ["bairro", "Bairro"],
            ["cidade", "Cidade"],
            ["uf", "UF"]
          ].map(([campo, label]) => (
            <div key={campo} className="flex flex-col">
              <label className="text-sm mb-1">{label}</label>
              <input
                className="border rounded px-3 py-2 text-sm"
                {...formulario.register(campo as keyof FormType)}
              />
              <span className="text-red-500 text-xs">
                {formulario.formState.errors[campo as keyof FormType]?.message}
              </span>
            </div>
          ))}

          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Cadastrar
          </button>
        </form>

        <h2 className="text-lg font-semibold mt-8 mb-4">
          Endereços cadastrados
        </h2>

        {enderecos.length === 0 && (
          <p className="text-sm text-gray-500">
            Nenhum endereço cadastrado.
          </p>
        )}

        <ul className="space-y-3">
          {enderecos.map((endereco, index) => (
            <li
              key={index}
              className="border rounded p-3 text-sm"
            >
              <p><strong>Nome:</strong> {endereco.nome}</p>
              <p><strong>Email:</strong> {endereco.email}</p>
              <p>
                <strong>Endereço:</strong>{" "}
                {endereco.rua}, {endereco.numero} –{" "}
                {endereco.bairro}, {endereco.cidade}/{endereco.uf}
              </p>
              <p><strong>CEP:</strong> {endereco.cep}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
