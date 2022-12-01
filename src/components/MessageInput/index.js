import React, { useEffect } from 'react';
import { sendMessage } from '../../services/firebase';

function MessageInput(props) {
    const [value, setValue] = React.useState('');
    const [submitting, setSubmitting] = React.useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const sendNotification = async () => {
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer " + localStorage.getItem("token")
        );
        var formdata = new FormData();
        formdata.append("is_sender_chef", props.customer ? "no" : "yes");
        formdata.append("chef_id", props.customer ? props.userId : localStorage.getItem("logged_user_id"));
        formdata.append("customer_id", props.customer ?  localStorage.getItem("logged_user_id"): props.userId);
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };
        await fetch(
            `${process.env.REACT_APP_BASE_URL}chat/notify_user`,
            requestOptions
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true)
        await sendMessage(props.roomId, value);
        await sendNotification();
        setSubmitting(false)
        setValue('');
    };
    useEffect(() => {
        document.title = `Chef - Chef Republic`;
        setValue(props.first_msg)
        // eslint-disable-next-line
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a message"
                value={value}
                onChange={handleChange}
                className="form-control shadow-none"
                required
                minLength={1}
                disabled={submitting}
            />
            <div className="text-center mt-2">
                <button type="submit" disabled={value < 1} className="btn-orange">
                    Send
                </button>
            </div>
        </form>
    );
}
export default MessageInput;