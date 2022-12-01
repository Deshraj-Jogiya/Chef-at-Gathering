
async function callErrorApi(url, email, error_message) {
    await fetch(
        `${process.env.REACT_APP_BASE_URL}general/add_error_logs`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.toString(),
                url: url.toString(),
                error_message: JSON.stringify(error_message),
            }),
        }
    );
}

export { callErrorApi };