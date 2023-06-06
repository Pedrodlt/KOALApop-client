import { useContext } from 'react'
import { Toast } from 'react-bootstrap'
import { ToastContext } from '../../contexts/toast.context'

const ToastMessage = () => {

    const { closeToast, toastMessage, showToast } = useContext(ToastContext)

    return (
        <Toast onClose={closeToast} show={showToast} delay={4500} autohide style={{ position: 'fixed', bottom: 10, right: 10 }}>
            <Toast.Header>
                <strong className="me-auto">Mensaje del sistema</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
    )
}

export default ToastMessage