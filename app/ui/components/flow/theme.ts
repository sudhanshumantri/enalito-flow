import { createTheme } from '@mui/material/styles';

export const createFlowTheme = (styles: {readonly [key: string]: string}) => {

const theme = createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
  });

  // Assign exported style to theme in the main React component that uses MUI Theme
  (theme.palette.primary as any)['50'] = styles.palettePrimary50;
  (theme.palette.primary as any)['100'] = styles.palettePrimary100;
  (theme.palette.primary as any)['200'] = styles.palettePrimary200;
  (theme.palette.primary as any)['300'] = styles.palettePrimary300;
  (theme.palette.primary as any)['400'] = styles.palettePrimary400;
  (theme.palette.primary as any)['500'] = styles.palettePrimary500;
  (theme.palette.primary as any)['600'] = styles.palettePrimary600;
  (theme.palette.primary as any)['700'] = styles.palettePrimary700;
  (theme.palette.primary as any)['800'] = styles.palettePrimary800;
  (theme.palette.primary as any)['900'] = styles.palettePrimary900;
  theme.palette.primary.main = styles.palettePrimaryMain;
  theme.palette.primary.light = styles.palettePrimaryLight;
  theme.palette.primary.dark = styles.palettePrimaryDark;
  theme.palette.primary.contrastText = styles.palettePrimaryContrastText;
  theme.palette.divider = styles.paletteDivider;
  // (theme.palette.primaryDark as any)['50'] = styles.palettePrimaryDark50;
  // (theme.palette.primaryDark as any)['100'] = styles.palettePrimaryDark100;
  // (theme.palette.primaryDark as any)['200'] = styles.palettePrimaryDark200;
  // (theme.palette.primaryDark as any)['300'] = styles.palettePrimaryDark300;
  // (theme.palette.primaryDark as any)['400'] = styles.palettePrimaryDark400;
  // (theme.palette.primaryDark as any)['500'] = styles.palettePrimaryDark500;
  // (theme.palette.primaryDark as any)['600'] = styles.palettePrimaryDark600;
  // (theme.palette.primaryDark as any)['700'] = styles.palettePrimaryDark700;
  // (theme.palette.primaryDark as any)['800'] = styles.palettePrimaryDark800;
  // (theme.palette.primaryDark as any)['900'] = styles.palettePrimaryDark900;
  // theme.palette.primaryDark.main = styles.palettePrimaryDarkMain;
  theme.palette.common.black = styles.paletteCommonBlack;
  theme.palette.common.white = styles.paletteCommonWhite;
  theme.palette.text.primary = styles.paletteTextPrimary;
  theme.palette.text.secondary = styles.paletteTextSecondary;
  theme.palette.text.disabled = styles.paletteTextDisabled;
  (theme.palette.grey as any)['50'] = styles.paletteGrey50;
  (theme.palette.grey as any)['100'] = styles.paletteGrey100;
  (theme.palette.grey as any)['200'] = styles.paletteGrey200;
  (theme.palette.grey as any)['300'] = styles.paletteGrey300;
  (theme.palette.grey as any)['400'] = styles.paletteGrey400;
  (theme.palette.grey as any)['500'] = styles.paletteGrey500;
  (theme.palette.grey as any)['600'] = styles.paletteGrey600;
  (theme.palette.grey as any)['700'] = styles.paletteGrey700;
  (theme.palette.grey as any)['800'] = styles.paletteGrey800;
  (theme.palette.grey as any)['900'] = styles.paletteGrey900;
  theme.palette.grey.A100 = styles.paletteGreyA100;
  theme.palette.grey.A200 = styles.paletteGreyA200;
  theme.palette.grey.A400 = styles.paletteGreyA400;
  theme.palette.grey.A700 = styles.paletteGreyA700;
  (theme.palette.error as any)['50'] = styles.paletteError50;
  (theme.palette.error as any)['100'] = styles.paletteError100;
  (theme.palette.error as any)['200'] = styles.paletteError200;
  (theme.palette.error as any)['300'] = styles.paletteError300;
  (theme.palette.error as any)['400'] = styles.paletteError400;
  (theme.palette.error as any)['500'] = styles.paletteError500;
  (theme.palette.error as any)['600'] = styles.paletteError600;
  (theme.palette.error as any)['700'] = styles.paletteError700;
  (theme.palette.error as any)['800'] = styles.paletteError800;
  (theme.palette.error as any)['900'] = styles.paletteError900;
  theme.palette.error.main = styles.paletteErrorMain;
  theme.palette.error.light = styles.paletteErrorLight;
  theme.palette.error.dark = styles.paletteErrorDark;
  theme.palette.error.contrastText = styles.paletteErrorContrastText;
  (theme.palette.success as any)['50'] = styles.paletteSuccess50;
  (theme.palette.success as any)['100'] = styles.paletteSuccess100;
  (theme.palette.success as any)['200'] = styles.paletteSuccess200;
  (theme.palette.success as any)['300'] = styles.paletteSuccess300;
  (theme.palette.success as any)['400'] = styles.paletteSuccess400;
  (theme.palette.success as any)['500'] = styles.paletteSuccess500;
  (theme.palette.success as any)['600'] = styles.paletteSuccess600;
  (theme.palette.success as any)['700'] = styles.paletteSuccess700;
  (theme.palette.success as any)['800'] = styles.paletteSuccess800;
  (theme.palette.success as any)['900'] = styles.paletteSuccess900;
  theme.palette.success.main = styles.paletteSuccessMain;
  theme.palette.success.light = styles.paletteSuccessLight;
  theme.palette.success.dark = styles.paletteSuccessDark;
  theme.palette.success.contrastText = styles.paletteSuccessContrastText;
  (theme.palette.warning as any)['50'] = styles.paletteWarning50;
  (theme.palette.warning as any)['100'] = styles.paletteWarning100;
  (theme.palette.warning as any)['200'] = styles.paletteWarning200;
  (theme.palette.warning as any)['300'] = styles.paletteWarning300;
  (theme.palette.warning as any)['400'] = styles.paletteWarning400;
  (theme.palette.warning as any)['500'] = styles.paletteWarning500;
  (theme.palette.warning as any)['600'] = styles.paletteWarning600;
  (theme.palette.warning as any)['700'] = styles.paletteWarning700;
  (theme.palette.warning as any)['800'] = styles.paletteWarning800;
  (theme.palette.warning as any)['900'] = styles.paletteWarning900;
  theme.palette.warning.main = styles.paletteWarningMain;
  theme.palette.warning.light = styles.paletteWarningLight;
  theme.palette.warning.dark = styles.paletteWarningDark;
  theme.palette.warning.contrastText = styles.paletteWarningContrastText;
  theme.palette.secondary.main = styles.paletteSecondaryMain;
  theme.palette.secondary.light = styles.paletteSecondaryLight;
  theme.palette.secondary.dark = styles.paletteSecondaryDark;
  theme.palette.secondary.contrastText = styles.paletteSecondaryContrastText;
  theme.palette.info.main = styles.paletteInfoMain;
  theme.palette.info.light = styles.paletteInfoLight;
  theme.palette.info.dark = styles.paletteInfoDark;
  theme.palette.info.contrastText = styles.paletteInfoContrastText;
  theme.palette.contrastThreshold = Number(styles.paletteContrastThreshold);
  theme.palette.tonalOffset = Number(styles.paletteTonalOffset);
  theme.palette.background.paper = styles.paletteBackgroundPaper;
  theme.palette.background.default = styles.paletteBackgroundDefault;
  theme.palette.action.active = styles.paletteActionActive;
  theme.palette.action.hover = styles.paletteActionHover;
  theme.palette.action.hoverOpacity = Number(styles.paletteActionHoverOpacity);
  theme.palette.action.selected = styles.paletteActionSelected;
  theme.palette.action.selectedOpacity = Number(styles.paletteActionSelectedOpacity);
  theme.palette.action.disabled = styles.paletteActionDisabled;
  theme.palette.action.disabledBackground = styles.paletteActionDisabledBackground;
  theme.palette.action.disabledOpacity = Number(styles.paletteActionDisabledOpacity);
  theme.palette.action.focus = styles.paletteActionFocus;
  theme.palette.action.focusOpacity = Number(styles.paletteActionFocusOpacity);
  theme.palette.action.activatedOpacity = Number(styles.paletteActionActivatedOpacity);

  return theme
}