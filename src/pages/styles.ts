import { Box, TextInput, styled } from "@ignite-ui/react";


export const HomeContainer = styled('div', {

    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '$20',
    padding: '24px',

})

export const InputText = styled(TextInput, {
    background: '$gray400',
    color: '$gray100',
    borderColor: 'gray400'


})

export const ProductBox = styled(Box, {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'grab'

})

export const ProductsContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '84px',
    width: '100vw',


})

export const Input = styled(TextInput, {
    '&:disabled':{
        cursor: 'grab'
    }

})