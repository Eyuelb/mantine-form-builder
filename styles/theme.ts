import type { MantineThemeOverride } from '@mantine/core';

export const theme: Partial<MantineThemeOverride> = {
  defaultRadius: 'sm',
  primaryColor: 'primary',
  primaryShade: 7,

  breakpoints: {
    xs: '36rem',
    sm: '48rem',
    md: '62rem',
    lg: '75rem',
    xl: '87.5rem',
  },

  colors: {
    primary: [
      "#f6eeff",
      "#e7daf7",
      "#cab1ea",
      "#ad86dd",
      "#9562d2",
      "#854bcb",
      "#7F56D9",
      "#6941C6",
      "#5f2aa0",
      "#52228d"
    ],
  },

  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },
    Button: {
      defaultProps: {
        size: 'xs',
      },
      styles: {
        section: {
          marginRight: 4,
          marginLeft: 1,
        },
      },
    },

    Input: {
      defaultProps: {
        size: 'xs',
      },
    },
    Checkbox: {
      defaultProps: {
        labelPosition: 'right',
      },
    },
    Radio: {
      defaultProps: {
        labelPosition: 'right',
      },
    },
    TextInput: {
      defaultProps: {
        size: 'xs',
      },
    },
    NumberInput: {
      defaultProps: {
        size: 'xs',
      },
    },
    Select: {
      defaultProps: {
        size: 'xs',
      },
    },
    PasswordInput: {
      defaultProps: {
        size: 'xs',
      },
    },
    Breadcrumbs: {
      styles: {
        breadcrumb: {
          fontSize: '14px',
        },
      },
    },
    AppShell: {
      styles: {
        main: {
          backgroundColor: '#F3F4F6',
        },
        header: {
          height: 40,
        },
      },
    },
  },
};
export const themeColors = theme.colors as any;

export const primaryColor = themeColors['primary'][Number(theme.primaryShade)]