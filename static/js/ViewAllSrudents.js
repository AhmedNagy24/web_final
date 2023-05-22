fetch('get_data/')
  .then(response => response.json())
  .then(data => {
    // Use the retrieved data
    console.log(data);
    // Process the data or update the UI
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });