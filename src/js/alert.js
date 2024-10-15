export default class Alert {
  constructor() {
    this.alertsURL = '/json/alert.json';    
  }


async loadAlerts() {
    try {
      const response = await fetch(this.alertsURL);
      
      // Check if the response is OK (status code between 200-299)
      if (response.ok) {
        const alerts = await response.json(); // Parse the response body as JSON
        // console.log('Loaded alerts:', alerts); // Log the alerts to verify
        this.displayAlerts(alerts); // Display alerts if everything is fine
      } else {
        throw new Error(`Failed to fetch alerts: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  }
  

  displayAlerts(alerts) {
    if (alerts.length > 0) {
      const alertList = document.createElement('section');
      alertList.classList.add('alert-list');

      alerts.forEach((alert) => {
        const alertDOM = document.createElement('p');
        alertDOM.textContent = alert.message;
        alertDOM.style.backgroundColor = alert.background;
        alertDOM.style.color = alert.color;
        alertList.appendChild(alertDOM);
      });

      //prepend the alertList to the main element
      const mainDOM = document.querySelector('main');
      if (mainDOM) {
        mainDOM.prepend(alertList);
      }
    }
  }
}
