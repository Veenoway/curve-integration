fetch("./events_curve.json")
  .then((response) => response.json())
  .then((data) => {
    const lastElement = data[data.length - 1];
    const keys = Object.keys(lastElement);

    keys.forEach((key) => {
      const value = lastElement[key];
      const element = document.getElementById(key);
      if (value?.hex) {
        const formattedValue = parseInt(value.hex, 16);
        element.innerHTML = `${key}: ${formattedValue}`;
      } else element.innerHTML = `${key}: ${value}`;
    });
  })
  .catch((error) =>
    console.error("Erreur lors du chargement du fichier JSON:", error)
  );

fetch("./remove_liquidity_one.json")
  .then((response) => response.json())
  .then((data) => {
    const lastElement = data[data.length - 1];
    const keys = Object.keys(lastElement);

    keys.forEach((key) => {
      const value = lastElement[key];
      const element = document.getElementById(key);
      if (value?.hex) {
        const formattedValue = parseInt(value.hex, 16);
        element.innerHTML = `${key}: ${formattedValue}`;
      } else element.innerHTML = `${key}: ${value}`;
    });
  })
  .catch((error) =>
    console.error("Erreur lors du chargement du fichier JSON:", error)
  );
