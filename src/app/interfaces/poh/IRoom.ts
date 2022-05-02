import { Cardinal } from '~enums/Cardinal';
import { TRoomType } from '~types/poh/TRoom';

export interface IRoom {
    type: TRoomType;
    level: number;
    cost: number;
    doors: Cardinal;
    color: string;
}


