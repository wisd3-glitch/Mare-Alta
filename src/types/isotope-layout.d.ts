declare module "isotope-layout" {
  interface IsotopeOptions {
    itemSelector?: string;
    layoutMode?: string;
    percentPosition?: boolean;
    transitionDuration?: string | number;
  }
  export default class Isotope {
    constructor(element: Element | string, options?: IsotopeOptions);
    arrange(options: {
      filter?: string | ((el: Element) => boolean);
    }): void;
    layout(): void;
    reloadItems(): void;
    destroy(): void;
  }
}
