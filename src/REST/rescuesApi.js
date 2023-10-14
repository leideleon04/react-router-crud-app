const RESCUES_ENDPOINT = `https://6529765755b137ddc83ede5c.mockapi.io/api/rescues/animals`;

class RescuesApi {
    get = async () => {
        try {
            const resp = await fetch(RESCUES_ENDPOINT);
            const data = await resp.json();
            return data;
        } catch (e) {
            console.log('Oops, looks like fetchRescues had an issue.', e);
        }
    }

    put = async (rescue) => {
        try {
            const resp = await fetch(`${RESCUES_ENDPOINT}/${rescue._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rescue)
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like updating rescues had an issue.', e);
        }
    }

    create = async (newRescue) => {
        try {
            const resp = await fetch(RESCUES_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRescue)
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like creating a rescue had an issue.', e);
        }
    }

    delete = async (rescueId) => {
        try {
            const endpoint = `${RESCUES_ENDPOINT}/${rescueId}`;
            const resp = await fetch(endpoint, {
                method: 'DELETE'
            });
            return resp.status === 204; // Return true for a successful deletion
        } catch (e) {
            console.log(`Oops, looks like deleting 'rescue' : 'a rescue'} had an issue.`, e);
            return false; // Return false in case of an error
        }
    }
}

export const rescueApi = new RescuesApi();