console.log("loading script.js");

const favorite = document.querySelector("#favorite");

async function loadOptions() {
  try {
    const response = await fetch("/assets/data/options.json");

    if (!response.ok) {
      throw new Error(`Could not load local JSON: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    data.forEach((item) => {
      let newOption = new Option(item.name, item.id);
      favorite.appendChild(newOption);
    });

  } catch (error) {
    console.error("Error loading options:", error);
  }
}

loadOptions();