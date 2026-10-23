(() => {
  const params = new URLSearchParams(window.location.search);
  const validSection = document.querySelector("#valid-invitation");
  const invalidSection = document.querySelector("#invalid-invitation");
  const destinations = [...params.entries()].filter(([key]) =>
    ["token", "club", "event"].includes(key.toLowerCase())
  );
  const showInvalidLink = () => {
    document.querySelector(".eyebrow").textContent = "MAGGIO LINK";
    document.querySelector("h1").textContent = "Unable to open link";
    document.querySelector(".intro").textContent = "Open events, clubs, and invitations in Maggio.";
    invalidSection.hidden = false;
  };
  if (destinations.length !== 1) {
    showInvalidLink();
    return;
  }

  const [kind, rawValue] = destinations[0];
  const isInvitation = kind === "token";
  const value = isInvitation ? rawValue.replace(/[\s-]/g, "").toUpperCase() : rawValue;
  const valid = isInvitation
    ? /^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6,32}$/.test(value)
    : ["club", "event"].includes(kind) && value.trim().length > 0 && !/[\u0000-\u001f\u007f-\u009f]/.test(value);
  if (!valid) {
    showInvalidLink();
    return;
  }

  const copyButton = document.querySelector("#copy-code");
  const help = document.querySelector(".help");
  let copyValue;
  if (isInvitation) {
    const formattedCode = value.match(/.{1,4}/g).join("-");
    document.querySelector("#invitation-code").textContent = formattedCode;
    document.querySelector("#open-app").href = `maggio://invite/open?token=${encodeURIComponent(value)}`;
    copyValue = formattedCode;
  } else {
    document.title = `Open ${kind} in Maggio`;
    document.querySelector(".eyebrow").textContent = `MAGGIO ${kind.toUpperCase()}`;
    document.querySelector("h1").textContent = `Open ${kind}`;
    document.querySelector(".intro").textContent = `Open this ${kind} in Maggio.`;
    document.querySelector(".code-label").hidden = true;
    document.querySelector("#invitation-code").hidden = true;
    document.querySelector("#open-app").href = `maggio://${kind === "club" ? "clubs" : "events"}/open?${kind}=${encodeURIComponent(value)}`;
    copyButton.textContent = "Copy link";
    const link = new URL("https://invite.maggio.club/invite/");
    link.searchParams.set(kind, value);
    copyValue = link.href;
    help.textContent = `Don't have Maggio yet? Install Maggio, sign in with Apple, then open this link again. Access follows the ${kind}'s permissions.`;
  }
  validSection.hidden = false;

  copyButton.addEventListener("click", async () => {
    const status = document.querySelector("#copy-result");
    try {
      await navigator.clipboard.writeText(copyValue);
      status.textContent = isInvitation ? "Invitation code copied." : "Link copied.";
    } catch {
      status.textContent = isInvitation
        ? "Press and hold the invitation code to copy it."
        : "Copy the link from your browser's address bar.";
    }
  });

  const appStoreLink = document.querySelector("#app-store");
  appStoreLink.href = "https://apps.apple.com/us/app/maggio-club/id6761921851";
  appStoreLink.hidden = false;
})();
