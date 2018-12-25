import { createGlobalStyle } from 'styled-components';

const Animations = createGlobalStyle`
  .seconds2 {
    animation: storyDuration 2s linear;
  }

  .seconds4 {
    animation: storyDuration 4s linear;
  }

  .seconds6 {
    animation: storyDuration 6s linear;
  }

  .seconds8 {
    animation: storyDuration 8s linear;
  }

  .seconds10 {
    animation: storyDuration 10s linear;
  }

  @keyframes storyDuration {
    from { width: 0%;}
    to { width: 100%;}
  }
`

export default Animations;