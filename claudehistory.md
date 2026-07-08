
❯ and the mailer system in the contact, it rely on nodemailer google that's free but sometimes google revokes the keys, is there another alternative ? or should we remove it ?

  Thought for 11s

Let me look at how the mailer is actually wired before recommending anything.

  Thought for 7s, read 2 files

Now I can see the whole picture. Here's my read and recommendation.

What you actually have

Gmail SMTP via nodemailer with a GMAIL_USER/GMAIL_PASS app password. Two real problems beyond the key revocation you mentioned:

1. from: email (line 14) — you're setting the sender to the visitor's email. Gmail refuses to send "as" an address it doesn't own, so many messages get rejected or spam-foldered. This is likely part of why it feels flaky, not just revoked keys.
2. Errors are swallowed (line 75-77) — sendMail catches the error and logs it, then returns normally. So the API always reports success: true even when the mail failed. The user sees "Email envoyé avec succès!" while nothing arrived.

So "Google revokes the keys" is one cause; the code also hides failures and misuses the from header.

Options, honestly

Don't remove it — a contact form is essential for a B2B site chasing hotels/designers/distributors. The question is just how it sends.

┌───────────────────────────────┬──────────────────────────────────────┬───────────────────┬──────────────────────────────────────────────┐
│            Option             │             Reliability              │     Free tier     │                 Setup effort                 │
├───────────────────────────────┼──────────────────────────────────────┼───────────────────┼──────────────────────────────────────────────┤
│ Resend (recommended)          │ High — built for transactional mail  │ 3,000/mo, 100/day │ ~15 min: sign up, verify domain, one API key │
├───────────────────────────────┼──────────────────────────────────────┼───────────────────┼──────────────────────────────────────────────┤
│ Brevo (ex-Sendinblue)         │ High                                 │ 300/day           │ Domain verify + key                          │
├───────────────────────────────┼──────────────────────────────────────┼───────────────────┼──────────────────────────────────────────────┤
│ Gmail SMTP (current)          │ Low — revocations, from limits, spam │ "free"            │ already done                                 │
├───────────────────────────────┼──────────────────────────────────────┼───────────────────┼──────────────────────────────────────────────┤
│ Remove form, use mailto: link │ N/A — no server                      │ free              │ trivial                                      │
└───────────────────────────────┴──────────────────────────────────────┴───────────────────┴──────────────────────────────────────────────┘

My recommendation: switch to Resend. You already own the domain (ong-volotsangana.org), so you verify it once, and mail sends from your own domain (contact@ong-volotsangana.org) → far better deliverability than Gmail, and no personal-account key to revoke. It's a smaller, purpose-built dependency than SMTP-through-Gmail. The nodemailer dep gets removed.

The migration is small — swap lib/mailer.js to the Resend SDK, keep the API route almost identical, and fix the two bugs (proper from/reply-to, and let errors actually propagate so the form tells the truth).

Before I build it, one decision — the rest I'll handle with sane defaults:

● User answered Claude's questions:
· How do you want the contact form to send mail? (Delivery goes to ong.volotsangana16@gmail.com either way — this is about how it's sent.) → Switch to Resend (Recommended)

  Thought for 7s

Good call. Let me check the env setup, then build the migration. You'll create the Resend account + verify the domain + provide the key; I'll wire everything and remove nodemailer.

  Ran 1 shell command

● Task Output b97wxplfe
--- gitignore env ---
# local env files
.env.local
… +4 lines

  Thought for 8s

● Task Output b97wxplfe
--- gitignore env ---
# local env files
.env.local
… +4 lines

  Thought for 6s

The command is hanging on the grep. Let me stop it and use the proper tools.

● Stop Task
cd "C:/Users/Arotiana/Documents/ongVolotsangana" && ls -la .env* 2>/dev/null; echo "--- gitignore env ---"; grep -iE "env" .gitignore 2>/dev/null; echo "--- GMA… · stopped

  Searched for 1 pattern

Only 3 files touch the mailer — clean scope. Let me install the Resend SDK and rewrite lib/mailer.js, fixing the two bugs (proper from/reply_to, and real error propagation).

  Ran 1 shell command

❯ and if there is something that i can do manually just guide me and I'll do so