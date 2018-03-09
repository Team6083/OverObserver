$.ajax({
  url: "https://www.thebluealliance.com/api/v3/match/"+"2018nyut_qm63",
  accept: 'application/json',
  beforeSend: function(xhr) {
    xhr.setRequestHeader("X-TBA-Auth-Key", "IcTRNsZoayVbU8wgZ3xRETwnw6O9kvJg4hPC6XXGHbXfDYX8COi1fTW6DCrtBTNy");
  },
  type: 'GET'
});
