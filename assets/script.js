console.log("script.js loaded");

const favoriteSelect = document.querySelector("#favoriteInput");
const profileForm = document.querySelector("#profileForm");
const profileOutput = document.querySelector("#profileOutput");
const clearBtn = document.querySelector("#btnClearSession");

// load json
async function loadOptions() {
  try {
    const response = await fetch("data/options.json");

    if (!response.ok) {
      throw new Error("Could not load local JSON: " + response.status);
    }

    const data = await response.json();
    console.log("Local JSON:", data);

    data.forEach(function (item) {
      const option = new Option(item.emoji + " " + item.name, item.id);
      favoriteSelect.appendChild(option);
    });

  } catch (error) {
    console.error("Error loading options:", error);
  }
}

// get image
async function getDogImage() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");

  if (!response.ok) {
    throw new Error("API request failed");
  }

  const data = await response.json();
  console.log("API data:", data);

  return data.message; // image URL
}

// render profile
function renderProfile(profile) {
  profileOutput.innerHTML =
    "<h2>" + profile.user.name + "'s Profile</h2>" +
    "<p><strong>Favorite:</strong> " + profile.selection.name + "</p>" +
    "<p><strong>Comment:</strong> " + profile.user.comment + "</p>" +
    '<img src="' + profile.api.dogImage + '" alt="Random dog" width="250">';
}

// form submit
profileForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.querySelector("#nameInput").value.trim();
  const favoriteId = document.querySelector("#favoriteInput").value;
  const comment = document.querySelector("#commentInput").value.trim();

  const selectedOption = favoriteSelect.options[favoriteSelect.selectedIndex];
  const favoriteName = selectedOption ? selectedOption.text : "None";

  try {
    const dogImage = await getDogImage();

    const sessionProfile = {
      user: {
        name: name || "Anonymous",
        comment: comment || "No comment"
      },
      selection: {
        id: favoriteId,
        name: favoriteName
      },
      api: {
        dogImage: dogImage
      }
    };

    console.log("Combined object:", sessionProfile);

    sessionStorage.setItem("sessionProfile", JSON.stringify(sessionProfile));

    const saved = JSON.parse(sessionStorage.getItem("sessionProfile"));
    renderProfile(saved);

  } catch (error) {
    console.error("Error creating profile:", error);
    profileOutput.innerHTML = "<p>Something went wrong. Try again.</p>";
  }
});

// survive refresh
function checkExistingSession() {
  const saved = sessionStorage.getItem("sessionProfile");

  if (saved) {
    const profile = JSON.parse(saved);
    console.log("Restored from sessionStorage:", profile);
    renderProfile(profile);
  }
}

// clear session
clearBtn.addEventListener("click", function () {
  sessionStorage.clear();
  profileOutput.innerHTML = "<p>Session cleared.</p>";
  profileForm.reset();
});

// start
loadOptions();
checkExistingSession();