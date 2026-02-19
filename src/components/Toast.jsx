import { useEffect } from 'react'

export default function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'

  return (
    <div className={`toast toast-${type}`}>
      <span>{icon}</span>
      <span>{msg}</span>
    </div>
  )
}
