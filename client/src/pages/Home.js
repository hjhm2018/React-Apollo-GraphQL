import AddCar from "../components/forms/addCar";
import AddPerson from "../components/forms/addPerson";
import RecordsTitle from "../components/layout/RecordsTitle";
import Cars from "../components/lists/Cars";

const Home = () => {
  return (
    <div className="App">
      <h1>PEOPLE AND THEIR CARS</h1>
      <AddPerson />
      <AddCar />
      <RecordsTitle />
      <Cars />
    </div>
  );
};

export default Home;
