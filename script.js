// Save complaint in localStorage
if (document.getElementById("reportForm")) {
  document.getElementById("reportForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;

    const newComplaint = {
      id: Date.now(),
      name,
      email,
      location,
      description,
      status: "Pending"
    };

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    complaints.push(newComplaint);
    localStorage.setItem("complaints", JSON.stringify(complaints));

    document.getElementById("msg").textContent = "✅ Complaint submitted successfully!";
    this.reset();
  });
}

// Track complaint by email
if (document.getElementById("trackForm")) {
  document.getElementById("trackForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("trackEmail").value;
    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    const result = complaints.filter((c) => c.email === email);

    const div = document.getElementById("trackResult");
    div.innerHTML = "";

    if (result.length > 0) {
      result.forEach((r) => {
        div.innerHTML += `<p><b>ID:</b> ${r.id}<br><b>Location:</b> ${r.location}<br><b>Status:</b> ${r.status}</p><hr>`;
      });
    } else {
      div.innerHTML = "<p>No complaints found for this email.</p>";
    }
  });
}

// View all complaints
if (document.getElementById("complaintList")) {
  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  const list = document.getElementById("complaintList");
  if (complaints.length === 0) {
    list.innerHTML = "<p>No complaints submitted yet.</p>";
  } else {
    complaints.forEach((c) => {
      list.innerHTML += `<div><b>${c.name}</b> (${c.email})<br>📍 ${c.location}<br>${c.description}<br>Status: ${c.status}</div>`;
    });
  }
}

// Admin Panel - mark as resolved
if (document.getElementById("adminList")) {
  let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  const list = document.getElementById("adminList");

  if (complaints.length === 0) {
    list.innerHTML = "<p>No complaints to manage.</p>";
  } else {
    complaints.forEach((c, index) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><b>${c.name}</b> - ${c.description}<br>Status: <b>${c.status}</b></p>
        <button onclick="markResolved(${index})">Mark as Resolved</button>
        <hr>`;
      list.appendChild(div);
    });
  }
}

function markResolved(index) {
  let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  complaints[index].status = "Resolved";
  localStorage.setItem("complaints", JSON.stringify(complaints));
  alert("Complaint marked as resolved!");
  location.reload();
}
