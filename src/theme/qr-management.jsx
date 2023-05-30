class PanelTheme {
  primaryColor;

  colorScheme;

  defaultGradient;

  constructor({ colorScheme } = {}) {
    this.colorScheme = colorScheme || 'light';
    this.fontFamily = 'Plus Jakarta Sans, sans-serif';
    this.fontFamilyMonospace = 'Monaco, Courier, monospace';
    this.headings = { fontFamily: 'Plus Jakarta Sans, sans-serif' };
    this.primaryColor = 'blue';
    this.defaultGradient = {
      from: 'blue',
      to: 'cyan',
      deg: 45
    };
    this.colors = {
      bisuBlue: [
        '#BDD0DF',
        '#AAC5DB',
        '#96BBD9',
        '#80B1DA',
        '#69A9DE',
        '#4FA1E5',
        '#339AF0',
        '#3191E1',
        '#3088D1',
        '#377FBB',
        '#3C76A7',
        '#3F6F96',
        '#416887'
      ]
    };
  }
}

export default PanelTheme;
