const server = require("../../server");
const mongoose = require('mongoose');

describe("Server", () => {
    it("should connect to the correct database", () => {
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.set('useFindAndModify', false);
        const dbName = process.env.MONGODB_URI.split("9/")[1];
        expect(mongoose.connections[0].name).toEqual(dbName);
    });
    it("should create a connection", () => {
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.set('useFindAndModify', false);
        expect(mongoose.connections[0].states.connected).toEqual(1);
    })
});
