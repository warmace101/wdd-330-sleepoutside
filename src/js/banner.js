document.addEventListener("DOMContentLoaded", function () {
      console.log("El DOM está listo, ejecutando banner.js"); // ← Verifica si aparece en la consola

  // Check if banner has been shown before
  if (!localStorage.getItem("bannerShown")) {
    // Create banner element
    const banner = document.createElement("div");
    banner.id = "register-banner";
    banner.style.position = "fixed";
    banner.style.bottom = "0";
    banner.style.left = "0";
    banner.style.width = "100%";
    banner.style.backgroundColor = "#333";
    banner.style.color = "#fff";
    banner.style.padding = "15px";
    banner.style.textAlign = "center";
    banner.style.fontSize = "18px";
    banner.style.zIndex = "1000";
    banner.style.boxShadow = "0 -2px 10px rgba(0,0,0,0.3)";
    banner.style.display = "flex";
    banner.style.justifyContent = "space-between";
    banner.style.alignItems = "center";

    // Banner content text
    banner.innerHTML = `
      <span>
        Register now and enter our giveaway! Don't miss out on exclusive prizes.
      </span>
      <button id="close-banner" style="
        background-color: #f04e23;
        border: none;
        color: white;
        font-weight: bold;
        padding: 8px 15px;
        cursor: pointer;
        border-radius: 4px;
        margin-left: 20px;
      ">Close</button>
    `;

    // Append banner to body
    document.body.appendChild(banner);

    // Close button handler
    document.getElementById("close-banner").addEventListener("click", function () {
      banner.style.display = "none";
      // Save in localStorage so banner doesn't show again
      localStorage.setItem("bannerShown", "true");
    });
  }
});
