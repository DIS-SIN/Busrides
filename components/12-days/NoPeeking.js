import React, {useEffect} from 'react';

export default function NoPeeking(props) {
    useEffect(() => {
        $( "#centred-popup-modal" ).trigger( "open.wb-lbx", [
            [
                {
                    src: "#centred-popup-modal",
                    type: "inline"
                }
            ]
        ]);
    },[]);

    $( document ).on( "mfpClose", function( event ) {
        closeError();
    });

    function closeError() {
        setTimeout(() => {
            props.setError({exists:false});
        }, 100);
    }

    return (
        <section id="centred-popup-modal" className="mfp-hide modal-dialog modal-content overlay-def">
            <header className="modal-header">
                <h2 className="modal-title">{props.error.message.title}</h2>
            </header>
            <div className="modal-body">
                <p>{props.error.message.text}</p>
            </div>
        </section>
    );
}
