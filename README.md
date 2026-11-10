# BU Commodities Trading Club

Official website for the **Boston University Commodities Trading Club (BUCTC)**, a student organization focused on developing members' understanding of global physical and financial commodity markets.

The website serves as the club's central resource for information about meetings, competitions, market challenges, educational resources, club membership, and announcements.

## About BUCTC

BUCTC explores commodity markets across **energy, metals, agriculture, and softs**, with an emphasis on market analysis, trading strategies, and the forces that shape global trade.

Club activities include market discussions, member pitches, trading simulations, competitions, educational programming, and opportunities to connect with students and industry professionals interested in commodities.

## Website

The site is built using static **HTML, CSS, and JavaScript** and deployed through **Cloudflare Pages**.

### Main Pages

* **Home** - Club overview, current market topics, and membership information
* **About** - Mission and information about the club
* **Meeting Notes** - Materials and summaries from club meetings
* **Competitions** - Information about trading and market-analysis competitions
* **Challenges** - Practical commodity-market research challenges
* **Resources** - Recommended books, articles, podcasts, data, and research tools
* **Mailing List** - Signup for club news, announcements, and updates

The repository also contains the club's Constitution and website Privacy, Terms of Use, and Accessibility pages.

## Mailing List

The website integrates with **MailerLite** for mailing-list registration and club email communications. Subscribers can receive club announcements, meeting information, competition updates, and other BUCTC communications.

## Deployment

The production website is available at:

**https://buctc.org**

The site is deployed using **Cloudflare Pages** and uses **Cloudflare Web Analytics** for website analytics.

The default Cloudflare Pages domain, `bucommodities.pages.dev`, permanently redirects to the production `buctc.org` domain.

## Organization

**Boston University Commodities Trading Club**

Established 2026
## WhatsApp Access Requests

All website WhatsApp links lead to `whatsapp.html`, not a public group invite.
The form requires a name, an `@bu.edu` email, and a WhatsApp phone number with
country code. The club reviews requests manually; no invite is returned.
A hidden honeypot is checked on the server. The BU domain check does not prove
email ownership and the honeypot does not stop every bot.

Configure these Cloudflare Pages environment variables before deploying:

- `MAILERLITE_API_KEY`: reuse the existing secret API key.
- `MAILERLITE_WHATSAPP_GROUP_ID`: the ID of a new, separate MailerLite group named
  `WhatsApp requests`. It must differ from `MAILERLITE_GROUP_ID`.

In MailerLite, review Subscribers > Groups > WhatsApp requests. Each request stores
name, email, and the default `phone` field. Add approved numbers manually in WhatsApp.
Move reviewed requests out of the pending group if desired. Repeat submissions
update the same email's subscriber record rather than creating separate records.

This endpoint does not send email or add requests to the newsletter group. Keep
this group out of newsletter campaigns and email automations, and check MailerLite's
API/integration double-opt-in settings so these requests do not trigger emails.
Existing newsletter members keep their existing subscriptions. Phone numbers and
names are shared subscriber fields, so submitting updates them on that record.

Reset the old group invitation inside WhatsApp so previously copied links stop
working. The website change alone cannot invalidate an existing invite.
