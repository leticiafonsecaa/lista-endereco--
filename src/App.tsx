import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from 'zod'



export function App() {
  const regrasFormulario = z.object({
    nome: z.string().min(1, 'Este campo é obrigatório.').max(20, 'Máximo de 20 caracteres.'),
    email: z.email('Campo obrigatório.'),
    cep: z.string().min(1, 'Campo obrigatório.'),
    rua: z.string().min(1, 'Campo obrigatório.'),
    numero: z.string().min(1, 'Campo obrigatório.'),
    bairro: z.string().min(1, 'Campo obrigatório.'),
    cidade: z.string().min(1, 'Campo obrigatório.'),
    uf: z.string().min(1, 'Campo obrigatório.').max(2, 'Utilizar sigla.')
  })

  type FormType = z.infer<typeof regrasFormulario>

  function enviaFormulario(dados: FormType) {
    // adiciona o novo endereço na lista
    setEnderecos((listaAntiga) => [...listaAntiga, dados])

    // limpa o formulário
    formulario.reset()
  }


  const [enderecos, setEnderecos] = useState<FormType[]>([])

  const formulario = useForm<FormType>({
    resolver: zodResolver(regrasFormulario),
  })
  

  return (
    <>
      <div>
        <h1 className="font-sans">Cadastro de Endereços</h1>

        <form onSubmit={formulario.handleSubmit(enviaFormulario)}>

          {/*nome*/} 
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <label htmlFor="nome" className="text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input className="w-full border px-2 py-1"{...formulario.register('nome')} />
              {formulario.formState.errors.nome && (<p className="text-red-500 text-sm">{formulario.formState.errors.nome.message}</p>)}
            </div>
            
           {/*email*/} 
            <div className="col-span-12">
              <label htmlFor="nome" className="text-sm font-medium text-gray-700 mb-1">Email</label>
              <input className="w-full border px-2 py-1"{...formulario.register('email')} />
              {formulario.formState.errors.email && (<p className="text-red-500 text-sm">{formulario.formState.errors.email.message}</p>)}
            </div>

            {/*CEP*/} 
            <div className="col-span-12">
              <label htmlFor="nome" className="text-sm font-medium text-gray-700 mb-1">CEP</label>
              <input className="w-full border px-2 py-1"{...formulario.register('cep')} />
              {formulario.formState.errors.cep && (<p className="text-red-500 text-sm">{formulario.formState.errors.cep.message}</p>)}
            </div>

            {/*Rua*/} 
            <div className="col-span-12">
              <label htmlFor="nome" className="text-sm font-medium text-gray-700 mb-1">Rua</label>
              <input className="w-full border px-2 py-1"{...formulario.register('rua')} />
              {formulario.formState.errors.rua && (<p className="text-red-500 text-sm">{formulario.formState.errors.rua.message}</p>)}
            </div>

            {/*Numero*/} 
            <div className="col-span-12">
              <label htmlFor="nome" className="text-sm font-medium text-gray-700 mb-1">Numero</label>
              <input className="w-full border px-2 py-1"{...formulario.register('numero')} />
              {formulario.formState.errors.numero && (<p className="text-red-500 text-sm">{formulario.formState.errors.numero.message}</p>)}
            </div>

            {/*Bairro*/} 
            <div className="col-span-12">
              <label htmlFor="nome" className="text-sm font-medium text-gray-700 mb-1">Bairro</label>
              <input className="w-full border px-2 py-1"{...formulario.register('bairro')} />
              {formulario.formState.errors.bairro && (<p className="text-red-500 text-sm">{formulario.formState.errors.bairro.message}</p>)}
            </div>

            {/*Cidade*/} 
            <div className="col-span-12">
              <label htmlFor="nome" className="text-sm font-medium text-gray-700 mb-1">Cidade</label>
              <input className="w-full border px-2 py-1"{...formulario.register('cidade')} />
              {formulario.formState.errors.cidade && (<p className="text-red-500 text-sm">{formulario.formState.errors.cidade.message}</p>)}
            </div>

            {/*Uf*/} 
            <div className="col-span-12">
              <label htmlFor="nome" className="text-sm font-medium text-gray-700 mb-1">UF</label>
              <input className="w-full border px-2 py-1"{...formulario.register('rua')} />
              {formulario.formState.errors.rua && (<p className="text-red-500 text-sm">{formulario.formState.errors.rua.message}</p>)}
            </div>
          </div>

          <div>
            <button
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition font-medium"
              type="reset">
              Limpar
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
              type="submit">
              Enviar
            </button>
          </div>

        </form>
      </div>
    </>
  )
}

export default App
  