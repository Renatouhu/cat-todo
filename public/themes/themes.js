import { useContext } from "react"

const themes = [
    {
        themeName: 'light',
        colors: {
            surface: '#fef7ff',
            surfaceContainer: '#f3edf7',
            surfaceContainerHighest: '#e6e0e9',
            onSurface: '#1d1b20',
            onSurfaceAlt: '#49454f',
            primary: '#6750A4',
            onPrimary: '#ffffff',
            primaryContainer: '#eaddff',
            onPrimaryContainer: '#21005d'
        }
    },
    {
        themeName: 'dark',
        colors: {
            surface: '#141218',
            surfaceContainer: '#211f26',
            surfaceContainerHighest: '#36343b',
            onSurface: '#e6e0e9',
            onSurfaceAlt: '#cac4d0',
            primary:  '#d0bcff',
            onPrimary: '#ffffff',
            primaryContainer: '#eaddff',
            onPrimaryContainer: '#21005d'
        }
    },
    {
        themeName: 'redPastel',
        colors: {
            surface: '#330F18',
            surfaceContainer: '#4C252F',
            surfaceContainerHighest: '#805862',
            onSurface: '#FFF8E3',
            onSurfaceAlt: '#F5EEE6',
            primary:  '#E6A4B4',
            onPrimary: '#F3D7CA',
            primaryContainer: '#eaddff',
            onPrimaryContainer: '#331609'
        }
    },
    {
        themeName: 'purplePastel',
        colors: {
            surface: '#DFCCFB',
            surfaceContainer: '#D0BFFF',
            surfaceContainerHighest: '#BEADFA',
            onSurface: '#3D2661',
            onSurfaceAlt: '#705794',
            primary:  '#BEADFA',
            onPrimary: '#F3D7CA',
            primaryContainer: '#eaddff',
            onPrimaryContainer: '#3C3161'
        }
    }
]

export const currentTheme = themes[3]