export const CUSTOM_EVENT_COLOR_HSV_CHANGED = 'tc-hsv-changed';
export const CUSTOM_EVENT_COLOR_HUE_CHANGED = 'tc-hue-changed';
export const CUSTOM_EVENT_COLOR_ALPHA_CHANGED = 'tc-alpha-changed';
export const CUSTOM_EVENT_BUTTON_CLICKED = 'tc-button-clicked';
export const CUSTOM_EVENT_COLOR_INDEX_CHANGED = 'tc-color-index-changed';
export const CUSTOM_EVENT_THEME_COLOR_CHANGED = 'tc-theme-color-changed';

export const sendButtonClickedCustomEvent = (cid: string) => {
  if (!cid) return;

  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_BUTTON_CLICKED, {
      detail: {
        cid,
      },
    })
  );
};

export const sendAlphaCustomEvent = (cid: string, a: number) => {
  if (!cid) return;

  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, {
      detail: {
        a,
        cid,
      },
    })
  );
};

export const sendHsvCustomEvent = (cid: string, h: number, s: number, v: number) => {
  if (!cid) return;

  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_COLOR_HSV_CHANGED, {
      detail: {
        h,
        s,
        v,
        cid,
      },
    })
  );
};

export const sendHueCustomEvent = (cid: string, h: number) => {
  if (!cid) return;

  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_COLOR_HUE_CHANGED, {
      detail: {
        h,
        cid,
      },
    })
  );
};

export const sendColorIndexCustomEvent = (cid: string, i: string) => {
  if (!cid) return;

  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_COLOR_INDEX_CHANGED, {
      detail: {
        i,
        cid,
      },
    })
  );
};

export const sendThemeColorCustomEvent = (cid: string, tc: string) => {
  if (!cid) return;

  document.dispatchEvent(
    new CustomEvent(CUSTOM_EVENT_THEME_COLOR_CHANGED, {
      detail: {
        tc,
        cid,
      },
    })
  );
};
