// @ts-ignore: esbuild custom loader
import styles from './popup.pcss';
import ThemeColors from '../themecolors/themecolors';
import Saturation from '../saturation/saturation';
import Hue from '../hue/hue';
import Alpha from '../alpha/alpha';
import Fields from '../fields/fields';

/*
 Usage:
 ------
 <toolcool-color-picker-popup color="#000" cid="..." popup-position="left"></toolcool-color-picker-popup>
 */
class ColorPickerPopup extends HTMLElement {
  // this id attribute is used for custom events
  private readonly cid: string;
  private popupPosition = 'left';

  private $popup: HTMLElement | null;
  private color = '#000';
  private colorIndex = -1;
  private themeColors = [];

  static get observedAttributes() {
    return ['color', 'theme-colors', 'color-index', 'popup-position'];
  }

  constructor() {
    super();

    // register web components
    if (!customElements.get('toolcool-color-picker-theme-colors')) {
      customElements.define('toolcool-color-picker-theme-colors', ThemeColors);
    }

    if (!customElements.get('toolcool-color-picker-saturation')) {
      customElements.define('toolcool-color-picker-saturation', Saturation);
    }

    if (!customElements.get('toolcool-color-picker-hue')) {
      customElements.define('toolcool-color-picker-hue', Hue);
    }

    if (!customElements.get('toolcool-color-picker-alpha')) {
      customElements.define('toolcool-color-picker-alpha', Alpha);
    }

    if (!customElements.get('toolcool-color-picker-fields')) {
      customElements.define('toolcool-color-picker-fields', Fields);
    }

    this.cid = this.getAttribute('cid') || '';
    this.prevent = this.prevent.bind(this);

    this.attachShadow({
      mode: 'open', // 'closed', 'open',
    });
  }

  prevent(evt: MouseEvent) {
    evt.stopPropagation();
  }

  /**
   * when the custom element connected to DOM
   */
  connectedCallback() {
    if (!this.shadowRoot) return;
    const themeColorsStr = this.getAttribute('theme-colors') || '[]';
    this.color = this.getAttribute('color') || '#000';
    this.themeColors = JSON.parse(themeColorsStr);
    this.colorIndex = parseInt(this.getAttribute('color-index') || '-1');
    this.popupPosition = this.getAttribute('popup-position') || 'left';

    this.shadowRoot.innerHTML = `
           <style>${styles}</style>
           <div class='popup'>
                <toolcool-color-picker-theme-colors color-index='${this.colorIndex}' theme-colors='${themeColorsStr}' cid='${this.cid}'></toolcool-color-picker-theme-colors>
                <toolcool-color-picker-saturation color='${this.color}' cid='${this.cid}'></toolcool-color-picker-saturation>
                <toolcool-color-picker-hue color='${this.color}' cid='${this.cid}'></toolcool-color-picker-hue>
                <toolcool-color-picker-alpha color='${this.color}' cid='${this.cid}'></toolcool-color-picker-alpha>
                <toolcool-color-picker-fields color='${this.color}' cid='${this.cid}'></toolcool-color-picker-fields>
           </div>
        `;

    this.$popup = this.shadowRoot.querySelector('.popup');
    this.$popup?.addEventListener('mousedown', this.prevent); // disable 'click outside' feature inside the popup
    this.$popup?.classList.toggle('right', this.popupPosition === 'right');
  }

  /**
   * when the custom element disconnected from DOM
   */
  disconnectedCallback() {
    this.$popup?.removeEventListener('mousedown', this.prevent);
  }

  /**
   * when attributes change
   */
  attributeChangedCallback(attrName: string, _oldVal: string, newVal: string) {
    if (attrName === 'popup-position') {
      this.popupPosition = newVal;

      if (this.$popup) {
        this.$popup.classList.toggle('right', this.popupPosition === 'right');
      }
    }
  
    if (attrName === 'theme-colors') {
      this.themeColors = JSON.parse(newVal || '[]');
      const $themeColor = this.shadowRoot?.querySelector('toolcool-color-picker-theme-colors');
      if ($themeColor) {
        $themeColor.setAttribute('theme-colors', newVal);
      }
    }

    if (attrName === 'color-index') {
      this.colorIndex = parseInt(newVal);
      const $themeColor = this.shadowRoot?.querySelector('toolcool-color-picker-theme-colors');
      if ($themeColor) {
        $themeColor.setAttribute('color-index', newVal);
      }
    }

    if (attrName === 'color') {
      this.color = newVal;

      const $saturation = this.shadowRoot?.querySelector('toolcool-color-picker-saturation');
      const $hue = this.shadowRoot?.querySelector('toolcool-color-picker-hue');
      const $alpha = this.shadowRoot?.querySelector('toolcool-color-picker-alpha');
      const $fields = this.shadowRoot?.querySelector('toolcool-color-picker-fields');

      if ($saturation) {
        $saturation.setAttribute('color', this.color);
      }

      if ($hue) {
        $hue.setAttribute('color', this.color);
      }

      if ($alpha) {
        $alpha.setAttribute('color', this.color);
      }

      if ($fields) {
        $fields.setAttribute('color', this.color);
      }
    }
  }
}

export default ColorPickerPopup;
