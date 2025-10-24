import { parentPort } from "worker_threads";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH = "./geometry.proto";
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef);
const geometry = grpcObject.geometry;

const client = new geometry.GeometryService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const shapes = ["persegi", "persegi panjang", "segitiga", "lingkaran"];
const bentuk = shapes[Math.floor(Math.random() * shapes.length)];

let param = {};
switch (bentuk) {
  case "persegi":
    param = { sisi: 4 };
    break;
  case "persegi panjang":
    param = { panjang: 5, lebar: 3 };
    break;
  case "segitiga":
    param = { alas: 6, tinggi: 2 };
    break;
  case "lingkaran":
    param = { radius: 3 };
    break;
}

client[bentuk.replace(" ", "")](param, (err, response) => {
  parentPort.postMessage({
    bentuk,
    hasil: response.area,
  });
});
