import type { Props as ReactSelectProps } from "react-select";

export interface ModelSelectProps
  extends Omit<ReactSelectProps<{ label: string; value: string }>, "value"> {
  label?: string;
}
