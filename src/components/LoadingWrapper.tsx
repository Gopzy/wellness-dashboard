import React, { useEffect } from "react";
import { useAppDispatch } from "../store";
import { setComponentLoading } from "../store/reducer/uiSlice";

interface Props {
  componentName: string;
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<Props> = ({ componentName, children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Component has successfully rendered, so loading is done
    dispatch(
      setComponentLoading({ component: componentName, isLoading: false })
    );
  }, [dispatch, componentName]);

  return <>{children}</>;
};

export default LoadingWrapper;
