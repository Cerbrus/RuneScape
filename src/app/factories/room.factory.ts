import { Observable } from 'rxjs';
import { Cardinal } from '~enums/Cardinal';
import { TRoomMap } from '~interfaces/poh/IRoomMap';

export class RoomFactory {
    public readonly rooms: Observable<TRoomMap> = new Observable<TRoomMap>();

    public buildItems(): Partial<TRoomMap> {
        return {
            aquarium: { level: 63, type: 'aquarium', cost: 200000, color: '', doors: Cardinal.All },
            bedroom: { level: 20, type: 'bedroom', cost: 10000, color: '', doors: Cardinal.East | Cardinal.South }
        };
    }
}
