
function fetch_json(button_id, button_name, project_name)
{
  var ossp_name = project_name.toLowerCase();
  console.log(ossp_name);
  fetch('https://github.com/Be-Secure/besecure-assessment-datastore/blob/main/'+ ossp_name + '/' + button_id + '/' + button_name + '/' + ossp_name+ '-' + button_id + '-' + button_name + '-report.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.dir(err);
  });
}

function load_version_data()
{
    console.log("called");
    id = localStorage["id"]
    console.log("id:"+id);
    ossp_name = localStorage["name"];
    console.log("name:"+ossp_name);

  fetch('../assets/data/version_details/72-Wordpress-Versiondetails.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    
    console.log(data);
    console.log("length:"+data.length);
    console.log("version:"+data[0].version);
    
    for (let i = 0; i<Object.keys(data).length; i++)
    {
      
      const version = document.createElement("p");
      const release_date = document.createElement("p");
      const criticality = document.createElement("p");
      const scorecard = document.createElement("p");
      const cve_table = document.createElement("TABLE");
      const button = document.createElement("BUTTON") 
      
      cve_table.setAttribute("id", "cve_table"+i) // Setting id for each cve table. i is the loop var so each table would have different ids. Hence, we can create different tables for each cve details.
      
      
      const version_data = document.createTextNode("Version:"+data[i].version);
      const release_date_data = document.createTextNode("Release date:"+data[i].release_date);
      const criticality_data = document.createTextNode("Criticality Score:"+data[i].criticality_score);
      const scorecard_data = document.createTextNode("Scorecard:"+data[i].scorecard);
      const button_text = document.createTextNode("Scorecard");
      
      button.setAttribute("id", data[i].version);
      button.setAttribute("name", "scorecard")
      // const cve_table_data = document.createTextNode(constructTable("#cve_table", table_data[0]))

      version.appendChild(version_data);
      release_date.appendChild(release_date_data);
      criticality.appendChild(criticality_data);      
      scorecard.appendChild(scorecard_data);    
      button.appendChild(button_text);  
      // cve_table.appendChild(cve_table_data)
      
      const element = document.getElementById("version_details");
      
      element.appendChild(version);
      element.appendChild(release_date);      
      element.appendChild(criticality);      
      element.appendChild(scorecard);
      element.appendChild(cve_table);
      element.appendChild(button);
      
      constructTable('#cve_table'+i, data[i].cve_details);
      cve_table.classList.add("cve_table");

      const buttons = document.getElementsByTagName("button");

      const buttonPressed = e => {
        console.log(e.target.id);  // Get ID of Clicked Element
        console.log(e.target.name);
        var button_id = e.target.id;
        var button_name = e.target.name;
        fetch_json(button_id, button_name, localStorage["name"]);
      }

      for (let b of buttons) {
        b.addEventListener("click", buttonPressed);
      } 
    
    }
  
  })
  
  .catch(function (err) {
  
    console.dir(err);
  
  });

}

function constructTable(selector, list) {

  console.log("construct table container");
  // Getting the all column names
  var cols = Headers(list, selector);

  // Traversing the JSON data
  for (var i = 0; i < list.length; i++) {
    var row = $('<tr/>');
    for (var colIndex = 0; colIndex < cols.length; colIndex++)
    {
      var val = list[i][cols[colIndex]];
      
      // If there is any key, which is matching
      // with the column name
      if (val == null) val = "";
        row.append($('<td/>').html(val));
    }
    
    // Adding each row to the table
    $(selector).append(row);
  }
  return row;
}

function Headers(list, selector) {
  var columns = [];
  var header = $('<tr/>');
  
  for (var i = 0; i < list.length; i++) {
    var row = list[i];
    
    for (var k in row) {
      if ($.inArray(k, columns) == -1) {
        columns.push(k);
        
        // Creating the header
        header.append($('<th/>').html(k));
      }
    }
  }
  
  // Appending the header to the table
  $(selector).append(header);
    return columns;
}	