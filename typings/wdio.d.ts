
export {}

declare global {
  namespace WebdriverIO {
    interface Browser {
      checkElement(
        element: Element,
        tag: string,
        checkElementOptions?: unknown
      ): void;
      saveElement(
        element: Element,
        tag: string,
        saveElementOptions?: unknown
      ): void;
    }

    interface Element {}
  }
}