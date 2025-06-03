const CSRFToken = async () => {
    await fetch('http://localhost:8000/accounts/csrf_cookie/', {
        credentials: 'include',
    });

    return document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
};

export default CSRFToken;