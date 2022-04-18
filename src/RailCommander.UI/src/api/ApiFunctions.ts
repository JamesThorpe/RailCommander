async function sendApiPost(url: string, data: any) {
    await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}


class EngineControl {
    async SetSpeed(address: number, speed: number, forwards: boolean):Promise<void> {
        await sendApiPost("/api/engine/speed", {
            Address: address,
            Speed: speed,
            Forwards: forwards
        });
    }

    async SetFunction(address: number, functionIndex: number, on: boolean): Promise<void> {
        await sendApiPost("/api/engine/function", {
            Address: address,
            Index: functionIndex,
            On: on
        });
    }
}

class TurnoutControl {
    async ToggleTurnout(id: string) {
        await sendApiPost("/api/layout/turnout", { Id: id });
    }
}

export default {
    EngineControl: new EngineControl(),
    TurnoutControl: new TurnoutControl()
}