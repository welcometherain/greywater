document.getElementById('greywater-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const people = parseInt(document.getElementById('people').value);
  const showers = parseInt(document.getElementById('showers').value);
  const showerMinutes = parseFloat(document.getElementById('shower-minutes').value);
  const washing = parseInt(document.getElementById('washing').value);
  const baths = parseInt(document.getElementById('baths').value);

  const showerFlow = parseFloat(document.getElementById('shower-flow').value);
  const laundryUsage = parseFloat(document.getElementById('laundry-usage').value);
  const bathUsage = parseFloat(document.getElementById('bath-usage').value);
  const bathroomSink = parseFloat(document.getElementById('bathroom-sink-usage').value);
  const kitchenSink = parseFloat(document.getElementById('kitchen-sink-usage').value);

  const totalShowers = showers * people;
  const showerWater = totalShowers * showerMinutes * showerFlow;

  const laundryWater = washing * laundryUsage;
  const bathWater = baths * bathUsage;

  const dailySinkWater = (bathroomSink + kitchenSink) * people;
  const weeklySinkWater = dailySinkWater * 7;

  const weeklyTotal = showerWater + laundryWater + bathWater + weeklySinkWater;
  const dailyAverage = weeklyTotal / 7;
  const yearlyTotal = weeklyTotal * 52;

  const result = `
    <h2>Greywater Estimates</h2>
    <ul class="output-list">
      <li><strong>Shower water per week:</strong> ${showerWater.toFixed(1)} gallons</li>
      <li><strong>Laundry water per week:</strong> ${laundryWater.toFixed(1)} gallons</li>
      <li><strong>Bath water per week:</strong> ${bathWater.toFixed(1)} gallons</li>
      <li><strong>Sink water per week:</strong> ${weeklySinkWater.toFixed(1)} gallons</li>
    </ul>
    <p class="total-output">Total greywater per week: <strong>${weeklyTotal.toFixed(1)} gallons</strong></p>
    <p class="total-output">Average per day: <strong>${dailyAverage.toFixed(1)} gallons</strong></p>
    <p class="total-output">Estimated per year: <strong>${yearlyTotal.toFixed(0)} gallons</strong></p>
  `;
  document.getElementById('result').innerHTML = result;

  const assumptions = `
    <h3>Assumptions</h3>
    <ul>
      <li>Shower Flow Rate: ${showerFlow} gal/min</li>
      <li>Laundry: ${laundryUsage} gal/load</li>
      <li>Baths: ${bathUsage} gal/bath</li>
      <li>Bathroom Sink: ${bathroomSink} gal/person/day</li>
      <li>Kitchen Sink: ${kitchenSink} gal/person/day</li>
    </ul>
    <p>Change these values using the <strong>Customize Water Flow Rates</strong> button above.</p>
  `;
  document.getElementById('assumptions').innerHTML = assumptions;
});

document.getElementById('toggle-advanced').addEventListener('click', function () {
  const settings = document.getElementById('advanced-settings');
  settings.classList.toggle('open');
});
