"use client";

import { addDataToRedis } from '@/helpers/api';
import React from 'react';

function Addredisdata() {
    const handleAddData = async () => {
        const result = await addDataToRedis();
        if (result.success) {
            alert(result.message);
        } else {
            alert(`Error: ${result.message}`);
        }
    };
    return (
        <>
            <button className="btn btn-primary mb-3" onClick={handleAddData}>
                Add Data to Redis
            </button>
        </>
    );
}

export default Addredisdata;
