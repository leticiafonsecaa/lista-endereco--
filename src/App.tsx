import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const regrasFormulario = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  cep: z.string().min(1, "CEP é obrigatório"),
  rua: z.string().min(1, "Rua é obrigatória"),
  numero: z.string().min(1, "Número é obrigatório"),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  uf: z.string().min(2, "UF obrigatória").max(2, "Use a sigla"),
});

type FormularioType = z.infer<typeof regrasFormulario>;

export function App() {
  const [enderecos, setEnderecos] = useState<FormularioType[]>([]);

  const formulario = useForm<FormularioType>({
    resolver: zodResolver(regrasFormulario),
  });

  function enviarFormulario(dados: FormularioType) {
    setEnderecos([...enderecos, dados]);
    formulario.reset();
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Endereços</h1>

      <form
        onSubmit={formulario.handleSubmit(enviarFormulario)}
        className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4"
        noValidate
      >
        <div>
          <label>Nome</label>
          <input className="input" {...formulario.register("nome")} />
          <p className="erro">{formulario.formState.errors.nome?.message}</p>
        </div>

        <div>
          <label>Email</label>
          <input className="input" {...formulario.register("email")} />
          <p className="erro">{formulario.formState.errors.email?.message}</p>
        </div>

        <div>
          <label>CEP</label>
          <input className="input" {...formulario.register("cep")} />
          <p className="erro">{formulario.formState.errors.cep?.message}</p>
        </div>

        <div>
          <label>Rua</label>
          <input className="input" {...formulario.register("rua")} />
          <p className="erro">{formulario.formState.errors.rua?.message}</p>
        </div>

        <div>
          <label>Número</label>
          <input className="input" {...formulario.register("numero")} />
          <p className="erro">{formulario.formState.errors.numero?.message}</p>
        </div>

        <div>
          <label>Bairro</label>
          <input className="input" {...formulario.register("bairro")} />
          <p className="erro">{formulario.formState.errors.bairro?.message}</p>
        </div>

        <div>
          <label>Cidade</label>
          <input className="input" {...formulario.register("cidade")} />
          <p className="erro">{formulario.formState.errors.cidade?.message}</p>
        </div>

        <div>
          <label>UF</label>
          <input className="input" {...formulario.register("uf")} />
          <p className="erro">{formulario.formState.errors.uf?.message}</p>
        </div>

        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">Endereços Cadastrados</h2>

      <ul className="space-y-3">
        {enderecos.map((endereco, index) => (
          <li key={index} className="bg-white p-4 rounded shadow">
            <p>
              <strong>Nome:</strong> {endereco.nome}
            </p>
            <p>
              <strong>Email:</strong> {endereco.email}
            </p>
            <p>
              <strong>Endereço:</strong> {endereco.rua}, {endereco.numero} -{" "}
              {endereco.bairro}, {endereco.cidade}/{endereco.uf}
            </p>
            <p>
              <strong>CEP:</strong> {endereco.cep}
            </p>
          </li>
        ))}
      </ul>

      <style>{`
        .input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .erro {
          color: red;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}
export default App;
