# MailerLite + Cloudflare Pages setup

The website code is ready. Do not put your MailerLite API key in any HTML or JavaScript file.

## 1. MailerLite

1. In MailerLite, create/select the group that should receive website signups.
2. Copy that group's numeric Group ID.
3. Make sure your welcome automation uses **Joins group** as its trigger and points to that same group.
4. Turn the automation on.

## 2. Cloudflare Pages secrets/variables

In Cloudflare: **Workers & Pages → your Pages project → Settings → Variables and Secrets → Add**.

Add these to the **Production** environment:

- `MAILERLITE_API_KEY` — your MailerLite API token. Choose **Encrypt** so it is stored as a secret.
- `MAILERLITE_GROUP_ID` — the numeric ID of your MailerLite group. This can be a normal variable or a secret.

If you use Cloudflare Preview deployments and want the form to work there too, add the same variables to Preview.

## 3. Deploy

Commit/push these files to the repository connected to Cloudflare Pages. The important new backend file is:

`functions/api/subscribe.js`

Cloudflare Pages maps that file to `/api/subscribe` automatically.

## 4. Test

1. Open the deployed `mailing-list.html` page.
2. Enter a test name and an email address you control.
3. Click **Join the mailing list**.
4. Confirm the page says you're on the list.
5. In MailerLite, confirm the address appears in the correct group.
6. Confirm the welcome automation sends its email.

If the page reports an error, check the Cloudflare Pages Function logs and verify both environment variable names are spelled exactly as shown above.
