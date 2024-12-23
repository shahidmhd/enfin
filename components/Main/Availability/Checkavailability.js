"use client";
import React, { useState } from "react";
import { checkParticipantAvailableSlots, formatDate } from "@/helpers/commonhelper";
import Availableslot from "../Availableslots/Availableslot";

const CheckAvailability = ({ participants, participantAvailability, schedules }) => {

    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [availableSlots, setAvailableSlots] = useState({});


    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };



    const handleCheckSlot = () => {
        const input = {
            participant_ids: selectedParticipants.map((p) => p.id),
            date_range: {
                start: formatDate(startDate),
                end: formatDate(endDate),
            },
        };

        if (!input.participant_ids.length || !startDate || !endDate) {
            alert("Please select participants and a valid date range!");
            return;
        }

        const result = checkParticipantAvailableSlots(input, participants, participantAvailability, schedules);
        if (result.success) {
            console.log("Overlapping Slots:", result.data);
            setAvailableSlots(result.data)
            alert("Overlapping slots calculated successfully. Check console for details.");
        } else {
            alert(`Error: ${result.message}`);
        }
    };

    return (
        <>
            <div className="row d-flex justify-content-center">
                <div className="w-75">
                    <div className="mb-3 position-relative">
                        <div className="dropdown">
                            <button
                                className="btn btn-light dropdown-toggle w-100 d-flex align-items-center justify-content-between"
                                type="button"
                                onClick={toggleDropdown}
                            >
                                <span className="f">Choose Participants</span>
                                <i className="ms-2 bi bi-chevron-down"></i>
                            </button>

                            {dropdownOpen && (
                                <div
                                    className="dropdown-menu bg-light w-100 mt-2 p-2"
                                    style={{
                                        display: "block",
                                        position: "absolute",
                                        zIndex: 1050,
                                        backgroundColor: "white",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    {participants.map(({ id, name }) => (
                                        <div className="form-check" key={id}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={name}
                                                id={`participant-${id}`}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedParticipants((prev) => [...prev, { id, name }]);
                                                    } else {
                                                        setSelectedParticipants((prev) =>
                                                            prev.filter((participant) => participant.id !== id)
                                                        );
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label" htmlFor={`participant-${id}`}>
                                                {name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-3" style={{ marginTop: dropdownOpen ? "130px" : "0" }}>
                        <label htmlFor="startDate" className="form-label fw-bold">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label fw-bold">
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <button
                        className="btn btn-primary w-100 fw-bold"
                        onClick={handleCheckSlot}
                    >
                        Check Slot
                    </button>
                </div>
            </div>
            <div className="mt-3">
                <Availableslot availableSlots={availableSlots} />
            </div>
        </>
    );
};

export default CheckAvailability;
