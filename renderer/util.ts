import { promisify } from "node:util";
import { exec } from "node:child_process";

type Callback<Props extends unknown[]> = (...args: Props) => void;

type DebouncedCallback<P extends unknown[]> = Callback<P> & {
  cancel?: () => void;
};

type DebounceOptions = {
  leading?: boolean;
};

// https://youmightnotneed.com/lodash/
export function debounce<Props extends unknown[]>(
  func: Callback<Props>,
  delay: number,
  { leading }: DebounceOptions = {},
): DebouncedCallback<Props> {
  let timerId: NodeJS.Timeout | undefined;

  const debounced = (...args: Props) => {
    if (!timerId && leading) {
      func(...args);
    }

    clearTimeout(timerId);

    timerId = setTimeout(() => func(...args), delay);
  };

  debounced.cancel = () => clearTimeout(timerId);

  return debounced;
}

const execAsync = promisify(exec);

export async function getGitHash(): Promise<string> {
  const { stdout, stderr } = await execAsync(
    "git describe --long --always --exclude=* --abbrev=8",
  );

  if (stderr.length > 0) {
    throw new Error(stderr);
  }

  return stdout;
}
