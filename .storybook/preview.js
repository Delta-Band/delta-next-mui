import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './mui-theme';
// import '!style-loader!css-loader!sass-loader!./styles.scss';
import './styles.css';

console.log('MINIMAL_VIEWPORTS:, ', INITIAL_VIEWPORTS);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  viewport: {
    viewports: {
      iphone6: {
        name: 'iPhone 6',
        styles: { height: '667px', width: '375px' },
        type: 'mobile'
      },
      iphone12: {
        name: 'iPhone 12',
        styles: { height: '844px', width: '390px' },
        type: 'mobile'
      },
      ipad: {
        name: 'iPad',
        styles: { height: '1024px', width: '768px' },
        type: 'tablet'
      },
      laptop: {
        name: 'Laptop',
        styles: { height: '768px', width: '1024px' },
        type: 'laptop'
      },
      desktop: {
        name: 'Desktop',
        styles: { height: '800px', width: '1280px' },
        type: 'desktop'
      },
      widescreen: {
        name: 'Widescreen',
        styles: { height: '1080px', width: '1920px' },
        type: 'widescreen'
      }
    },
    defaultViewport: 'iPad'
  }
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  )
];
