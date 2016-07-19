window.onload = function() {
  console.log('window loaded');

  var url = "https://restcountries.eu/rest/v1";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function() {
    if (request.status === 200) {
      var jsonString = request.responseText;
      console.log(jsonString);
      var countries = JSON.parse(jsonString);
      var country = countries[0];
      console.log(country);
      console.log(country.name);
    }

    addCountriesByRegion();
    addCountriesBySubRegion();

    var dropdown = document.createElement('select');
    dropdown.setAttribute("id", "dropdownList");

    var countryFound = document.getElementById('country-found');

    var regionDropdown = document.getElementById('region');
    var subRegionDropdown = document.getElementById('sub-region');

    var regionText = document.getElementById('countries-by-region');
    var subRegionText = document.getElementById('countries-by-sub-region');

    var displayCountryValues = function() {
      var currentlySelected = dropdown.options[dropdown.selectedIndex].value;
      countries.forEach(function(country) {
        if (country.name === currentlySelected) {
          countryFound.innerText =  "The population of " + country.name + " is " + country.population + ", and it's capital is " + country.capital;
          localStorage.setItem('selectedCountry', JSON.stringify(country));
          displayBorderingCountries(country);
        }
      });
    }

    var displayRegionValues = function() {
      var currentlySelected = regionDropdown.options[regionDropdown.selectedIndex].value;
      regionText.innerText = "";
      regionText.innerText += "The countries in " + currentlySelected + " are:\n";
      countries.forEach(function(country) {
        if (country.region === currentlySelected) {
          regionText.innerText +=  country.name + "\n";
        }
      });
    }

    var displaySubRegionValues = function() {
      var currentlySelected = subRegionDropdown.options[subRegionDropdown.selectedIndex].value;
      subRegionText.innerText = "";
      subRegionText.innerText += "The countries in " + currentlySelected + " are:\n";
      countries.forEach(function(country) {
        if (country.subregion === currentlySelected) {
          subRegionText.innerText +=  country.name + "\n";
        }
      });
    }

    function addCountriesByRegion() {
      var regionDropdown = document.getElementById('region');
      var uniqueNames = [];
      countries.forEach(function(country) {
        if (uniqueNames.indexOf(country.region) === -1) {
          uniqueNames.push(country.region)
        }
      });

      uniqueNames.forEach(function(region) {
        var option = document.createElement('option');
        option.text = region;
        option.value = region;
        regionDropdown.appendChild(option);
      });
    }

    function addCountriesBySubRegion() {
      var subRegionDropdown = document.getElementById('sub-region');
      var uniqueNames = [];
      countries.forEach(function(country) {
        if (uniqueNames.indexOf(country.subregion) === -1) {
          uniqueNames.push(country.subregion)
        }
      });

      uniqueNames.forEach(function(subregion) {
        var option = document.createElement('option');
        option.text = subregion;
        option.value = subregion;
        subRegionDropdown.appendChild(option);
      });
    }

  dropdown.onchange = displayCountryValues;
  regionDropdown.onchange = displayRegionValues;
  subRegionDropdown.onchange = displaySubRegionValues;


  var countryList = document.getElementById('country-list');

  addCountries();

  function addCountries() {
    countries.forEach(function(country) {
      var option = document.createElement('option');
      option.text = country.name;
      option.value = country.name;
      dropdown.appendChild(option);
    });
    countryList.appendChild(dropdown);
  }

  function displayBorderingCountries(country) {
    if (country.borders.length === 0) {
      countryFound.innerText += "\n\n" + country.name + " doesn't border any other countries"
    }
    else {
      countryFound.innerText += "\n\n" + country.name + " borders the following countries:\n"
      var border = country.borders;
      border.forEach(function(alphaCode) {
        var countryCode = alphaCode;
        countries.forEach(function(country) {
          if (country.alpha3Code === countryCode) {
            countryFound.innerText +=  "\n" + country.name + " - The population of " + country.name + " is " + country.population + ", and it's capital is " + country.capital;
          }
        });
      });
    }
  }
};

request.send(null);
console.log(request);
}