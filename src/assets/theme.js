import { extendTheme } from '@chakra-ui/react'

const colors = {
    header: '#291720',
    text: '#6E6E6E',
    textLight: 'rgba(255, 255, 255, 0.75)',
    action: '#D90368',
    actionSecondary: '#820263',
    actionTertiary: '#F75C03',
    decorative: '#04A777',
    decorativeSecondary: '#DADADA',
    background: '#fff',
    backgroundSecondary: '#F9F9F9'
}

const fonts = {
    header: 'Oswald, sans-serif',
    text: 'Archivo, sans-serif'
}

const styles = {
    global: {
        'body': {
            fontFamily: 'text'
        },
        'h1, h2, h3, h4, h5, h6': {
            fontFamily: 'header',
            color: 'header'
        },
    }
}

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const theme = extendTheme({ colors, fonts, styles, config })

export default theme