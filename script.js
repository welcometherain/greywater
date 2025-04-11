document.addEventListener('DOMContentLoaded', function() {
  // Get form and advanced settings elements
  const form = document.getElementById('greywater-form');
  const toggleButton = document.getElementById('toggle-advanced');
  const advancedSettings = document.getElementById('advanced-settings');
  
  // Add form submission event listener
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateGreywater();
  });
  
  // Add input validation for all number inputs
  const numberInputs = document.querySelectorAll('input[type="number"]');
  numberInputs.forEach(input => {
    input.addEventListener('input', function() {
      if (this.value < 0) {
        this.value = 0;
      }
    });
  });
  
  // Toggle advanced settings visibility
  toggleButton.addEventListener('click', function() {
    if (advancedSettings.style.display === 'block') {
      advancedSettings.style.display = 'none';
      toggleButton.textContent = 'Customize Water Flow Rates';
    } else {
      advancedSettings.style.display = 'block';
      toggleButton.textContent = 'Hide Custom Settings';
    }
  });
});

/**
 * Calculate greywater output based on form inputs
 */
function calculateGreywater() {
  // Get input values
  const people = parseFloat(document.getElementById('people').value);
  const showersPerWeek = parseFloat(document.getElementById('showers').value);
  const showerMinutes = parseFloat(document.getElementById('shower-minutes').value);
  const laundryLoads = parseFloat(document.getElementById('washing').value);
  const bathsPerWeek = parseFloat(document.getElementById('baths').value);
  
  // Validate inputs
  if (isNaN(people) || isNaN(showersPerWeek) || isNaN(showerMinutes) || isNaN(laundryLoads) || isNaN(bathsPerWeek)) {
    showError('Please fill out all fields with valid numbers.');
    return;
  }
  
  if (people <= 0) {
    showError('Number of people must be at least 1.');
    return;
  }
  
  // Get custom water usage values if provided, otherwise use defaults
  const showerFlowRate = parseFloat(document.getElementById('shower-flow').value) || 2.1; // gallons per minute
  const laundryWaterPerLoad = parseFloat(document.getElementById('laundry-usage').value) || 25; // gallons per load
  const bathroomSinkPerPersonPerDay = parseFloat(document.getElementById('bathroom-sink-usage').value) || 2.5; // gallons per person per day
  const kitchenSinkPerPersonPerDay = parseFloat(document.getElementById('kitchen-sink-usage').value) || 5; // gallons per person per day
  const bathWaterPerBath = parseFloat(document.getElementById('bath-usage').value) || 40; // gallons per bath
  
  // Store water usage assumptions for display
  const assumptions = {
    showerFlow: showerFlowRate,
    laundryWater: laundryWaterPerLoad,
    bathroomSink: bathroomSinkPerPersonPerDay,
    kitchenSink: kitchenSinkPerPersonPerDay,
    bathWater: bathWaterPerBath
  };
  
  // Calculate shower water
  const originalWeeklyShowerWater = people * showersPerWeek * showerMinutes * showerFlowRate;
  const dailyShowerWater = originalWeeklyShowerWater / 7;
  
  // Calculate laundry water
  const originalWeeklyLaundryWater = laundryLoads * laundryWaterPerLoad;
  const dailyLaundryWater = originalWeeklyLaundryWater / 7;
  
  // Calculate bath water
  const originalWeeklyBathWater = bathsPerWeek * bathWaterPerBath;
  const dailyBathWater = originalWeeklyBathWater / 7;
  
  // Calculate sink water
  const dailyBathroomSinkWater = people * bathroomSinkPerPersonPerDay;
  const dailyKitchenSinkWater = people * kitchenSinkPerPersonPerDay;
  
  // Calculate totals
  const totalDailyGreywater = dailyShowerWater + dailyLaundryWater + dailyBathroomSinkWater + dailyKitchenSinkWater + dailyBathWater;
  
  // Calculate weekly values
  const weeklyShowerWater = dailyShowerWater * 7;
  const weeklyLaundryWater = dailyLaundryWater * 7;
  const weeklyBathroomSinkWater = dailyBathroomSinkWater * 7;
  const weeklyKitchenSinkWater = dailyKitchenSinkWater * 7;
  const weeklyBathWater = dailyBathWater * 7;
  const totalWeeklyGreywater = totalDailyGreywater * 7;
  
  const totalMonthlyGreywater = totalDailyGreywater * 30;
  const totalYearlyGreywater = totalDailyGreywater * 365;
  
  // Calculate monthly values
  const monthlyShowerWater = dailyShowerWater * 30;
  const monthlyLaundryWater = dailyLaundryWater * 30;
  const monthlyBathWater = dailyBathWater * 30;
  const monthlyBathroomSinkWater = dailyBathroomSinkWater * 30;
  const monthlyKitchenSinkWater = dailyKitchenSinkWater * 30;
  
  // Display results
  displayResults({
    daily: {
      shower: dailyShowerWater,
      laundry: dailyLaundryWater,
      bathroomSink: dailyBathroomSinkWater,
      kitchenSink: dailyKitchenSinkWater,
      bath: dailyBathWater,
      total: totalDailyGreywater
    },
    weekly: {
      shower: weeklyShowerWater,
      laundry: weeklyLaundryWater,
      bathroomSink: weeklyBathroomSinkWater,
      kitchenSink: weeklyKitchenSinkWater,
      bath: weeklyBathWater,
      total: totalWeeklyGreywater
    },
    monthly: {
      shower: monthlyShowerWater,
      laundry: monthlyLaundryWater,
      bathroomSink: monthlyBathroomSinkWater,
      kitchenSink: monthlyKitchenSinkWater,
      bath: monthlyBathWater,
      total: totalMonthlyGreywater
    },
    yearly: {
      total: totalYearlyGreywater
    },
    assumptions: assumptions,
    inputs: {
      people: people,
      showersPerWeek: showersPerWeek,
      showerMinutes: showerMinutes,
      laundryLoads: laundryLoads,
      bathsPerWeek: bathsPerWeek
    }
  });
  
  // Display water usage assumptions
  displayAssumptions(assumptions);
}

