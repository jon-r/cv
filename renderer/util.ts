type Callback = (...args: unknown[]) => void;

type DebouncedCallback = Callback & {
  cancel?: () => void;
};

type DebounceOptions = {
  leading?: boolean;
}

// https://youmightnotneed.com/lodash/
export function debounce(
  func: Callback,
  delay: number,
  { leading }: DebounceOptions = {},
): DebouncedCallback {
  let timerId: number | undefined;

  const debounced = (...args: unknown[]) => {
    if (!timerId && leading) {
      func(...args);
    }

    clearTimeout(timerId);

    timerId = setTimeout(() => func(...args), delay);
  };

  debounced.cancel = () => clearTimeout(timerId);

  return debounced;
}
