const form = document.getElementById("form");

function handleSubmit(e) {
  e.preventDefault();

  // Clear previous error states
  for (const field of form.elements) {
    field.classList.remove("error");
  }

  // Check all fields
  const fields = [...form.elements].filter((el) => el.tagName === "INPUT");
  let hasError = false;

  fields.forEach((field) => {
    // clear any old errors first
    field.classList.remove("error");
    const name = field.name;
    const helper = document.getElementById(`${name}-help`);
    helper.classList.remove("error");
    helper.innerHTML = "";
    // if empty add error styling
    if (!field.value.trim()) {
      field.classList.add("error");
      field.setAttribute("aria-invalid", "true");
      helper.classList.add("error");
      helper.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/><path fill="currentColor" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/></svg> Please provide your ${name}.
      `;
      hasError = true;
    }
    // validate email
    if (field.name === "email" && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(field.value.trim())) {
        field.classList.add("error");
        field.setAttribute("aria-invalid", "true");
        helper.classList.add("error");
        helper.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/><path fill="currentColor" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/></svg> Please provide a valid email address.
        `;
        hasError = true;
      }
    }
  });

  if (hasError) {
    return;
  }
}

form.addEventListener("submit", handleSubmit);
