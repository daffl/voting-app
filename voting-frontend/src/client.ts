import io from "socket.io-client";
import socketioClient from "@feathersjs/socketio-client";
import { createClient } from "voting-api";
import { Link } from "voting-api";

const socket = io("http://localhost:3030");
const connection = socketioClient(socket);

export const client = createClient(connection);

client.service("links").on("patched", (link: Link) => {
  console.log(link);
});
