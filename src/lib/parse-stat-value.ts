export type ParsedStatValue = {
  prefix: string;
  end: number;
  suffix: string;
  /** When true, render the original string without animating. */
  static: boolean;
};

export function parseStatValue(value: string): ParsedStatValue {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return { prefix: "", end: 0, suffix: value, static: true };
  }

  return {
    prefix: match[1],
    end: Number(match[2]),
    suffix: match[3],
    static: false,
  };
}
