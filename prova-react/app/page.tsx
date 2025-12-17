"use client";
import { useState, useEffect } from "react";

export default function Endereco() {
  const [form, setForm] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    uf: "",
    cidade: ""
  });
  const [erroCep, setErroCep] = useState(false);
  const [cepInvalido, setCepInvalido] = useState(false);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "cep") {
      setErroCep(value.length > 0 && value.length < 8);
      setCepInvalido(false);
    }
  }

  useEffect(() => {
    if (form.cep.length === 8) {
      setErroCep(false);
      fetch(`https://viacep.com.br/ws/${form.cep}/json/`)
        .then(r => r.json())
        .then(d => {
          if (!d.erro) {
            setForm(f => ({
              ...f,
              rua: d.logradouro,
              bairro: d.bairro,
              uf: d.uf,
              cidade: d.localidade
            }));
            setCepInvalido(false);
          } else{
            setCepInvalido(true);
            setForm(f => ({ ...f, rua: "", bairro: "", uf: "", cidade: "" }));
          }
        })
        .catch(() =>{
          setCepInvalido(true);
        });
    }
  }, [form.cep]);

  return(
    <div>
      <form>
        <h1>Endereço</h1>
        <input
          name="cep"
          value={form.cep}
          onChange={handleInput}
          placeholder="CEP"
          maxLength={8}
          style={{ border: erroCep ? '1px solid red' : '1px solid #ccc', marginBottom: 4, padding: 4, display: 'block' }}
        />
        {erroCep && (
          <span style={{ color: 'red', fontSize: 12 }}>Digite 8 dígitos para o CEP</span>
        )}
        {cepInvalido && (
          <span style={{ color: 'red', fontSize: 12 }}>CEP inválido</span>
        )}
        <input
          name="rua"
          value={form.rua}
          onChange={handleInput}
          placeholder="Rua"
          style={{ border: '1px solid #ccc', marginBottom: 4, padding: 4, display: 'block' }}
        />
        <input
          name="numero"
          value={form.numero}
          onChange={handleInput}
          placeholder="Número"
          style={{ border: '1px solid #ccc', marginBottom: 4, padding: 4, display: 'block' }}
        />
        <input
          name="bairro"
          value={form.bairro}
          onChange={handleInput}
          placeholder="Bairro"
          style={{ border: '1px solid #ccc', marginBottom: 4, padding: 4, display: 'block' }}
        />
        <input
          name="cidade"
          value={form.cidade}
          onChange={handleInput}
          placeholder="Cidade"
          style={{ border: '1px solid #ccc', marginBottom: 4, padding: 4, display: 'block' }}
        />
        <input
          name="uf"
          value={form.uf}
          onChange={handleInput}
          placeholder="UF"
          style={{ border: '1px solid #ccc', marginBottom: 4, padding: 4, width: 40, display: 'block' }}
        />
      </form>
    </div>
  );
}