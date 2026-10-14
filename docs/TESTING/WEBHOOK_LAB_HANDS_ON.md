# Any-Shape — verify a real webhook effect yourself

**Purpose:** Test the source forms *before* cross-language reconstruction. This lab uses a real loopback HTTP receiver, does not require a third-party account, and displays actual JSON requests received. No claim of production webhook guarantees.

## Launch

From the project root run three separate terminal sessions:

**Terminal A — original form applications**
```sh
npm ci
npm run build:openform-schema
npm run dev
```

**Terminal B — independent test receiver**
```sh
npm run dev:webhook-lab
```

**Browser C — evidence dashboard**
Open **http://127.0.0.1:4174/** in your browser. It should display a Webhook laboratory with a count of received events and four test endpoint URLs. It refreshes automatically every 1.5 seconds.

### Do one real form submission

1. Open an author URL:
   - Studio: **http://127.0.0.1:4173/examples/openform/?edit=1**
   - Flow: **http://127.0.0.1:4173/examples/openform-flow/?edit=1**
   - TypeScript Schema: **http://127.0.0.1:4173/examples/openform-schema/?edit=1**
2. Click **Connections**, then **+ Add destination**.
3. In the new destination, set Name to **Local test webhook**, Type to **HTTPS endpoint / webhook** (the field may say HTTPS, but HTTP loopback is explicitly allowed for development), and URL to **http://127.0.0.1:4174/receive/success**. Keep Enabled and Required selected; press **Save connections**.
4. Click **Publish locally**. The respondent view should contain only the title, description, form sections/questions, navigation and submission feedback—**no Connections button, editing controls or builder sidebar**.
5. Fill out the form using **synthetic values only**, and Submit.
6. Switch to **http://127.0.0.1:4174/**. The event count should increase. Its JSON record should include `method: "POST"`, `path: "/receive/success"`, the matching `formId`, a nonempty `recordId` and `answerKeys`. The `body.answers` keys should match what you submitted. That **observed receipt**, not a UI notification alone, is the basic proof of working wiring.

### Test failure and partial delivery

1. Return to the author URL ending `?edit=1` and change the test endpoint to `http://127.0.0.1:4174/receive/reject`.
2. Publish again, submit synthetic data and verify the form reports delivery incomplete, while the dashboard logs an HTTP request associated with a 400 scenario.
3. Repeat with `/receive/error` (HTTP 500), and optionally `/receive/slow` (delayed 202 response).
4. Add a *second* destination that saves locally. Send to a failing remote endpoint. Confirm the remote event is logged, while the local response can still be viewed or exported. This deliberately exposes the limitations of naive retries: partial success may duplicate a local record if Submit is repeated.

**If one of these steps fails, preserve the exact error, browser, application, form configuration and relevant sanitized event receipt.** Do not claim the language-neutral transfer contract is verified until these original-source effects work.

### One-command receiver test

```sh
npm run test:webhook-lab
```

This verifies the receiver itself with actual loopback requests (202, 400, 500, origin rejection, invalid JSON, event capture and clearing). It is **not a substitute** for using the real forms or for browser tests.

## What this lab does *not* prove

- A private third-party webhook integration, secret management or HMAC signature.
- Exactly-once processing or durable retry queues.
- Public internet hosting, cross-device submission collection, or production user authentication.
- That HTTP 202 means the external workflow actually finished.
- That Python or Avalonia currently implements the same effects.

**Privacy:** All received payloads are kept in server process memory and shown in the local browser dashboard. The receiver only binds to `127.0.0.1:4174`, refuses browser Origins other than `http://127.0.0.1:4173`, limits JSON size to 64KB and keeps the most recent 100 events. Nonetheless, only test with fictional/synthetic answers; browser requests may include personally entered text.

## Next agent milestone

After the manual exercise succeeds for all three forms, use these observed requests and receipts as the source evidence to produce a small, versioned, neutral effect fixture. Then independently implement its counterpart in Python/Qt and Avalonia. Track PASS, FAIL and UNKNOWN separately for behavior, external effects, responsive appearance and native packaging.

**The central lesson:** a browser button's meaning is not its JavaScript callback. It is the actual, authorized consequence that can be reproduced and verified after transformation.
