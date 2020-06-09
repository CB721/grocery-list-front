import React from 'react';
import './style.scss';

// a component to prevent the user from interacting with the page while the page is loading
function ModalCover() {
    return (
        <div className="modal-cover" />
    )
}

export default ModalCover;