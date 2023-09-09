import { Box, Button } from "@ignite-ui/react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/router'
import { BoxCsv, Buttons, Container } from "./style";

export default function SendSheet() {

    const router = useRouter()
    const [SelectedFile, SetSelectedFile] = useState<File | null>()
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        SetSelectedFile(file)
    }

    async function handleUpload() {

        if (!SelectedFile) {
            alert('Selecione um arquivo CSV antes de enviar.');
            return;
        }
        const formData = new FormData()
        formData.append('csvFile', SelectedFile)

        try {

            await axios.post('http://localhost:3002/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
                .then((response) => { router.push('/ValidatePrices') })

        } catch (error) {
            alert('Erro ao Enviar arquivo')
        }
    }



    return (
        <Container>

            <BoxCsv>
                <input
                    type='file'
                    accept='.csv'
                    onChange={handleFileChange}


                />
                <Buttons>


                    <Button variant={'secondary'} onClick={() => router.push('/')}>Voltar</Button>

                    <Button onClick={handleUpload}>Proximo</Button>
                </Buttons>
            </BoxCsv>
        </Container>
    )

}