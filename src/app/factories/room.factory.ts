import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cardinal } from '~enums/Cardinal';
import { ArrayHelper } from '~helpers';
import { IRoom, IRoomAPIResponse } from '~interfaces/poh/IRoom';
import { IRoomMap, TRoomMap } from '~interfaces/poh/IRoomMap';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class RoomFactory {
    constructor(private readonly http: HttpClient) {
    }

    public readonly rooms: Observable<TRoomMap> = this.loadRooms();

    public loadRooms(): Observable<TRoomMap> {
        return this.http.get<Array<IRoomAPIResponse>>(
                `${environment.apiUrl}/skills/construction/rooms`
            )
            .pipe(
                take(1),
                map(response => ArrayHelper.toRecordWithKey(
                    response,
                    room => room.type,
                    RoomFactory.mapRoomResponse) as TRoomMap));

    }

    private static mapRoomResponse(room: IRoomAPIResponse): IRoom {
        return {
            ...room,
            doors: (room.doors.includes('N') ? Cardinal.North : 0) |
                (room.doors.includes('E') ? Cardinal.East : 0) |
                (room.doors.includes('S') ? Cardinal.South : 0) |
                (room.doors.includes('W') ? Cardinal.West : 0)
        };
    }
}
