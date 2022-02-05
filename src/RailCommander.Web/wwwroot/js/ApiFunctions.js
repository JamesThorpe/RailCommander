﻿"use strict";

async function sendApiPost(url, data) {
    await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}


export default {
    sendApiPost: sendApiPost
}