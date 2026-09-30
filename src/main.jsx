import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const rides = [
  {
    id: "mini",
    name: "Cab Mini",
    icon: "🚕",
    description: "Affordable everyday ride",
    baseFare: 60,
    ratePerKm: 14,
    eta: "3 min",
  },
  {
    id: "sedan",
    name: "Cab Sedan",
    icon: "🚘",
    description: "Comfortable ride for 4 people",
    baseFare: 90,
    ratePerKm: 18,
    eta: "5 min",
  },
  {
    id: "suv",
    name: "Cab SUV",
    icon: "🚙",
    description: "More space for groups",
    baseFare: 130,
    ratePerKm: 24,
    eta: "7 min",
  },
];

function App() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedRide, setSelectedRide] = useState("mini");
  const [distance, setDistance] = useState(8);
  const [booked, setBooked] = useState(false);
  const [rideHistory, setRideHistory] = useState([]);

  const ride = rides.find((item) => item.id === selectedRide);

  const fare = ride.baseFare + distance * ride.ratePerKm;

  const handleBooking = () => {
    if (!pickup || !destination) {
      alert("Please enter pickup and destination.");
      return;
    }

    const newRide = {
      id: Date.now(),
      pickup: pickup,
      destination: destination,
      vehicle: ride.name,
      fare: fare,
      eta: ride.eta,
    };

    setRideHistory([newRide, ...rideHistory]);
    setBooked(true);
  };

  return (
    <div className="app">

      {/* Header */}
      <header>
        <div className="logo">
          🚕 <span>RideNow</span>
        </div>

        <div className="badge">
          Cab Booking
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">
          <p className="eyebrow">
            YOUR RIDE, YOUR WAY
          </p>

          <h1>
            Book a cab in
            <br />
            <span>just a few clicks.</span>
          </h1>

          <p className="sub">
            Choose your pickup location, destination and cab.
            Get an instant fare estimate.
          </p>
        </div>

        {/* Location Box */}
        <div className="hero-card">

          <div className="pin start">
            ●
          </div>

          <div className="route-line"></div>

          <div className="pin end">
            ●
          </div>

          <div className="locations">

            <input
              type="text"
              placeholder="Pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />

            <input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />

          </div>
        </div>

      </section>

      {/* Main Content */}
      <main className="content">

        <div className="left-section">

          {/* Ride Selection */}
          <h2>
            Choose your ride
          </h2>

          <div className="ride-list">

            {rides.map((item) => (

              <button
                key={item.id}
                className={
                  selectedRide === item.id
                    ? "ride active"
                    : "ride"
                }
                onClick={() => {
                  setSelectedRide(item.id);
                  setBooked(false);
                }}
              >

                <span className="car-icon">
                  {item.icon}
                </span>

                <span className="ride-text">

                  <b>
                    {item.name}
                  </b>

                  <small>
                    {item.description}
                  </small>

                </span>

                <span className="eta">
                  {item.eta}
                </span>

              </button>

            ))}

          </div>

          {/* Distance */}
          <div className="distance">

            <label>
              Estimated distance
            </label>

            <div className="distance-control">

              <input
                type="range"
                min="1"
                max="40"
                value={distance}
                onChange={(e) =>
                  setDistance(Number(e.target.value))
                }
              />

              <b>
                {distance} km
              </b>

            </div>

          </div>

          {/* Booking Summary */}
          <h2>
            Booking summary
          </h2>

          <div className="summary">

            <p>
              <span>
                Pickup
              </span>

              <b>
                {pickup || "Not selected"}
              </b>
            </p>

            <p>
              <span>
                Destination
              </span>

              <b>
                {destination || "Not selected"}
              </b>
            </p>

            <p>
              <span>
                Vehicle
              </span>

              <b>
                {ride.name}
              </b>
            </p>

            <p className="total">

              <span>
                Estimated fare
              </span>

              <strong>
                ₹{fare}
              </strong>

            </p>

          </div>

          {/* Booking Button */}
          <button
            className="book-button"
            onClick={handleBooking}
          >
            Book {ride.name} • ₹{fare}
          </button>

        </div>

        {/* Right Section */}
        <aside>

          {/* Map Preview */}
          <div className="map">

            <div className="map-road road-1"></div>
            <div className="map-road road-2"></div>
            <div className="map-road road-3"></div>

            <div className="map-pin pickup-pin">
              A
            </div>

            <div className="map-pin destination-pin">
              B
            </div>

            <div className="map-car">
              🚕
            </div>

            <span className="map-text">
              Route preview
            </span>

          </div>

          {/* Booking Success */}
          {booked && (

            <div className="success">

              <b>
                ✓ Ride booked successfully!
              </b>

              <span>
                Your {ride.name} is on the way.
                ETA: {ride.eta}
              </span>

            </div>

          )}

          {/* Ride History */}
          <div className="history">

            <h3>
              Recent rides
            </h3>

            {rideHistory.length === 0 ? (

              <p>
                No rides booked yet.
              </p>

            ) : (

              rideHistory
                .slice(0, 5)
                .map((item) => (

                  <div
                    className="history-item"
                    key={item.id}
                  >

                    <span>
                      🚕
                    </span>

                    <div>

                      <b>
                        {item.vehicle}
                      </b>

                      <small>
                        {item.pickup} → {item.destination}
                      </small>

                    </div>

                    <strong>
                      ₹{item.fare}
                    </strong>

                  </div>

                ))

            )}

          </div>

        </aside>

      </main>

      {/* Footer */}
      <footer>
        © 2026 RideNow • React Cab Booking Application
      </footer>

    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(
  <App />
);
