const baseUrl = "192.168.1.10";
const MediaPostsPath = `http://${baseUrl}/Assets/Posts/`;
const MediaAccountsPath = `http://${baseUrl}/Assets/Accounts/`;
const MediaAccountsConfirmations =
  `http://${baseUrl}/Assets/AccountsConfirmations/`;

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

export {
  MediaPostsPath,
  MediaAccountsPath,
  MediaAccountsConfirmations,
  generateRandomId,
  baseUrl,
};
