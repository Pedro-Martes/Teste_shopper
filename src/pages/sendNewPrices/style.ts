import { Box, styled } from "@ignite-ui/react";

export const Container = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    height: '100vh',


    
})

export const BoxCsv = styled(Box, {
    display: 'flex',
    flexDirection: 'column',
    padding: '32px',
    gap: '24px'
})
export const Buttons =styled('div', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
})