import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const regrasFormulario = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  cep: z.string().min(1, "CEP é obrigatório").min(8, "CEP inválido. Ex: 00000-000"),
  rua: z.string().min(1, "Rua é obrigatório"),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatório"),
  uf: z.string().min(1, "UF é obrigatório").max(2, "Use a sigla"),
})

type TypeForm = z.infer<typeof regrasFormulario>

function App() {
  const [lista, setLista] = useState<TypeForm[]>([])

  const {
    register, //conecta o campo
    handleSubmit, //valida os dados
    reset, //limpa os campos
    formState: { errors },  //é um objeto que contém os erros de validação
  } = useForm<TypeForm>({
    resolver: zodResolver(regrasFormulario), //resolver: define qual validador será usado; zodResolver: conecta Zod ao React Hook Form
  })

  const onSubmit = (data: TypeForm) => { //Recebe os dados do formulário
    setLista((prev) => [...prev, data]) // (prev) Pegue o valor anterior da lista; [...prev, data] Crie um novo array com tudo que já existia + o novo item
    reset()
  }

  const handleClear = () => {
    reset()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-6 gap-8">

      <div className="bg-violet-200 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800"> Cadastro de Endereço</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* NOME */}
          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium text-gray-700"> Nome</label>
            <input
              {...register("nome")}
              className="border border-violet-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu nome"
            />
            {errors.nome && (
              <span className="text-red-500 text-sm mt-1">
                {errors.nome.message}
              </span>
            )}
          </div>

          {/* EMAIL */}
          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email")}
              className="border border-violet-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* CEP */}
          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium text-gray-700">CEP</label>
            <input
              {...register("cep")}
              className="border border-violet-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu CEP"
            />
            {errors.cep && (
              <span className="text-red-500 text-sm mt-1">
                {errors.cep.message}
              </span>
            )}
          </div>

          {/* RUA */}
          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium text-gray-700">Rua</label>
            <input
              {...register("rua")}
              className="border border-violet-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a Rua"
            />
            {errors.rua && (
              <span className="text-red-500 text-sm mt-1">
                {errors.rua.message}
              </span>
            )}
          </div>

          {/* BAIRRO */}
          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium text-gray-700">Bairro</label>
            <input
              {...register("bairro")}
              className="border border-violet-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o Bairro"
            />
            {errors.bairro && (
              <span className="text-red-500 text-sm mt-1">
                {errors.bairro.message}
              </span>
            )}
          </div>

          {/* CIDADE */}
          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium text-gray-700">Cidade</label>
            <input
              {...register("cidade")}
              className="border border-violet-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a Cidade"
            />
            {errors.cidade && (
              <span className="text-red-500 text-sm mt-1">
                {errors.cidade.message}
              </span>
            )}
          </div>

          {/* UF */}
          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium text-gray-700">UF</label>
            <input
              {...register("uf")}
              className="border border-violet-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o UF Ex: RJ"
            />
            {errors.uf && (
              <span className="text-red-500 text-sm mt-1">
                {errors.uf.message}
              </span>
            )}
          </div>

          {/* BOTÕES */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
            >
              Enviar
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition duration-300 font-semibold"
            >
              Limpar
            </button>
          </div>

        </form>
      </div>

      {/* LISTA DE DADOS */}
      {lista.length > 0 && (
        <div className="bg-violet-200 p-6 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Dados Enviados
          </h2>

          <ul className="flex flex-col gap-3">
            {lista.map((item, index) => (
              <li
                key={index}
                className="border p-3 rounded-lg bg-violet-100"
              >
                <p><strong>Nome:</strong> {item.nome}</p>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>CEP:</strong> {item.cep}</p>
                <p><strong>Rua:</strong> {item.rua}</p>
                <p><strong>Bairro:</strong> {item.bairro}</p>
                <p><strong>Cidade:</strong> {item.cidade}</p>
                <p><strong>UF:</strong> {item.uf}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App