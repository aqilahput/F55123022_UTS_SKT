import express from "express";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const app = express();
app.use(express.json());

const PROTO_PATH = "./geometry.proto";
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef);
const geometry = grpcObject.geometry;

const client = new geometry.GeometryService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// Endpoint: /geometry
app.post("/geometry", (req, res) => {
  const { bentuk, param } = req.body;

  switch (bentuk) {
    case "persegi":
      client.Persegi(param, (err, response) => res.json(response));
      break;
    case "persegi panjang":
      client.PersegiPanjang(param, (err, response) => res.json(response));
      break;
    case "segitiga":
      client.Segitiga(param, (err, response) => res.json(response));
      break;
    case "lingkaran":
      client.Lingkaran(param, (err, response) => res.json(response));
      break;
    default:
      res.status(400).json({ error: "Bentuk tidak dikenal" });
  }
});

app.listen(3000, () =>
  console.log("Server API berjalan di http://localhost:3000")
);
