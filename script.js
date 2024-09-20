// script.js
fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=G9zexpKhgeTfxNZTBErs8jDAeNROwwV8&city=Seattle&classificationName=music")
  .then(response => response.json())
  .then(json => {
    console.log(json);
    
    const concertList = document.getElementById('Concerts');
    concertList.innerHTML = '';  // Clear previous content

    if (json._embedded && json._embedded.events) {
      const events = json._embedded.events;

      events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.textContent = `${event.name} - ${event.dates.start.localDate} at ${event._embedded.venues[0].name}`;
        concertList.appendChild(listItem);
      });
    } else {
      concertList.textContent = 'No concerts found for the given criteria.';
    }
  })
  .catch(error => {
    console.error('Error fetching concerts:', error);
    document.getElementById('Concerts').textContent = 'Unable to fetch concerts at the moment.';
  });
