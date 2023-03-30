import './App.css'
import { Footer, Label, Select } from 'flowbite-react'
import React, { useState } from 'react'
import { useAsync } from './useAsync.ts'

const fetchStates = async () => {
  const novosEstados = []
  const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  const json = await response.json()
  json.sort((a, b) => a.sigla > b.sigla ? 1 : -1)
  json.forEach(({ sigla, nome }) => {
    novosEstados.push({ value: sigla, name: nome })
  })
  // setEstados(novosEstados)
  return novosEstados
}

export default function App () {
  // States data from IBGE
  const states =
          useAsync(fetchStates, true)

  // Every state has a code and a name
  const [selectedState, setSelectedState] = useState({ code: '', name: '' })

  return (
    <>
      <main className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-4xl">Brazilian States and Cities</h1>
        <Label
          htmlFor="estados"
          value="Please select a state"
        />
        <Select
          id="estados"
          value={selectedState.code}
          onChange={({ target: { value } }) => {
            // save the current state code and name
            const { name } = states.value.find(({ value: code }) => code === value)
            setSelectedState({ code: value, name })
          }}
        >
          {states.status === 'success' && states.value?.map(({ value, name }) => (
            <option
              key={value}
              value={value}
            >{name}</option>
          ))}
        </Select>

        {states.status === 'error' && <p>Erro ao puxar os estados</p>}

      </main>
      <Footer container={true}>
        <Footer.Copyright
          href="https://parseiro.github.io"
          by="Leonardo Vilela Pinheiro"
          year={2023}
        />
      </Footer>
    </>
  )
}
