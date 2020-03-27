let { PythonShell } = require("python-shell");
var path = require("path");

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

function control_robot(file_path, parameters) {
  var options = {
    scriptPath: file_path + "/components/robot/test",
    args: [
      parameters["serial"],
      parameters["port"],
      parameters["baud_value"],
      parameters["delay"],
      parameters["via_points"],
      parameters["grippers"],
      parameters["trajectory"]
    ]
  };

  try {
    process.env["PYTHONPATH"] = file_path;
    let pyshell = new PythonShell("connect_to_gui.py", options);

    pyshell.on("error", err => {
      alert(err);
      new Notification("Error in running python code", {
        body: "Something went wrong: " + err
      });
    });

    pyshell.on("message", function(message) {
      console.log(message);

      function generateTableHead(table, data) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of data) {
          let th = document.createElement("th");
          row.appendChild(th);
        }
      }

      let table = document.querySelector("table");
      let data = ["Response"];

      generateTableHead(table, data);
      generateTable(table, [{ Response: message }]);
    });
    return true;
  } catch (err) {
    console.log(err);
  }
}
