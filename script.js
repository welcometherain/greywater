// script.js

function formatNumber(num) {
  return num.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

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

  const showerWeekly = people * showers * showerMinutes * showerFlow;
  const laundryWeekly = washing * laundryUsage;
  const bathWeekly = baths * bathUsage;
  const bathroomSinkWeekly = people * bathroomSinkUsage * 7;
  const kitchenSinkWeekly = people * kitchenSinkUsage * 7;

  const showerYearly = showerWeekly * 52;
  const laundryYearly = laundryWeekly * 52;
  const bathYearly = bathWeekly * 52;
  const bathroomSinkYearly = bathroomSinkWeekly * 52;
  const kitchenSinkYearly = kitchenSinkWeekly * 52;

  const weeklyTotal = showerWeekly + laundryWeekly + bathWeekly + bathroomSinkWeekly + kitchenSinkWeekly;
  const yearlyTotal = weeklyTotal * 52;

  document.getElementById("result").innerHTML = `
    <div class="output-box">
      <h2>Estimated Greywater Output</h2>
      <p>🚿 <strong>Showers:</strong> ${formatNumber(showerWeekly)} gallons/week | ${formatNumber(showerYearly)} gallons/year</p>
      <p>🧺 <strong>Laundry:</strong> ${formatNumber(laundryWeekly)} gallons/week | ${formatNumber(laundryYearly)} gallons/year</p>
      <p>🛁 <strong>Baths:</strong> ${formatNumber(bathWeekly)} gallons/week | ${formatNumber(bathYearly)} gallons/year</p>
      <p>🪥 <strong>Bathroom Sinks:</strong> ${formatNumber(bathroomSinkWeekly)} gallons/week | ${formatNumber(bathroomSinkYearly)} gallons/year</p>
      <p>🍽️ <strong>Kitchen Sinks:</strong> ${formatNumber(kitchenSinkWeekly)} gallons/week | ${formatNumber(kitchenSinkYearly)} gallons/year</p>
      <hr>
      <p style="color: #EC19C0;"><strong>Total Weekly:</strong> ${formatNumber(weeklyTotal)} gallons</p>
      <p style="color: #EC19C0;"><strong>Total Yearly:</strong> ${formatNumber(yearlyTotal)} gallons</p>
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
