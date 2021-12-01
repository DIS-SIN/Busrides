import React from 'react';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import Link from './Link';
import styles from './Content.module.scss';
import ReactModal from 'react-modal';

ReactModal.setAppElement('body');
ReactModal.defaultStyles.overlay.backgroundColor = 'transparent';
ReactModal.defaultStyles.overlay.zIndex = '100';

export default function Content(props) {
    let content;
    const dayContent = props.data.content[`day_${props.day}`];

    function closeModal() {
        content.style.height = '0';
        props.openContent(false)
    }

    if (dayContent){
        return (
            <ReactModal
                isOpen={props.contentIsOpen}
                onRequestClose={closeModal}
                className="Modal"
                shouldCloseOnEsc={true}
                closeTimeoutMS={900}
            >
                <div className={`${styles.content} ${styles.open}`} ref={(_content) => (content = _content)}>
                    <button className={styles.closeButton} onClick={closeModal} aria-label={props.t.close}>
                        <IcomoonReact iconSet={iconSet} size={20} icon="close"/>
                    </button>
                    <div className={styles.contentContainer}>
                        <h2>{dayContent.title}</h2>
                        <p>{dayContent.text}</p>
                        <Link data={dayContent.link}/>
                    </div>
                </div>
            </ReactModal>
        );
    }
    return null;
}
