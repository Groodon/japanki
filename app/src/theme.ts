import { Theme } from './app/_models/theme';

export const light: Theme = {
    name: "light",
    properties: {
        "--main-bg-color": "#fff",
        "--transparent-background": "rgba(30,31,35,0.2)",
        "--paragraph-text": "red",
        "--headline-text": "dark-gray",
        "--link-color": "black",
        "--h1": "black"
    }
};

export const dark: Theme = {
    name: "dark",
    properties: {
        "--main-bg-color": "#1a1a1d",
        "--transparent-background": "rgba(30,31,35,0.4)",
        "--paragraph-text": "#fff",
        "--headline-text": "rgb(102, 102, 105)",
        "--link-color": "#fff",
        "--h1": "rgb(219, 211, 208)",
        "--color": "#fff"
    }
};