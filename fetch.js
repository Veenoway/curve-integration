fetch("./events_curve.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const lastElement = data[data.length - 1];
    const keys = Object.keys(lastElement);

    keys.forEach((key) => {
      const value = lastElement[key];
      const element = document.getElementById(key);
      if (value?.hex) element.innerHTML = `${key}: ${value.hex}`;
      else element.innerHTML = `${key}: ${value}`;
    });
  })
  .catch((error) =>
    console.error("Erreur lors du chargement du fichier JSON:", error)
  );
