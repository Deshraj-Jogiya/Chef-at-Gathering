import React from 'react';

function PopUp(props) {
    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-0 m-0 d-flex justify-content-center">
                        {props.pdf ? <object data={props.pdf} type="application/pdf" height="550px" width="100%">
                            <iframe src={"https://docs.google.com/viewer?url=" + props.pdf + "&embedded=true"} title="popup" height="550px" width="100%" />
                        </object> : <img src={props.img} style={{ height: "auto", width: "100%" }} alt="grocery"/>}
                    </div>
                </div>
            </div>
        </div >
    );
}


export default PopUp;

