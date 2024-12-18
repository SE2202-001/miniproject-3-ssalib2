document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const output = document.getElementById("outputBox");
    const filterInput = document.getElementById("filter");
    const sortByNewest = document.getElementById("newest");
    const sortByOldest = document.getElementById("oldest");
    const sortByLevel = document.getElementById('level');
    const ongoing = document.getElementById('ongoing');
    const onetime = document.getElementById('onetime');
    
    let jsonData = [];

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            jsonData = JSON.parse(e.target.result);
            displayData(jsonData);
          } catch (error) {
            console.error("Error parsing JSON file:", error);
            alert("Invalid JSON file. Please upload a valid JSON file.");
          }
        };
        reader.readAsText(file);
      }
    });
  
    function displayData(data) {
    
      output.innerHTML = "";
      if (Array.isArray(data)) {
        data.forEach((item, index) => {
          const itemDiv = document.createElement("div");
          itemDiv.className = "item";
          itemDiv.textContent = `Item ${index + 1}: ${JSON.stringify(item, null, 2)}`;
          output.appendChild(itemDiv);
        });
      } else {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        itemDiv.textContent = JSON.stringify(data, null, 2);
        output.appendChild(itemDiv);
      }
    }
  
    filterInput.addEventListener("input", () => {
      const filterValue = filterInput.value.toLowerCase();
      const filteredData = jsonData.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(filterValue)
      );
      displayData(filteredData);
    });

    // For the newest and oldest I couldn't exactly figure out how to sort the minutes so unfortunately I know I am getting deducted for this.
    // It works for anything having 1h+ on the other hand.
    sortByNewest.addEventListener("click", () => {
        jsonData.sort((a, b) => (a.Posted > b.Posted ? 1 : -1));
        displayData(jsonData);
      });   
    sortByOldest.addEventListener("click", () => {
        jsonData.sort((a, b) => (a.Posted < b.Posted ? 1 : -1));
        displayData(jsonData);
      }); 
    sortByLevel.addEventListener("click", () => {
        jsonData.sort((a, b) => {
            if (a.Level.startsWith('Entry') && b.Level.startsWith("Inter")) return -1;
            if (a.Level.startsWith('Entry') && b.Level.startsWith("Exper")) return -1;
            if (a.Level.startsWith('Inter') && b.Level.startsWith("Entry")) return 1;
            if (a.Level.startsWith('Inter') && b.Level.startsWith("Exper")) return -1;
            if (a.Level.startsWith('Exper') && b.Level.startsWith("Entry")) return 1;
            if (a.Level.startsWith('Exper') && b.Level.startsWith("Inter")) return 1;
        });
        displayData(jsonData);
    });
    ongoing.addEventListener("click", () => {
        jsonData.sort((a, b) => {
            if (a.Type == ('One-time project')) return 1;
            else return -1;
        });
        displayData(jsonData);
    });
    onetime.addEventListener("click", () => {
        jsonData.sort((a, b) => {
            if (a.Type == ('Ongoing project')) return 1;
            else return -1;
        });
        displayData(jsonData);
    });
  });