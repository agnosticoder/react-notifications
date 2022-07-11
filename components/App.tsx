import { useRef, useState } from 'react';
import ToastPortal from './ToastPortal';

type Mode = 'info' | 'success' | 'warning' | 'error';

export type ToastRefProps = {
    addToast: (props: { message: string, mode: Mode }) => void;
}

const App = () => {
    const [text, setText] = useState('');
    const [mode, setMode] = useState<Mode>('info');
    const [autoClose, setAutoClose] = useState(false);
    const ToastRef = useRef<ToastRefProps>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        ToastRef.current?.addToast({ message: text, mode });
        setText('');
    };

    return (
        <div className='bg-zinc-400 p-4 rounded-lg'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <div>
                        <label>
                            Auto Close
                            <input type="checkbox" checked={autoClose} onChange={() => setAutoClose(!autoClose)} />
                        </label>
                    </div>
                    <div>
                        <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
                            <option value="info">Info</option>
                            <option value="success">Success</option>
                            <option value="warning">Warning</option>
                            <option value="error">Error</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" placeholder="Notification Text" value={text} onChange={(e) => setText(e.currentTarget.value)} />
                    </div>
                    <div>
                        <button className="bg-zinc-600 p-2 text-zinc-200 rounded">Trigger Notification</button>
                    </div>
                </div>
            </form>
            <ToastPortal autoClose={autoClose} ref={ToastRef}/>
        </div>
    );
};

export default App;
