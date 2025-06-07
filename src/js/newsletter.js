// js/newsletter.js
document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("newsletter-email");
  const messageDiv = document.getElementById("newsletter-message");

  newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
      showMessage("Please enter a valid email address", "error");
      return;
    }

    try {
      // Here you would typically send the data to a server
      // For now, we'll just simulate a successful submission
      showMessage("Thank you for subscribing to our newsletter!", "success");
      newsletterForm.reset();

      // In a real implementation, you would likely have:
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      // const data = await response.json();
      // showMessage(data.message, data.success ? 'success' : 'error');
    } catch (error) {
      showMessage("An error occurred. Please try again later.", "error");
      //console.error("Newsletter submission error:", error);
    }
  });

  function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = "message";
    messageDiv.classList.add(type);

    // Hide message after 5 seconds
    setTimeout(() => {
      messageDiv.textContent = "";
      messageDiv.className = "message";
    }, 5000);
  }
});
