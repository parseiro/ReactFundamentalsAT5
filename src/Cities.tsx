import {Label, Select} from "flowbite-react";
import React, {useEffect} from "react";
import {useAsync} from "./useAsync";

export interface Cidade {
    id: string,
    nome: string
}



/*export interface Fetch {
    execute: () => Promise<void>
    status: "idle" | "success" | "error" | "pending",
        value: Cidade[] | null,
    error: string | null,
}*/

interface Props {
    stateId: number | string | null
}

function Cities(props: Props) {
    const {stateId} = props;

    const fetchCitiesByStateId = async(): Promise<Cidade[]> => {
        const resp = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`)
        const json: Cidade[] = await resp.json()
        json.sort((a, b) => a.nome.localeCompare(b.nome))
        return json
    }

    const {value, status, execute} = useAsync<Cidade[]>(fetchCitiesByStateId, false);

    useEffect(() => {
        if (stateId) execute()
    }, [stateId])

    return <>
        {status === 'pending' && <p>Loading...</p>}
        {status === 'error' && <p>Error fetching cities</p>}
        {status === 'success' && (<>
            <Label
                htmlFor="estados"
                value="Please select a city"
            />
            <Select
                id="estados"
            >
                {value?.map(({id, nome}) => (
                    <option
                        key={id}
                        value={id}
                    >{nome}</option>
                ))}
            </Select>
        </>)}
    </>
}

Cities.propTypes = { }

export default React.memo(Cities)
/*export const EMPTY_CITIES: FetchCities = {
    execute: async () => { },
    status: 'idle',
    value: null,
    error: null
};*/
