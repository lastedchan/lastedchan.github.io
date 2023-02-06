export type TabType = {
  title: string;
  show: boolean;
  href?: string;
  help?: JSX.Element;
};
export type TabListType = (TabType | null)[];

export type OrientationType = "portrait" | "landscape";
