import {createGlobalStyle} from 'styled-components'
import { AlurakutStyles } from '../lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle `
  :root {
    --background-color: #d9e6f6;
  }

  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
}     

body{
  background: var(--background-color);
  font-family: sans-serif;
}

#__next {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

//reset pra imagens
img {
  max-width:100%;
  height: auto;
  display:block;
}

${AlurakutStyles}

`;

export default GlobalStyle;
