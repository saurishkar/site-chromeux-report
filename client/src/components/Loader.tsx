import { FC, ReactElement } from "react";

export const Loader: FC<{
  loading: boolean;
  children: ReactElement;
  className?: string;
  style?: object;
}> = ({ loading = false, children, className = "", style }) => {
  if (loading) {
    return <span className={`loader ${className}`} style={style}>&#9883;</span>;
  }
  return children;
};
