import "./Update.css";
import { useState } from "react";
import { useUser } from "./UserContext";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

function UpdateActivityWrapper() {
  const { id } = useParams();
  const activity = useFetch(`http://localhost:3080/api/activities/${id}`);

  if (!activity) {
    return <i>Loading...</i>;
  }

  return <UpdateActivity activity={activity} />;
}

function UpdateActivity({ activity }) {
  const [activityName, setActivityName] = useState(activity.activityName || "");
  const [type, setType] = useState(activity.type || "");
  const [description, setDescription] = useState(activity.description || "");
  const [location, setLocation] = useState(activity.location || "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [totalPlaces, setTotalPlaces] = useState("");
  const [activityUpdated, setActivityUpdated] = useState(false);

  const user = useUser();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3080/api/activities/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        activityName,
        type,
        description,
        location,
        startDate,
        endDate,
        price,
        totalPlaces,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    });

    if (res.ok) {
      setActivityUpdated(true);
    }
  };

  if (activityUpdated) {
    return <Redirect to={`/activity/${id}`} />;
  }

  return (
    <div className="update-activity">
      <h1>Editar Actividad</h1>
      <form className="formUpdate" onSubmit={handleSubmit}>
        <h2>Nombre actividad:</h2>

        <input
          name="activityName"
          placeholder="activityName..."
          type="text"
          required
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
        />
        <h2> Tipo actividad:</h2>

        <input
          name="type"
          placeholder="type..."
          type="text"
          required
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <h2> Descripción:</h2>

        <textarea
          name="description"
          placeholder="description..."
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <h2> Localización:</h2>

        <input
          name="location"
          placeholder="location..."
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <h2> Fecha inicio:</h2>

        <input
          name="startDate"
          placeholder="startDate..."
          type="datetime-local"
          required
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <h2> Fecha fin:</h2>

        <input
          name="endDate"
          placeholder="endDate..."
          type="datetime-local"
          required
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <h2> Precio:</h2>

        <input
          name="price"
          placeholder="price..."
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <h2> Plazas totales:</h2>

        <input
          name="totalPlaces"
          placeholder="totalPlaces..."
          type="number"
          min="0"
          required
          value={totalPlaces}
          onChange={(e) => setTotalPlaces(e.target.value)}
        />
        <button className="button-update">Update</button>
      </form>
    </div>
  );
}

export default UpdateActivityWrapper;
