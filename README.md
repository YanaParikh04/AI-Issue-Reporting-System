# 🚀 Issue Reporting System

A full-stack **Issue Reporting & Tracking System** built using **HTML, CSS, JavaScript, and n8n automation**, with **Google Sheets as the database**.

---

## 📌 Features

* 📝 Submit issues with details (name, ID, category, description)
* 🕵️ Anonymous reporting option
* 📎 Optional file upload (image name stored)
* 🔢 Auto-generated Tracking ID
* 🔍 Track issue status using Tracking ID
* 🛠 Admin panel to view and manage issues
* 📊 Google Sheets integration as backend database
* ⚡ Powered by n8n workflows

---

## 🏗️ Project Structure

```
📁 project-folder
│── index.html
│── report.html
│── track.html
│── admin.html
│── styles.css
│── script.js
```

---

## ⚙️ Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend Automation: n8n
* Database: Google Sheets
* API: n8n Webhooks

---

## 🔗 How It Works

1. User submits form from `report.html`
2. Data is sent to n8n via Webhook
3. n8n:

   * Generates Tracking ID
   * Stores data in Google Sheets
4. User receives Tracking ID
5. User can track issue via `track.html`
6. Admin views all issues in `admin.html`

---

## 🧠 n8n Workflow

### Flow:

```
Webhook → Function Node → Google Sheets → Respond to Webhook
```

### Function Node Code:

```javascript
const body = items[0].json.body || items[0].json;

const trackingId = "ISSUE-" + Math.floor(100000 + Math.random() * 900000);

return [
  {
    json: {
      trackingId,
      fullName: body.fullName,
      userId: body.userId,
      category: body.category,
      description: body.description,
      fileName: body.fileName || "No file",
      status: body.status || "Pending",
      priority: body.priority || "Medium",
      submittedDate: body.submittedDate,
      lastUpdate: body.lastUpdate
    }
  }
];
```

---

## 🌐 Webhook Setup

Replace your webhook URL in `script.js`:

```javascript
fetch("https://your-n8n-domain/webhook/YOUR_WEBHOOK_ID", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
});
```

⚠️ Do NOT use `/webhook-test/` in production.

---

## 📊 Google Sheets Columns

Make sure your sheet has these columns:

```
trackingId | fullName | userId | category | description | fileName | status | priority | submittedDate | lastUpdate
```

---

## 🧪 Running Locally

1. Clone the repository:

```
git clone https://github.com/yanaparikh04/issue-reporting-system.git
```

2. Open `index.html` in your browser

3. Ensure your n8n workflow is active

---

## 🚨 Common Issues & Fixes

### ❌ Fields coming empty in n8n

✔ Ensure:

* `Content-Type: application/json` is set
* Webhook node is configured correctly

---

### ❌ "Missing required fields"

✔ Check Function node is reading:

```
items[0].json.body
```

---

### ❌ Tracking ID not showing

✔ Ensure "Respond to Webhook" node returns:

```json
{
  "trackingId": "{{ $json.trackingId }}"
}
```

---

## 📈 Future Improvements

* 📬 Email notifications
* 🤖 AI-based priority detection
* 🔐 Authentication for admin panel
* 📁 Actual file upload (not just name)
* 📊 Dashboard analytics

---

## 🤝 Contributing

Pull requests are welcome! Feel free to improve UI, add features, or optimize workflows.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 💡 Author

Built with ❤️ using n8n + JavaScript
