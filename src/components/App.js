import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";
import PlantList from "./PlantList";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  const handleAddPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  };

  const handleToggleStock = (plantId) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === plantId
          ? { ...plant, isInStock: !plant.isInStock }
          : plant
      )
    );
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={setSearchTerm} />
      <PlantList plants={filteredPlants} onToggleStock={handleToggleStock} />
    </div>
  );
}

export default App;
