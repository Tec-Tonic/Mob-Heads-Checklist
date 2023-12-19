const modeButton = document.getElementById("modeButton");
const sortButton = document.getElementById("sortButton");
const body = document.body;
let lines = [];
let originalOrder = [];

modeButton.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    modeButton.textContent = "💡Dark Mode";
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    modeButton.textContent = "💡Light Mode";
  }
});

sortButton.addEventListener("click", () => {
  if (sortButton.textContent === "A-Z Sort") {
    lines.sort();
    sortButton.textContent = "Default Sort";
  } else {
    location.reload();
  }
  displayList(lines);
});

function displayList(items) {
  const checklist = document.getElementById("checklist");
  checklist.innerHTML = "";
  items.forEach((line) => {
    if (line.trim() !== "") {
      const listItem = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = localStorage.getItem(line) === "true";
      checkbox.addEventListener("change", () => {
        localStorage.setItem(line, checkbox.checked);
        listItem.className = checkbox.checked ? "checked" : "";
        updateCount();
      });
      listItem.appendChild(checkbox);
      listItem.appendChild(document.createTextNode(line));
      listItem.className = checkbox.checked ? "checked" : "";
      checklist.appendChild(listItem);
      updateCount();
    }
  });
}

fetch(
  "https://raw.githubusercontent.com/DorkOrc/PandamiumMobHeads/main/master_list.txt"
)
  .then((response) => response.text())
  .then((data) => {
    lines = data.split("\n");
    originalOrder = [...lines];

    const endSectionIndex = lines.indexOf(
      "Not required in order to complete the Taxidermist advancement:"
    );
    if (endSectionIndex !== -1) {
      lines.splice(endSectionIndex, 4);
    }
    displayList(lines);
    // Add the section that should always be at the end
    const endSection = [
      "Not required in order to complete the Taxidermist advancement:",
      "Ender Dragon",
      "Zombie Horse",
    ];
    const endSectionElement = document.getElementById("endSection");
    endSection.forEach((line) => {
      const listItem = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      listItem.appendChild(checkbox);
      listItem.appendChild(document.createTextNode(line));
      endSectionElement.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const countButton = document.getElementById("countButton");

function updateCount() {
  const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
  const checked = document.querySelectorAll('#checklist input[type="checkbox"]:checked');
  countButton.textContent = `${checked.length}/${checkboxes.length} collected`;
}

modeButton.addEventListener("click", updateCount);
sortButton.addEventListener("click", updateCount);
checkbox.addEventListener("change", updateCount);

// Call updateCount initially to set the correct count
updateCount();
