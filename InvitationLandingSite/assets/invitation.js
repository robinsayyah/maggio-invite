(() => {
  const alphabet = /^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6,32}$/;
  const params = new URLSearchParams(window.location.search);
  const rawToken = params.get("token") ?? "";
  const token = rawToken.replace(/[\s-]/g, "").toUpperCase();
  const validSection = document.querySelector("#valid-invitation");
  const invalidSection = document.querySelector("#invalid-invitation");

  if (!alphabet.test(token)) {
    invalidSection.hidden = false;
    return;
  }

  const formatCode = (value) => value.match(/.{1,4}/g).join("-");
  const formattedCode = formatCode(token);
  document.querySelector("#invitation-code").textContent = formattedCode;
  document.querySelector("#open-app").href = `maggio://invite/open?token=${encodeURIComponent(token)}`;
  validSection.hidden = false;

  document.querySelector("#copy-code").addEventListener("click", async () => {
    const status = document.querySelector("#copy-result");
    try {
      await navigator.clipboard.writeText(formattedCode);
      status.textContent = "Invitation code copied.";
    } catch {
      status.textContent = "Press and hold the invitation code to copy it.";
    }
  });

  // Populate this after Maggio has a public App Store or TestFlight destination.
  const appStoreURL = "";
  if (appStoreURL) {
    const appStoreLink = document.querySelector("#app-store");
    appStoreLink.href = appStoreURL;
    appStoreLink.hidden = false;
  }
})();
