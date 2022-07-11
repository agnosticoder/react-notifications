export type ToastProps = {
    mode: 'info' | 'success' | 'warning' | 'error';
    message: string;
    toastId: string;
    onClose?: () => void;
}

const infoClass = 'bg-zinc-400 text-zinc-200 p-2 rounded-lg';
const successClass = 'bg-green-200 text-green-600 p-2 rounded-lg';
const warningClass = 'bg-orange-200 text-orange-600 p-2 rounded-lg';
const errorClass = 'bg-red-200 text-red-600 p-2 rounded-lg';

const Toast = ({ mode, message, toastId, onClose }: ToastProps) => {
    const className =
        mode === 'info'
            ? infoClass
            : mode === 'success'
            ? successClass
            : mode === 'warning'
            ? warningClass
            : errorClass;

    return (
        <div className='relative'>
            <div className={className}>{message}</div>
            <button className='absolute top-0 right-0' onClick={onClose}>X</button>
        </div>
    );
};

export default Toast;