var extensionId = "";
window.addEventListener(
  "message",
  async (event) => {
    // Accept messages only from same window
    if (event.source !== window) {
      return;
    }

    if (event.data.type && event.data.type === "signify-extension") {
      console.log("Content script loaded from polaris-web");
      extensionId = event.data.data.extensionId;
    }
  },
  false
);

const requestAid = () => {
  window.postMessage({ type: "select-identifier" }, "*");
};

const requestCredential = () => {
  window.postMessage({ type: "select-credential" }, "*");
};

const requestAidORCred = () => {
  window.postMessage({ type: "select-aid-or-credential" }, "*");
};

const requestAutoSignin = () => {
  window.postMessage({ type: "select-auto-signin" }, "*");
};

const attemptAutoSignin = async () => {
  const { data, error } = await chrome.runtime.sendMessage(extensionId, {
    type: "fetch-resource",
    subtype: "auto-signin-signature",
  });
  if (error) {
    requestAutoSignin();
  } else {
    return { data };
  }
};

module.exports = {
  requestAid,
  requestCredential,
  requestAidORCred,
  attemptAutoSignin,
};
