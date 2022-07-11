import { useEffect, useId, useState, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import Toast, { ToastProps } from './Toast';
import {v4 as uuid} from 'uuid';

type Toast = {
    toastId: string;
    message: string;
    mode: 'info' | 'success' | 'warning' | 'error';
};


const ToastPortal = forwardRef(({ autoClose }: { autoClose: boolean }, ref: any) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [loaded, setLoaded] = useState(false);
    const id = useId();

    const onClose = ({ toastId }: { toastId: string }) => {
        setToasts(toasts.filter((toast) => toast.toastId !== toastId));
    };

    useImperativeHandle(ref, () => ({
        addToast: ({ message, mode }: ToastProps) => {
            const toastId = uuid();
            setToasts([...toasts, { toastId, message, mode }]);
            if(autoClose) {
                setTimeout(() => {
                    setToasts((toasts) => toasts.filter((toast) => toast.toastId !== toastId));
                }, 5000);
            }
        },
    }));

    useEffect(() => {
        const div = document.createElement('div');
        div.id = `toast-portal-${id}`;
        div.className = 'fixed top-0 right-0 m-4 z-50';
        document.body.prepend(div);
        console.log('ToastPortal', div);
        setLoaded(true);

        return () => document.getElementById(`toast-portal-${id}`)?.remove();
    }, [id]);

    return loaded
        ? createPortal(
              toasts.map((t) => (
                  <div key={t.toastId}>
                      <Toast
                          message={t.message}
                          mode={t.mode}
                          toastId={t.toastId}
                          onClose={() => onClose({ toastId: t.toastId })}
                      />
                  </div>
              )),
              document.getElementById(`toast-portal-${id}`) as HTMLElement
          )
        : null;
});

ToastPortal.displayName = 'ToastPortal';

export default ToastPortal;
