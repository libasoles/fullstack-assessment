// needed to test virtual tables. By default, test environment lacks of element height.

jest.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
  () =>
    ({
      width: 1000,
      height: 140,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    } as DOMRect)
);
