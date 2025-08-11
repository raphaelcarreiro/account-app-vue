import { watch, onBeforeUnmount } from 'vue';
import { ElNotification } from 'element-plus';
import { useSocket } from '@/providers/socket/use-socket';
import { SOCKET_EVENTS } from '@/providers/socket/socket-events';

type Notification = { message: string };

export function useNotification() {
  const { socket } = useSocket();

  const handler = (notification: Notification) => {
    ElNotification({
      message: notification.message,
      type: 'success',
      position: 'top-right',
      duration: 3000,
    });
  };

  watch(
    () => socket.value,
    (next, prev) => {
      if (prev) {
        prev.off(SOCKET_EVENTS.NOTIFICATION_CREATED, handler);
      }

      if (next) {
        next.on(SOCKET_EVENTS.NOTIFICATION_CREATED, handler);
      }
    },
    { immediate: true },
  );

  onBeforeUnmount(() => {
    socket.value?.off(SOCKET_EVENTS.NOTIFICATION_CREATED, handler);
  });
}
