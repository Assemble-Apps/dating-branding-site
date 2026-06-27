// Welcome email sent to subscribers when they join the waitlist. Plain
// inline styles throughout - email clients (Outlook, Gmail) don't reliably
// support modern CSS, so this deliberately doesn't reuse the site's Tailwind
// classes or fancy gradients/blurs.
export function buildWelcomeEmail(email) {
  const subject = "you're on the list 💌"

  const text = `Hey,

You're officially on the Rissme waitlist - nice taste.

Here's what you've got locked in:
- First through the door when we launch
- A lil launch-day surprise
- A say in what we build next

We'll email the moment the app drops. Until then: no bots, no catfish, no ick. Promise.

- Team Rissme`

  const html = `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background-color:#EDE3D3;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EDE3D3;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#ffffff;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(100deg,#FF1493,#FF69B4,#FF8DC7);padding:28px 32px;text-align:center;">
                <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">rissme</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#FF69B4;text-transform:uppercase;letter-spacing:0.08em;">early access</p>
                <h1 style="margin:0 0 16px;font-size:26px;line-height:1.2;color:#100D18;">you're on the list 💌</h1>
                <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#43344A;">
                  Hey - you're officially on the Rissme waitlist. Dating that feels like a crush, not a chore, is coming your way soon.
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;width:100%;">
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#100D18;">✅ &nbsp;First through the door at launch</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#100D18;">🎁 &nbsp;A lil launch-day surprise</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#100D18;">🗣️ &nbsp;A say in what we build next</td>
                  </tr>
                </table>
                <p style="margin:0;font-size:14px;line-height:1.6;color:#43344A;">
                  We'll email you the moment the app drops. Until then: no bots, no catfish, no ick. Promise.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:#F6F1E7;text-align:center;">
                <p style="margin:0;font-size:12px;color:#837B92;">
                  You're getting this because ${email} joined the Rissme waitlist at rissme.com.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  return { subject, text, html }
}
