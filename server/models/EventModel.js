module.exports = {
    fields:{
        id: "text",
        title: "text",
        startTime: "timestamp",
        endTime: "timestamp",
        owner: "text",
        created: {
            type: "timestamp",
            default: {"$db_function": "toTimestamp(now())"}
        }
    },
    key: [["id"], "created"],
    methods: {
        serialize: function() {
            return this.toJSON();
        }

    }
};