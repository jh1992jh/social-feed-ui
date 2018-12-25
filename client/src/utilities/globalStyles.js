import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
  font-family: 'Raleway', sans-serif;
}

a,
a:link {
  text-decoration: none;
  color: #222;
  margin: 0;
  padding: 0;
}

button,
i {
  cursor: pointer;
}

input,
input:focus {
  border: none;
  border-bottom: 1px solid #888;
  outline: none;
}

ul {
  list-style-type: none;
}

button {
  background: #fff;
  border: 3px solid #0099cc;
  color: #0099cc;
  padding: 0.5em;
  border-radius: 10px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  min-width: 10%;
  min-height: 1.2rem;

  @media (max-width: 1000px) {
    min-width: 30%;
  }
}
`

export default GlobalStyles;