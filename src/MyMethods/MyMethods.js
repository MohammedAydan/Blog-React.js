const MediaPostsPath = "http://127.0.0.1:8000/Assets/Posts/";
const ImgAccountsPath = "http://127.0.0.1:8000/Assets/Accounts/";

function generateRandomId(length = 8) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+?/*|.";
    let randomId = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters.charAt(randomIndex);
    }

    return randomId;
}

export { MediaPostsPath, ImgAccountsPath, generateRandomId };
