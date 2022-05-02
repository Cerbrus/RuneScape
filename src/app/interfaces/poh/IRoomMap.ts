import { IRoom } from '~interfaces/poh/IRoom';
import { TRoomType } from '~types/poh/TRoom';

export interface IRoomMap extends TRoomMap {
}

export type TRoomMap = {
    [RoomType in TRoomType]: IRoom & { type: RoomType; };
};
