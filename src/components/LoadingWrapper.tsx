import React, { useEffect } from "react";
import { useAppDispatch } from "../store";
import { setComponentLoading } from "../store/reducer/uiSlice";

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  componentName,
  children,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // loading is set to false when Component is reddered
    dispatch(
      setComponentLoading({ component: componentName, isLoading: false })
    );
  }, [dispatch, componentName]);

  return <>{children}</>;
};

export default LoadingWrapper;
