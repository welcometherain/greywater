// script.js

document.getElementById("greywater-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const people = parseFloat(document.getElementById("people").value);
  const showers = parseFloat(document.getElementById("showers").value);
  const showerMinutes = parseFloat(document.getElementById("shower-minutes").value);
  const washing = parseFloat(document.getElementById("washing").value);
  const baths = parseFloat(document.getElementById("baths").value);

  const showerFlow = parseFloat(document.getElementById("shower-flow").value);
  const laundryUsage = parseFloat(document.getElementById("laundry-usage").value);
  const bathUsage = parseFloat(document.getElementById("bath-usage").value);
  const bathroomSinkUsage = parseFloat(document.getElementById("bathroom-sink-usage").value);
  const kitchenSinkUsage = parseFloat(document.getElementById("kitchen-sink-usage").value);

  const showerTotal = people * showers * showerMinutes * showerFlow;
  const laundryTotal = washing * laundryUsage;
  const bathTotal = baths * bathUsage;
  const bathroomSinkTotal = people * bathroomSinkUsage * 7;
  const kitchenSinkTotal = people * kitchenSinkUsage * 7;

  const weeklyTotal = showerTotal + laundryTotal + bathTotal + bathroomSinkTotal + kitchenSinkTotal;
  const yearlyTotal = weeklyTotal * 52;

  document.getElementById("result").innerHTML = `
    <div class="output-box">
      <h2>Estimated Greywater Output</h2>
      <p><strong>Showers:</strong> ${showerTotal.toFixed(1)} gallons/week</p>
      <p><strong>Laundry:</strong> ${laundryTotal.toFixed(1)} gallons/week</p>
      <p><strong>Baths:</strong> ${bathTotal.toFixed(1)} gallons/week</p>
      <p><strong>Bathroom Sinks:</strong> ${bathroomSinkTotal.toFixed(1)} gallons/week</p>
      <p><strong>Kitchen Sinks:</strong> ${kitchenSinkTotal.toFixed(1)} gallons/week</p>
      <hr>
      <p><strong>Total Weekly:</strong> ${weeklyTotal.toFixed(1)} gallons</p>
      <p><strong>Total Yearly:</strong> ${yearlyTotal.toFixed(1)} gallons</p>
    </div>
  `;

  document.getElementById("assumptions").innerHTML = "";
});

// Toggle advanced settings
const toggleButton = document.getElementById("toggle-advanced");
const advancedSettings = document.getElementById("advanced-settings");

toggleButton.addEventListener("click", () => {
  if (advancedSettings.style.display === "none" || advancedSettings.style.display === "") {
    advancedSettings.style.display = "block";
    toggleButton.textContent = "Hide Water Flow Rates";
  } else {
    advancedSettings.style.display = "none";
    toggleButton.textContent = "Customize Water Flow Rates";
  }
});

