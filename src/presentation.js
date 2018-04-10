// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  Deck,
  Heading,
  Image,
  Slide,
  Text,
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

const phantomImg = require('./phantomjs.png');
const stepsDown = require('./nophantom.png');

// Require CSS
require('normalize.css');

const theme = createTheme(
  {
    primary: '#333',
    secondary: '#fff',
    tertiary: '#03A9FC',
    quartenary: '#1DB6BE',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transitionDuration={500}
        theme={theme}
        progress={"none"}
      >
        <Slide bgColor="primary" bgImage={phantomImg}>
          <Heading size={1} fit caps lineHeight={1} textColor="secondary" margin="20px 0 0 0">
            Phantom Pain
          </Heading>
        </Slide>
        <Slide bgColor="primary" fit>
          <Image src={stepsDown} width="75%" />
          <Text size={1} caps lineHeight={1} textColor="secondary" margin="20px 0 0 0">
            Vitaly says <span role="img" aria-label="bye bye">👋</span>
          </Text>
        </Slide>
        <Slide transition={['spin']} bgColor="primary">
          <Heading size={5} textColor="secondary" margin="20px 0 0 0">
            Website Snapshots
          </Heading>
          <Heading size={5} textColor="secondary" margin="20px 0 0 0">
           Visual Regressions
          </Heading>
          <Heading size={5} textColor="secondary" margin="20px 0 0 0">
           Functional Tests
          </Heading>
          <Heading size={5} textColor="secondary" margin="20px 0 0 0">
           ...More?
          </Heading>
        </Slide>
        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <Heading size={5} textColor="tertiary">browserless.io</Heading>
          <Heading size={5} textColor="tertiary">@griffith_joel</Heading>
          <Heading size={5} textColor="tertiary">github.com/joelgriffith</Heading>
        </Slide>
      </Deck>
    );
  }
}
