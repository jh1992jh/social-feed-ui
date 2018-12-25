import { createGlobalStyle } from 'styled-components';

const Filters = createGlobalStyle`
.bw {
    filter: grayscale(1);
  }
  
  .bright {
    filter: brightness(1.5) ;
  }
  
  .hue1 {
  filter: hue-rotate(84deg)
  }  
  
  .hue2 {
  filter: hue-rotate(150deg)
  }
  
  .hue3 {
  filter: hue-rotate(180deg)
  }
  
  .hue4 {
  filter: hue-rotate(223deg)
  }
  
  .hue5 {
  filter: hue-rotate(300deg)
  }
  
  .saturate {
  filter: saturate(1.8);
  }
  
  .sepia {
  filter: sepia(1);
  }
`

export default Filters;