import React from 'react';
import { Rescue } from './rescue';
import { rescueApi } from '../REST/rescuesApi';

export class RescuesList extends React.Component {
    state = {
        rescues: [], // Initialize with an empty array
        creatingRescue: true, // Show rescue creation form by default
        newRescue: {
            name: '',
            capacity: '',
        },
    };

    componentDidMount() {
        this.fetchRescues();
    }

    fetchRescues = async () => {
        try {
            const rescues = await rescueApi.get();
            this.setState({ rescues, creatingRescue: rescues.length === 0 });
        } catch (error) {
            console.error('Failed to fetch rescues:', error);
        }
    };

    updateRescue = async (updatedRescue) => {
        try {
            await rescueApi.put(updatedRescue);
            this.fetchRescues();
        } catch (error) {
            console.error('Failed to update rescue:', error);
        }
    };

    createRescue = async () => {
        try {
            const newRescue = this.state.newRescue;
            const createdRescue = await rescueApi.create(newRescue);
            this.setState({
                rescues: [...this.state.rescues, createdRescue],
                creatingRescue: false, // Hide the rescue creation form
                newRescue: {
                    name: '',
                    capacity: '',
                },
            });
        } catch (error) {
            console.error('Failed to create rescue:', error);
        }
    };

    deleteRescue = async (rescueId) => {
        try {
            await rescueApi.delete(rescueId, true);
            this.setState((prevState) => ({
                rescues: prevState.rescues.filter((rescue) => rescue._id !== rescueId),
            }));
        } catch (error) {
            console.error('Failed to delete rescue:', error);
        }
    };


    render() {
        const { rescues, creatingRescue, newRescue } = this.state;

        // Render the rescue creation form if no rescues are available
        if (creatingRescue) {
            return (
                <div>
                    <input
                        type="text"
                        placeholder="Rescue Name"
                        value={newRescue.name}
                        onChange={(e) =>
                            this.setState({
                                newRescue: { ...newRescue, name: e.target.value },
                            })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Rescue Capacity"
                        value={newRescue.capacity}
                        onChange={(e) =>
                            this.setState({
                                newRescue: {
                                    ...newRescue,
                                    capacity: e.target.value,
                                },
                            })
                        }
                    />
                    <button onClick={this.createRescue}>Create Rescue</button>
                </div>
            );
        }

        // Render the list of rescues and "Add Animal" form after a rescue has been created
        return (
            <div className="rescue-list">
                {rescues.map((rescue, index) => (
                    rescue ? (
                        <div key={index}>
                            <Rescue rescue={rescue} updateRescue={this.updateRescue} />
                            <button onClick={() => this.deleteRescue(rescue._id)}>Delete Rescue</button>
                        </div>
                    ) : null
                ))}
                <button onClick={() => this.setState({ creatingRescue: true })}>Create New Rescue</button>
            </div>
        );
    }
}
