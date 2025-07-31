import { NotificationInstance } from "antd/es/notification/interface";
import { createContext, PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { resetError } from "../features/slices/notificationSlice";
import { notification as notificaitonInstance } from "antd";

type NotificationContextState = {
  notification: NotificationInstance;
};

const initialState: NotificationContextState = {
  notification: {
    success: () => undefined,
    info: () => undefined,
    warning: () => undefined,
    error: () => undefined,
    destroy: () => undefined,
    open: () => undefined,
  },
};

export const NotificationContext = createContext(initialState);

const NotificationContextProvider = ({ children }: PropsWithChildren) => {
  const [notification, notificationContext] = notificaitonInstance.useNotification();
  const { hasError, message } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasError) {
      notification.error({ message });
      dispatch(resetError());
    }
  }, [dispatch, hasError, notification, message]);

  return (
    <NotificationContext.Provider value={{ notification }}>
      {notificationContext}
      {children}
    </NotificationContext.Provider>
  );
};
export default NotificationContextProvider;
