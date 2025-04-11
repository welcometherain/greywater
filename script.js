document.getElementById('greywater-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const people = parseInt(document.getElementById('people').value) || 0;
  const showersPerWeek = parseInt(document.getElementById('showers').value) || 0;
  const showerMinutes = parseFloat(document.getElementById('shower-minutes').value) || 0;
  const laundryLoads = parseInt(document.getElementById('washing').value) || 0;
  const baths = parseInt(document.getElementById('baths').value) || 0;

  const showerFlow = parseFloat(document.getElementById('shower-flow').value) || 2.1;
  const laundryUsage = parseFloat(document.getElementById('laundry-usage').value) || 25;
  const bathUsage = parseFloat(document.getElementById('bath-usage').value) || 40;
  const bathroomSinkUsage = parseFloat(document.getElementById('bathroom-sink-usage').value) || 2.5;
  const kitchenSinkUsage = parseFloat(document.getElementById('kitchen-sink-usage').value) || 5;

  // Calculations
  const showerWaterWeekly = people * showersPerWeek * showerMinutes * showerFlow;
  const laundryWaterWeekly = laundryLoads * laundryUsage;
  const bathWaterWeekly = baths * bathUsage;
  const bathroomSinkWeekly = people * 7 * bathroomSinkUsage;
  const kitchenSinkWeekly = people * 7 * kitchenSinkUsage;

  const totalWeekly = showerWaterWeekly + laundryWaterWeekly + bathWaterWeekly + bathroomSinkWeekly + kitchenSinkWeekly;
  const totalYearly = totalWeekly * 52;

  const format = (n) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  const output = `
    <h2>Your Weekly Greywater Estimate</h2>
    <ul class="output-list">
      <li><strong>Showers:</strong> ${format(showerWaterWeekly)} gallons/week (${format(showerWaterWeekly * 52)} gallons/year)</li>
      <li><strong>Laundry:</strong> ${format(laundryWaterWeekly)} gallons/week (${format(laundryWaterWeekly * 52)} gallons/year)</li>
      <li><strong>Baths:</strong> ${format(bathWaterWeekly)} gallons/week (${format(bathWaterWeekly * 52)} gallons/year)</li>
      <li><strong>Bathroom Sinks:</strong> ${format(bathroomSinkWeekly)} gallons/week (${format(bathroomSinkWeekly * 52)} gallons/year)</li>
      <li><strong>Kitchen Sinks:</strong> ${format(kitchenSinkWeekly)} gallons/week (${format(kitchenSinkWeekly * 52)} gallons/year)</li>
    </ul>
    <div class="total-output">Total Weekly: ${format(totalWeekly)} gallons<br>Total Yearly: ${format(totalYearly)} gallons</div>
  `;

  document.getElementById('result').innerHTML = output;
});
