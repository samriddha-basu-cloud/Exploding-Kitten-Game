
import React, { useEffect } from 'react';

function Toast({ message }) {
  useEffect(() => {
    const toast = document.querySelector('.toast');
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000); 
  }, [message]);

  return (
    <div className="toast">
      <p>{message}</p>
    </div>
  );
}

export default Toast;
