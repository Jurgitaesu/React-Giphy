import {FaRegWindowClose} from 'react-icons/fa'

function Modal({imageSrc, setImageSrc}) {
    return (
        <div className="modal">
            <div className="modal-content">
                <FaRegWindowClose onClick={() => setImageSrc('')} className="close"/>
                <img src={imageSrc} alt="gif"/>
            </div>
        </div>
    );
}

export default Modal;