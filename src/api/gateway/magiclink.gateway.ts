import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventBus } from '../../event-bus/event-bus';
import { OnModuleInit } from '@nestjs/common';
import { MagicLinkVerificationEvent } from '../../event-bus/events';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@WebSocketGateway({
  serveClient: true,
})
export class MagicLinkGateway implements OnModuleInit {
  @WebSocketServer() server: Server;
  constructor(private eventBus: EventBus) {}

  onModuleInit() {
    const magicLinkVerificationEvent$ = this.eventBus.ofType(
      MagicLinkVerificationEvent,
    );
    merge(magicLinkVerificationEvent$)
      .pipe(debounceTime(50))
      .subscribe(async (event: MagicLinkVerificationEvent) => {
        this.server
          .to(event.sessionToken)
          .emit('linkstatus', JSON.stringify(event.authenticationData));
      });
  }

  @SubscribeMessage('linkstatus')
  handleMessage(client: Socket, message: { room: string; message: string }) {
    this.server.to(message.room).emit(message.message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leaveRoom', room);
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log(client.handshake.query);
  }

  handleDisconnect(client: any): any {
    console.log(client.handshake.query);
  }
}
