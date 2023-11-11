import type { PartyKitServer } from "partykit/server";

export default {
  async onConnect(ws: any, room: any) {
    const codeEditorValue = (await room.storage.get(
      "codeEditorValue"
    )) as string;

    if (codeEditorValue) ws.send(codeEditorValue);
  },
  onMessage(message: string, ws:any, room: any) {
    room.storage.put("codeEditorValue", message);
    room.broadcast(message as string, [ws.id]);
  },
} 