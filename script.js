document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("bookingTable");
    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    const editForm = document.getElementById("editForm");
  
    document.querySelectorAll(".btn-outline-success").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const row = btn.closest("tr");
        const cells = row.querySelectorAll("td");
  
        document.getElementById("editRowIndex").value = index;
        document.getElementById("editName").value = cells[0].textContent;
        document.getElementById("editService").value = cells[1].textContent;
        document.getElementById("editDate").value = cells[2].textContent;
        document.getElementById("editTime").value = convertTimeTo24(cells[3].textContent);
        document.getElementById("editStatus").value = cells[4].textContent.trim();
  
        editModal.show();
      });
    });
  
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const index = document.getElementById("editRowIndex").value;
      const row = table.querySelectorAll("tbody tr")[index];
      const cells = row.querySelectorAll("td");
  
      cells[0].textContent = document.getElementById("editName").value;
      cells[1].textContent = document.getElementById("editService").value;
      cells[2].textContent = document.getElementById("editDate").value;
      cells[3].textContent = convertTimeTo12(document.getElementById("editTime").value);
  
      const status = document.getElementById("editStatus").value;
      let badgeClass = "bg-secondary";
      if (status === "Pending") badgeClass = "bg-warning";
      else if (status === "Confirmed") badgeClass = "bg-success";
      else if (status === "Completed") badgeClass = "bg-primary";
  
      cells[4].innerHTML = `<span class="badge ${badgeClass}">${status}</span>`;
  
      editModal.hide();
    });
  
    document.querySelectorAll(".btn-outline-danger").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this booking?")) {
          btn.closest("tr").remove();
        }
      });
    });
  
    function convertTimeTo24(timeStr) {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":");
      if (modifier === "PM" && hours !== "12") hours = parseInt(hours) + 12;
      if (modifier === "AM" && hours === "12") hours = "00";
      return `${hours}:${minutes}`;
    }
  
    function convertTimeTo12(timeStr) {
      let [hours, minutes] = timeStr.split(":");
      const modifier = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${modifier}`;
    }
  });
  