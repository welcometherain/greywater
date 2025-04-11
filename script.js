document.getElementById("toggle-advanced").addEventListener("click", function () {
  const adv = document.getElementById("advanced-settings");
  adv.style.display = adv.style.display === "none" || !adv.style.display ? "block" : "none";
});

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

  const weeklyShowerWater = people * showers * showerMinutes * showerFlow;
  const weeklyLaundryWater = washing * laundryUsage;
  const weeklyBathWater = baths * bathUsage;
  const weeklyBathroomSink = people * 7 * bathroomSinkUsage;
  const weeklyKitchenSink = people * 7 * kitchenSinkUsage;

  const totalWeeklyGreywater =
    weeklyShowerWater +
    weeklyLaundryWater +
    weeklyBathWater +
    weeklyBathroomSink +
    weeklyKitchenSink;

  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = `
    <h2>Your Weekly Greywater Output</h2>
    <ul class="output-list">
      <li><strong>Showers:</strong> ${weeklyShowerWater.toFixed(1)} gallons</li>
      <li><strong>Laundry:</strong> ${weeklyLaundryWater.toFixed(1)} gallons</li>
      <li><strong>Baths:</strong> ${weeklyBathWater.toFixed(1)} gallons</li>
      <li><strong>Bathroom Sink:</strong> ${weeklyBathroomSink.toFixed(1)} gallons</li>
      <li><strong>Kitchen Sink:</strong> ${weeklyKitchenSink.toFixed(1)} gallons</li>
    </ul>
    <div class="total-output">Estimated Total: ${totalWeeklyGreywater.toFixed(1)} gallons/week</div>
  `;
});