/**
 * Display error message
 * @param {string} message - Error message to display
 */
function showError(message) {
  const resultElement = document.getElementById('result');
  resultElement.innerHTML = `<div class="error">${message}</div>`;
  resultElement.style.borderLeft = '5px solid #f44336';
  
  // Clear assumptions display when there's an error
  const assumptionsElement = document.getElementById('assumptions');
  assumptionsElement.innerHTML = '';
}

/**
 * Display calculation results
 * @param {Object} data - Calculated water usage data
 */
function displayResults(data) {
  const resultElement = document.getElementById('result');
  
  // Function to format numbers with commas for thousands
  const formatNumber = (num) => {
    return Math.round(num).toLocaleString('en-US');
  };
  
  // Format the results HTML
  const html = `
    <h2>Your Greywater Production</h2>
    <div>
      <strong>Estimated Daily Greywater Output</strong><br>
      • Showers: ${data.daily.shower.toFixed(1)} gallons<br>
      • Laundry: ${data.daily.laundry.toFixed(1)} gallons<br>
      • Bathroom Sinks: ${data.daily.bathroomSink.toFixed(1)} gallons<br>
      • Kitchen Sink: ${data.daily.kitchenSink.toFixed(1)} gallons<br>
      • Baths: ${data.daily.bath.toFixed(1)} gallons<br>
      <br>
      <strong>Total: ${data.daily.total.toFixed(1)} gallons per day</strong>
    </div>
    <br>
    <div>
      <strong>Estimated Weekly Greywater Output</strong><br>
      • Showers: ${formatNumber(data.weekly.shower)} gallons<br>
      • Laundry: ${formatNumber(data.weekly.laundry)} gallons<br>
      • Bathroom Sinks: ${formatNumber(data.weekly.bathroomSink)} gallons<br>
      • Kitchen Sink: ${formatNumber(data.weekly.kitchenSink)} gallons<br>
      • Baths: ${formatNumber(data.weekly.bath)} gallons<br>
      <br>
      <strong>Total: ${formatNumber(data.weekly.total)} gallons per week</strong>
    </div>
    <br>
    <div>
      <strong>Estimated Monthly Greywater Output</strong><br>
      • Showers: ${formatNumber(data.monthly.shower)} gallons<br>
      • Laundry: ${formatNumber(data.monthly.laundry)} gallons<br>
      • Bathroom Sinks: ${formatNumber(data.monthly.bathroomSink)} gallons<br>
      • Kitchen Sink: ${formatNumber(data.monthly.kitchenSink)} gallons<br>
      • Baths: ${formatNumber(data.monthly.bath)} gallons<br>
      <br>
      <strong>Total: ${formatNumber(data.monthly.total)} gallons per month</strong>
    </div>
    <br>
    <div>
      <strong>Estimated Yearly Greywater Output</strong><br>
      <strong>Total: ${formatNumber(data.yearly.total)} gallons per year</strong>
    </div>
    <br>
    <div>
      <strong>Potential Impact</strong><br>
      Reusing this greywater could save approximately ${formatNumber(data.yearly.total)} gallons of fresh water per year.
    </div>
  `;
  
  // Update the result element
  resultElement.innerHTML = html;
  resultElement.style.borderLeft = '5px solid #34495E';
  
  // Scroll to results
  resultElement.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Display water usage assumptions
 * @param {Object} assumptions - Water usage assumptions
 */
function displayAssumptions(assumptions) {
  const assumptionsElement = document.getElementById('assumptions');
  
  // Format the assumptions HTML
  const html = `
    <h3>Water Usage Assumptions Used in Calculation</h3>
    <p>These values were used to calculate your greywater production. You can customize these values using the "Customize Water Flow Rates" button above.</p>
    
    <table>
      <tr>
        <th>Source</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Shower Flow Rate</td>
        <td>${assumptions.showerFlow.toFixed(1)} gallons per minute</td>
      </tr>
      <tr>
        <td>Laundry Water Usage</td>
        <td>${assumptions.laundryWater.toFixed(1)} gallons per load</td>
      </tr>
      <tr>
        <td>Bath Water</td>
        <td>${assumptions.bathWater.toFixed(1)} gallons per bath</td>
      </tr>
      <tr>
        <td>Bathroom Sink</td>
        <td>${assumptions.bathroomSink.toFixed(1)} gallons per person per day</td>
      </tr>
      <tr>
        <td>Kitchen Sink</td>
        <td>${assumptions.kitchenSink.toFixed(1)} gallons per person per day</td>
      </tr>
    </table>
  `;
  
  // Update the assumptions element
  assumptionsElement.innerHTML = html;
}
