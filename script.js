// ================= MOBILE MENU =================
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    navLinks.classList.toggle('active');
    menuIcon.style.display = navLinks.classList.contains('active') ? 'none' : 'block';
    closeIcon.style.display = navLinks.classList.contains('active') ? 'block' : 'none';
}

// ================= REPORT FORM =================
if (document.getElementById("reportForm")) {
    document.getElementById("reportForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const isAnonymous = formData.get("anonymous") === "on";

        // Prepare payload for n8n
        const payload = {
    fullName: isAnonymous ? "Anonymous" : (formData.get("fullName") || "Not Provided"),
    userId: isAnonymous ? "Anonymous" : (formData.get("userId") || "Not Provided"),
    category: formData.get("category") || "General",
    description: formData.get("description") || "No description provided",
    fileName: document.getElementById("fileUpload")?.files[0]?.name || "No file",
    status: "Pending",
    priority: "Medium",
    submittedDate: new Date().toISOString(),
    lastUpdate: new Date().toISOString()
};
        try {
            const response = await fetch("https://yanaparikh.app.n8n.cloud/webhook-test/d7862c12-6d4f-4309-b4f6-512f65d1541f", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("Webhook error");

            const data = await response.json();
            alert(`✅ Issue Submitted!\nTracking ID: ${data.trackingId}`);
            window.location.href = "track.html";
        } catch (error) {
            console.error(error);
            alert("❌ Submission failed. Please check console.");
        }
    });
}

// ================= ANONYMOUS =================
function toggleAnonymous(checkbox) {
    const fullName = document.getElementById('fullName');
    const userId = document.getElementById('userId');

    fullName.disabled = checkbox.checked;
    userId.disabled = checkbox.checked;

    if (checkbox.checked) {
        fullName.value = '';
        userId.value = '';
    }
}

// ================= FILE NAME UI =================
function updateFileName(input) {
    const fileNameSpan = document.getElementById('fileName');
    fileNameSpan.textContent = input.files && input.files[0] ? input.files[0].name : "Choose a file";
}

// ================= TRACK PAGE =================
async function searchIssue(event) {
    event.preventDefault();
    const trackingId = document.getElementById('trackingId').value.trim();

    try {
        const response = await fetch(`https://yanaparikh.app.n8n.cloud/webhook-test/d7862c12-6d4f-4309-b4f6-512f65d1541f?trackingId=${trackingId}`);
        if (!response.ok) throw new Error("Fetch error");

        const issue = await response.json();
        const notFound = document.getElementById('notFound');
        const issueDetails = document.getElementById('issueDetails');

        if (issue && issue.trackingId) {
            displayIssue(issue);
            notFound.style.display = 'none';
            issueDetails.style.display = 'block';
        } else {
            document.getElementById('notFoundId').textContent = trackingId;
            issueDetails.style.display = 'none';
            notFound.style.display = 'block';
        }
    } catch (error) {
        console.error(error);
        alert("❌ Unable to fetch issue. Please check console.");
    }
}

function displayIssue(issue) {
    document.getElementById('issueId').textContent = issue.trackingId;
    document.getElementById('issueCategory').textContent = issue.category;
    document.getElementById('issueDescription').textContent = issue.description;
    document.getElementById('issueSubmitted').textContent = new Date(issue.submittedDate).toDateString();
    document.getElementById('issueUpdated').textContent = new Date(issue.lastUpdate).toDateString();
    document.getElementById('issueStatus').textContent = issue.status;
    document.getElementById('issueStatus').className = 'status-badge ' + issue.status.toLowerCase().replace(" ", "-");
    document.getElementById('issuePriority').textContent = issue.priority;
    document.getElementById('issuePriority').className = 'priority-badge ' + issue.priority.toLowerCase();
    document.getElementById('issueFile').textContent = issue.fileName || "No file";

    buildTimeline(issue);
}

function buildTimeline(issue) {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = `
        <div class="timeline-item">
            <div class="timeline-content">
                <p>Submitted</p>
                <p>${new Date(issue.submittedDate).toDateString()}</p>
            </div>
        </div>
    `;
}

// ================= ADMIN PANEL =================
async function loadAdminData() {
    try {
        const response = await fetch("https://yanaparikh.app.n8n.cloud/webhook-test/d7862c12-6d4f-4309-b4f6-512f65d1541f");
        if (!response.ok) throw new Error("Fetch error");

        const issues = await response.json();
        const tableBody = document.getElementById("issuesTableBody");
        tableBody.innerHTML = "";

        let pending = 0, progress = 0, resolved = 0;

        issues.forEach(issue => {
            if (issue.status === "Pending") pending++;
            else if (issue.status === "In Progress") progress++;
            else if (issue.status === "Resolved") resolved++;

            tableBody.innerHTML += `
                <tr>
                    <td>${issue.trackingId}</td>
                    <td>${issue.userId}</td>
                    <td>${issue.category}</td>
                    <td>${issue.fileName || "No file"}</td>
                    <td><span class="priority-badge ${issue.priority.toLowerCase()}">${issue.priority}</span></td>
                    <td><span class="status-badge ${issue.status.toLowerCase().replace(" ", "-")}">${issue.status}</span></td>
                    <td>${new Date(issue.submittedDate).toDateString()}</td>
                    <td>
                        <button onclick="viewIssue('${issue.trackingId}')">View</button>
                        <button onclick="updateStatus('${issue.trackingId}')">Update</button>
                    </td>
                </tr>
            `;
        });

        document.getElementById("totalIssues").textContent = issues.length;
        document.getElementById("pendingCount").textContent = pending;
        document.getElementById("progressCount").textContent = progress;
        document.getElementById("resolvedCount").textContent = resolved;

    } catch (error) {
        console.error(error);
        alert("❌ Unable to load admin data. Check console.");
    }
}

async function updateStatus(id) {
    try {
        const response = await fetch("https://YOUR_N8N_UPDATE_STATUS_WEBHOOK", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trackingId: id })
        });
        if (!response.ok) throw new Error("Update error");

        const result = await response.json();
        alert("✅ Status Updated!");
        loadAdminData();
    } catch (error) {
        console.error(error);
        alert("❌ Failed to update status. Check console.");
    }
}

// Auto-load admin data if panel exists
if (document.getElementById("issuesTableBody")) loadAdminData();