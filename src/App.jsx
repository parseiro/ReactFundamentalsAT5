import './App.css';
import {Card, Footer, Label} from "flowbite-react";
import {useEffect, useState} from "react";

export default function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({});

  useEffect(() => {
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          setEndereco(data);
        });
    } else {
      setEndereco({});
    }
  }, [cep])

  return (
    <>
      <main className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-4xl">Endereço</h1>
        <Label
          htmlFor="cep"
          value="CEP (somente números)"
        />
        <input id="cep"
               type="number"
               value={cep}
               onChange={({target: {value}}) => {
                 setCep(value);
               }}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        {Object.keys(endereco).length > 0 && (
          <Card className="max-w-2xl">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Endereço
            </h2>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-right">
              Logradouro: {endereco.logradouro}
              <br/>
              Bairro: {endereco.bairro}
              <br/>
              Cidade: {endereco.localidade}
              <br/>
              UF: {endereco.uf}
            </p>
          </Card>
        )}
      </main>
      <Footer container={true}>
        <Footer.Copyright
          href="https://parseiro.github.io"
          by="Leonardo Vilela Pinheiro"
          year={2023}
        />
      </Footer>
    </>
  );
}
