"use client";
import React from "react";

const Availableslot = ({ availableSlots }) => {
  return (
    <div className="bg-light p-3 rounded">
      <h5 className="fw-bold text-center p-2">Available Slot</h5>
      {Object.keys(availableSlots).length === 0 ? (
        <p className="text-center text-muted">No slots available</p>
      ) : (
        Object.entries(availableSlots).map(([date, slots]) => (
          <div key={date} className="mb-3">
            <div className="d-flex align-items-center justify-content-start mb-2 gap-3">
              <span className="fw-bold">{date}</span>
              <span className="text-muted">:</span>
              <div className="d-flex flex-wrap gap-2">
                {slots.map((slot, index) => (
                  <div
                    key={index}
                    className="badge bg-primary text-white p-2"
                    style={{
                      borderRadius: "10px",
                      fontSize: "14px",
                      minWidth: "100px",
                      textAlign: "center",
                    }}
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Availableslot;
