export type TabType = {
  title: string;
  show: boolean;
  href?: string;
  help?: JSX.Element;
} | null;
export type TabListType = TabType[];
