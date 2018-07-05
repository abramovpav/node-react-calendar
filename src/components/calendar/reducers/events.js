import getValue from "../../utils/utils";
import moment from "moment";

const initialState = {
    loading: false,
    events: []
    // 2018:{
    //     6: {
    //         16: [
    //             {
    //                 id: 10,
    //                 startTime: new Date(2018, 6, 16, 8),
    //                 endTime: new Date(2018, 6, 16, 13),
    //                 description: "Test Task6"
    //             }, {
    //                 id: 11,
    //                 startTime: new Date(2018, 6, 16, 12),
    //                 endTime: new Date(2018, 6, 16, 16),
    //                 description: "Test Task6"
    //             }
    //         ],
    //         17: [
    //             {
    //                 id: 1,
    //                 startTime: new Date(2018, 6, 17, 11),
    //                 endTime: new Date(2018, 6, 17, 12),
    //                 description: "Test Task"
    //             }, {
    //                 id: 2,
    //                 startTime: new Date(2018, 6, 17, 12),
    //                 endTime: new Date(2018, 6, 17, 15),
    //                 description: "Test Task2"
    //             }, {
    //                 id: 3,
    //                 startTime: new Date(2018, 6, 17, 12),
    //                 endTime: new Date(2018, 6, 17, 13),
    //                 description: "Test Task3"
    //             }, {
    //                 id: 4,
    //                 startTime: new Date(2018, 6, 17, 13),
    //                 endTime: new Date(2018, 6, 17, 14),
    //                 description: "Test Task4"
    //             }, {
    //                 id: 5,
    //                 startTime: new Date(2018, 6, 17, 12),
    //                 endTime: new Date(2018, 6, 17, 13),
    //                 description: "Test Task5"
    //             }, {
    //                 id: 6,
    //                 startTime: new Date(2018, 6, 17, 12),
    //                 endTime: new Date(2018, 6, 17, 13),
    //                 description: "Test Task6"
    //             },
    //         ],
    //         18: [
    //             {
    //                 id: 7,
    //                 startTime: new Date(2018, 6, 18, 8),
    //                 endTime: new Date(2018, 6, 18, 10),
    //                 description: "Test Task7"
    //             }, {
    //                 id: 8,
    //                 startTime: new Date(2018, 6, 18, 11),
    //                 endTime: new Date(2018, 6, 18, 12),
    //                 description: "Test Task6"
    //             }, {
    //                 id: 9,
    //                 startTime: new Date(2018, 6, 18, 11),
    //                 endTime: new Date(2018, 6, 18, 20),
    //                 description: "Test Task6"
    //             }
    //         ],
    //         19: [
    //             {
    //                 id: 12,
    //                 startTime: new Date(2018, 6, 19, 8),
    //                 endTime: new Date(2018, 6, 19, 9, 45),
    //                 description: "Test Task7"
    //             }, {
    //                 id: 13,
    //                 startTime: new Date(2018, 6, 19, 9, 50),
    //                 endTime: new Date(2018, 6, 19, 11, 20),
    //                 description: "Test Task7"
    //             }, {
    //                 id: 14,
    //                 startTime: new Date(2018, 6, 19, 11),
    //                 endTime: new Date(2018, 6, 19, 11, 45),
    //                 description: "Test Task7"
    //             }, {
    //                 id: 15,
    //                 startTime: new Date(2018, 6, 19, 11),
    //                 endTime: new Date(2018, 6, 19, 12),
    //                 description: "Test Task7"
    //             }, {
    //                 id: 16,
    //                 startTime: new Date(2018, 6, 19, 12),
    //                 endTime: new Date(2018, 6, 19, 13),
    //                 description: "Test Task7"
    //             }, {
    //                 id: 17,
    //                 startTime: new Date(2018, 6, 19, 12, 30),
    //                 endTime: new Date(2018, 6, 19, 16, 45),
    //                 description: "Test Task7"
    //             }
    //         ]
    //
    //     }
    // }
};

function getRandomId() {
    return Math.ceil(Math.random() * 1000000)
}

export default function events(state = initialState, action){
    switch(action.type) {
        case "ADD_EVENT": {
            const rawEvent = action.payload;
            const event = {
                   ...rawEvent,
                   startTime: moment(rawEvent.startTime).toDate(),
                   endTime: moment(rawEvent.endTime).toDate(),
                   description: rawEvent.title
               };
            let year = event.startTime.getFullYear();
            let month = event.startTime.getMonth();
            let day = event.startTime.getDate();
            event.id = getRandomId();
            return {
                ...state,
                events: {
                    ...state.events,
                    [year]: {
                        ...getValue(state, year, {}),
                        [month]: {
                            ...getValue(getValue(state, year, {}), month, {}),
                            [day]: [
                                ...getValue(getValue(getValue(state, year, {}), month, {}), day, []),
                                event
                            ]
                        }

                    }
                }
            }
        }
        case "UPDATE_EVENT": {
            const rawEvent = action.payload;
            const event = {
                   ...rawEvent,
                   startTime: moment(rawEvent.startTime).toDate(),
                   endTime: moment(rawEvent.endTime).toDate(),
                   description: rawEvent.title
               };
            let year = event.startTime.getFullYear();
            let month = event.startTime.getMonth();
            let day = event.startTime.getDate();
            let dayEvents = getValue(getValue(getValue(state, year, {}), month, {}), day, []);
            dayEvents = dayEvents.filter(item => item.id !== event.id);
            return {
                ...state,
                events: {
                    ...state.events,
                    [year]: {
                        ...getValue(state, year, {}),
                        [month]: {
                            ...getValue(getValue(state, year, {}), month, {}),
                            [day]: [
                                ...dayEvents,
                                event
                            ]
                        }
                    }
                }
            }
        }
        case "LOADED_EVENTS_START": {
            return {
                ...state,
                loading: true
            }
        }
        case "LOADED_EVENTS_FINISH": {
            const rawEvents = action.payload;
            let events = {};
            rawEvents.forEach((item) => {
               const event = {
                   ...item,
                   startTime: moment(item.startTime).toDate(),
                   endTime: moment(item.endTime).toDate(),
                   description: item.title
               };
               const year = event.startTime.getFullYear();
               const month = event.startTime.getMonth();
               const day = event.startTime.getDate();
               let dayEvents = getValue(getValue(getValue(events, year, {}), month, {}), day, []);
               events[year] = {
                    ...getValue(events, year, {}),
                    [month]: {
                        ...getValue(getValue(events, year, {}), month, {}),
                        [day]: [
                            ...dayEvents,
                            event
                        ]
                    }
                }
            });
            return {
                loading: false,
                events: events
            }
        }
    } 

    return state;
}