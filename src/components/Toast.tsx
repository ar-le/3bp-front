import Toast from 'react-bootstrap/Toast';

interface ToastNotifProps {
    message: string;
    type: 'info' | 'error'
}

function ToastNotif({message, type = 'info'}: ToastNotifProps) {
  return (
    <Toast>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default ToastNotif;