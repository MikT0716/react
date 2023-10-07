import { useState } from "react";
import { Task } from "./task";
import "bootstrap/dist/css/bootstrap.css";
import sun from "./assets/img/sun.png";
import moon from "./assets/img/moon.png";

function App() {
    const [toDoList, setToDoList] = useState([]);
    const [newTask, setNewTask] = useState("");
    const handleStringInput = (event) => {
        setNewTask(event.target.value);
    };

    const addNewTaskToList = () => {
        const task = {
            id:
                toDoList.length === 0
                    ? 1
                    : toDoList[toDoList.length - 1].id + 1,
            taskName: newTask,
            completed: false,
        };
        setToDoList([...toDoList, task]);
    };
    const deleteTask = (id) => {
        setToDoList(toDoList.filter((task) => task.id !== id));
    };
    const completeTask = (id) => {
        setToDoList(
            toDoList.map((task) => {
                if (task.id === id) {
                    return { ...task, completed: true };
                } else {
                    return task;
                }
            })
        );
    };

    const [catFact, setCatFact] = useState("");

    function fetchCats() {
        fetch("https://catfact.ninja/fact")
            .then((response) => response.json())
            .then((data) => {
                setCatFact(data.fact);
            });
    }

    const [currentTemp, setCurrentTemp] = useState("");
    const [wind, setWind] = useState("");
    const [sunrise, setSunrise] = useState("");
    const [sunset, setSunset] = useState("");

    fetch(
        "https://api.weatherapi.com/v1/forecast.json?key=2585eb18e183453e830183343230610&q=budapest"
    )
        .then((response) => response.json())
        .then((data) => {
            setCurrentTemp(data.current.temp_c);
            setWind(data.current.wind_kph);
            setSunrise(data.forecast.forecastday[0].astro.sunrise);
            setSunset(data.forecast.forecastday[0].astro.sunset);
        });

    var currentHour = new Date().getHours();
    var currentMinute = new Date().getMinutes().toString().padStart(2, "0");

    const apiSunrise = sunrise;
    const apiSunriseParts = apiSunrise.split(":");
    const sunriseHour = parseInt(apiSunriseParts[0], 10);

    const apiSunset = sunset;
    const apiSunsetParts = apiSunset.split(":");
    const sunsetHour = parseInt(apiSunsetParts[0], 10);

    return (
        <div className="App">
            <div className="navbar d-flex p-3 text-white">
                Current weather in Budapest: {currentTemp}°C with a wind of{" "}
                {wind}km/h.
                <div className="weatherIcon">
                    <img
                        src={
                            currentHour >= sunriseHour &&
                            currentHour <= sunsetHour
                                ? sun
                                : moon
                        }
                        alt=""
                    ></img>{" "}
                    {currentHour}:{currentMinute}
                </div>
            </div>
            <div className="min-vh-75">
                <h1 className="text-center">To-Do List</h1>
                <div className="text-center my-3">
                    <input onChange={handleStringInput}></input>
                    <button onClick={addNewTaskToList}>Add task</button>
                </div>
                <div className="list">
                    {toDoList.map((task) => {
                        return (
                            <Task
                                taskName={task.taskName}
                                id={task.id}
                                completed={task.completed}
                                deleteTask={deleteTask}
                                completeTask={completeTask}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="min-vh-75 justify-content-center">
                <div className="text-center">
                    <h1 className="my-3">Cat Fact Generator</h1>
                    <h3 className="my-3">Generate meawsome Cat Facts!</h3>
                    <p>{catFact}</p>

                    <button onClick={fetchCats} className="catButton"></button>
                </div>
            </div>
        </div>
    );
}

export default App;
