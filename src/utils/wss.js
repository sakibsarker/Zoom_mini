import io from 'socket.io-client';
import store from '../store/store';
import { setRoomId,setParticipants } from '../store/action';
const SERVER="http://localhost:5000/";

let socket=null;

export const connectWithSocketIOServer=()=>{
    socket=io(SERVER)

    socket.on('connect',()=>{
        console.log('Successfully connected with socket io server')
        console.log(socket.id);

    
    })

    socket.on('room-id',(data)=>{
        const {roomId}=data;
        store.dispatch(setRoomId(roomId));
    })

    socket.on('room-update',(data)=>{
        const {connectedUsers}=data;
        store.dispatch(setParticipants(connectedUsers));
    })
}

export const createNewRoom=(identity)=>{
    const data={
        identity
    };
    socket.emit('create-new-room',data);

}

export const joinRoom=(identity,roomId)=>{
    //emit an event to server that we woulde to join room
    const data={
        roomId,
        identity
    }

    socket.emit('join-room',data)

}