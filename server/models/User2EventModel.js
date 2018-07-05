module.exports = {
    fields:{
        username: "text",
        events: {
            type: "set",
            typeDef: "<text>"
        }
    },
    key: ["username"]
};