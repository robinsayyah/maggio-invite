# Maggio invitation landing site

Static fallback for `https://invite.maggio.club/invite/?token=...` when Maggio is not installed.

The repository workflow `.github/workflows/invitation-pages.yml` publishes this
directory as a GitHub Pages artifact after changes reach `main`, or when run
manually.

Before publishing:

1. In GitHub repository settings, set Pages source to GitHub Actions.
2. Point the `invite.maggio.club` CNAME record to `robinsayyah.github.io`.
3. Enforce HTTPS after GitHub provisions the certificate.
4. Confirm the application identifier in `.well-known/apple-app-site-association`.
5. Verify the AASA URL returns HTTP 200 with no redirect and an appropriate JSON content type.
6. Configure the App Store or TestFlight URL in `assets/invitation.js` when available.

The site intentionally does not validate tokens or expose event/club data. All redemption happens in the authenticated app.
