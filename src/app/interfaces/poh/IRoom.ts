import { Cardinal, TCardinal } from '~enums/Cardinal';
import { TRoomType } from '~types/poh/TRoom';

export interface IRoom {
    type: TRoomType;
    level: number;
    cost: number;
    doors: Cardinal;
    stairs?: boolean;
    outdoors?: boolean;
    dungeon?: boolean;
}

export interface IRoomAPIResponse extends Omit<IRoom, 'doors'> {
    doors: `${TCardinal}` |
        `${TCardinal}${TCardinal}` |
        `${TCardinal}${TCardinal}${TCardinal}` |
        `${TCardinal}${TCardinal}${TCardinal}${TCardinal}`;
}

