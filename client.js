var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
var PROTO_PATH = "./gRPC-python/myProto.proto";
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
var coffeeType = grpc.loadPackageDefinition(packageDefinition);
var stub = new coffeeType.CoffeeTypes(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

var request = { message: "Coffee?", newmessage: "HIIIII" };

setInterval(() => {
    stub.getOneCoffeeType(request, (err, response) => {
        if (err) {
            console.log(err);
        } else {
            console.log(response);
        }
    });
}, 2000);

// var call = stub.getMultipleCoffeeTypes(Request);
// call.on("data", response => {
//     console.log(response);
// });
// call.on("end", () => {
//     console.log("ended");
// });
// call.on("error", err => {
//     console.log("error:", err);
// });
// call.on("status", status => {
//     console.log("status:", status);
// });
