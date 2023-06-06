import { createContext, useState } from 'react'

const ToastContext = createContext()

function MessageProviderWrapper(props) {

    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('Mensaje de ejemplo')

    const emitMessage = text => {
        setToastMessage(text)
        setShowToast(true)
    }

    const closeToast = () => setShowToast(false)

    return (
        <ToastContext.Provider value={{ toastMessage, emitMessage, closeToast, showToast }}>
            {props.children}
        </ToastContext.Provider>
    )
}

export { ToastContext, MessageProviderWrapper }