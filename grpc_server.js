import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, "geometry.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef);
const geometry = grpcObject.geometry;

const server = new grpc.Server();

// Implementasi fungsi luas
server.addService(geometry.GeometryService.service, {
  Persegi: (call, callback) => {
    const { sisi } = call.request;
    const area = sisi * sisi;
    callback(null, { area });
  },
  PersegiPanjang: (call, callback) => {
    const { panjang, lebar } = call.request;
    const area = panjang * lebar;
    callback(null, { area });
  },
  Segitiga: (call, callback) => {
    const { alas, tinggi } = call.request;
    const area = 0.5 * alas * tinggi;
    callback(null, { area });
  },
  Lingkaran: (call, callback) => {
    const { radius } = call.request;
    const area = Math.PI * radius * radius;
    callback(null, { area });
  },
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`gRPC server running on port ${port}`);
    server.start();
  }
);
