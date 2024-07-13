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
  let timerId: number | undefined;

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

export async function getGitHash(): Promise<string> {
  const cmd = new Deno.Command("git", {
    args: ["rev-parse", "HEAD"],
  });

  const { code, stdout, stderr } = await cmd.output();

  console.log(code === 0);
  console.log(new TextDecoder().decode(stdout));
  console.log(new TextDecoder().decode(stderr));

  return new TextDecoder().decode((await cmd.output()).stdout);
}
