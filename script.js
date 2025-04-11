// Greywater Calculator Script

document.getElementById("greywater-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const people = parseInt(document.getElementById("people").value);
  const showersPerWeek = parseInt(document.getElementById("showers").value);
  const showerMinutes = parseInt(document.getElementById("shower-minutes").value);
  const laundryLoads = parseInt(document.getElementById("washing").value);
  const baths = parseInt(document.getElementById("baths").value);

  const showerFlow = parseFloat(document.getElementById("shower-flow").value);
  const laundryUsage = parseFloat(document.getElementById("laundry-usage").value);
  const bathUsage = parseFloat(document.getElementById("bath-usage").value);
  const bathroomSinkUsage = parseFloat(document.getElementById("bathroom-sink-usage").value);
  const kitchenSinkUsage = parseFloat(document.getElementById("kitchen-sink-usage").value);

  // Calculations
  const totalShowers = people * showersPerWeek * showerMinutes * showerFlow;
  const totalLaundry = laundryLoads * laundryUsage;
  const totalBaths = baths * bathUsage;
  const totalBathroomSink = people * bathroomSinkUsage * 7; // 7 days per week
  const totalKitchenSink = people * kitchenSinkUsage * 7; // 7 days per week

  const totalGreywater = totalShowers + totalLaundry + totalBaths + totalBathroomSink + totalKitchenSink;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <div class="result-card">
      <h2>Estimated Weekly Greywater Output</h2>
      <p><strong>Total:</strong> ${totalGreywater.toFixed(1)} gallons/week</p>
      <div id="breakdown-list">
        <p><strong>Showers:</strong> ${totalShowers.toFixed(1)} gallons/week</p>
        <p><strong>Laundry:</strong> ${totalLaundry.toFixed(1)} gallons/week</p>
        <p><strong>Baths:</strong> ${totalBaths.toFixed(1)} gallons/week</p>
        <p><strong>Bathroom Sinks:</strong> ${totalBathroomSink.toFixed(1)} gallons/week</p>
        <p><strong>Kitchen Sinks:</strong> ${totalKitchenSink.toFixed(1)} gallons/week</p>
      </div>
    </div>
  `;
});

// Toggle advanced settings
const toggleButton = document.getElementById("toggle-advanced");
const advancedSettings = document.getElementById("advanced-settings");

toggleButton.addEventListener("click", function () {
  if (advancedSettings.style.display === "none" || advancedSettings.style.display === "") {
    advancedSettings.style.display = "block";
    toggleButton.textContent = "Hide Customization";
  } else {
    advancedSettings.style.display = "none";
    toggleButton.textContent = "Customize Water Flow Rates";
  }
});
