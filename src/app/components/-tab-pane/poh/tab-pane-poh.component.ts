import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, take, tap } from 'rxjs';
import { Cardinal } from '~enums/Cardinal';
import { RoomFactory } from '~factories/room.factory';
import { ObjectHelper } from '~helpers';
import { IRoom } from '~interfaces/poh/IRoom';
import { TRoomMap } from '~interfaces/poh/IRoomMap';
import { ITabPaneComponent } from '~interfaces/ui';
import { IUserSkill } from '~interfaces/user/IUser';
import { UserService } from '~services';
import { SkillService } from '~services/skill.service';
import { TRoomContext } from '~types/poh/TRoom';

@Component({
    selector: 'tab-pane-poh',
    templateUrl: './tab-pane-poh.component.html',
    styleUrls: ['./tab-pane-poh.component.scss']
})
export class TabPanePohComponent implements ITabPaneComponent, AfterViewInit {
    @ViewChild('canvas')
    public canvas!: ElementRef<HTMLCanvasElement>;

    private rooms!: TRoomMap;
    private roomList!: Array<IRoom>;
    private userSkill?: IUserSkill;

    public canvasWidth = 1200;
    public canvasHeight = 900;

    private readonly roomSize = 140;
    private readonly padding = 5;
    private readonly wall = 10;

    private readonly door = this.roomSize / 3;

    constructor(
        private readonly roomFactory: RoomFactory,
        private readonly userService: UserService,
        private readonly skillService: SkillService,
        private readonly translate: TranslateService) {
    }

    public ngAfterViewInit(): void {
        combineLatest(this.skillService.skills, this.userService.user)
            .pipe(
                tap(([skills, user]) => {
                    const id = skills.find(s => s.name === 'Construction').id;
                    this.userSkill = user.skillvalues.find(s => s.id == id);
                }))
            .subscribe();

        this.roomFactory.rooms
            .pipe(
                take(1),
                tap(rooms => {
                    this.rooms = rooms;
                    this.roomList = ObjectHelper
                        .values(rooms)
                        .sort((a, b) => a.level - b.level);
                    this.drawRooms();
                }))
            .subscribe();
    }

    private drawRooms(): void {
        this.roomList.forEach((room, index) =>
            this.drawRoom(room, (index % 8), Math.floor(index / 8)));
    }

    private drawRoom(room: IRoom, x: number = 0, y: number = 0): void {
        const ctx = this.getCtx();
        const size = this.roomSize;
        const roomOffset = size + this.padding;
        const inner = size - this.wall;
        const roomName = this.translate.instant(room.type);

        x *= roomOffset;
        y *= roomOffset;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y, this.roomSize, this.roomSize);

        ctx.fillStyle = '#ff0000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '24px verdana';

        this.forRoom(room)
            .wallHorizontal(x, y, Cardinal.North)
            .wallHorizontal(x, y + inner, Cardinal.South)
            .wallVertical(x + inner, y, Cardinal.East)
            .wallVertical(x, y, Cardinal.West)
            .drawName(x, y, roomName);
    }

    private forRoom(room: IRoom): TRoomContext {
        return {
            wallHorizontal: this.drawWallHorizontal.bind(this, room),
            wallVertical: this.drawWallVertical.bind(this, room),
            drawName: this.drawName.bind(this, room)
        };
    }

    private drawWallHorizontal(room: IRoom, x: number, y: number, cardinal: Cardinal): TRoomContext {
        (room.doors & cardinal)
            ? this.fillRects([x, y, this.door, this.wall], [x + this.door * 2, y, this.door, this.wall])
            : this.fillRects([x, y, this.roomSize, this.wall]);

        return this.forRoom(room);
    }

    private drawWallVertical(room: IRoom, x: number, y: number, cardinal: Cardinal): TRoomContext {
        (room.doors & cardinal)
            ? this.fillRects([x, y, this.wall, this.door], [x, y + this.door * 2, this.wall, this.door])
            : this.fillRects([x, y, this.wall, this.roomSize]);

        return this.forRoom(room);
    }

    private drawName(room: IRoom, x: number, y: number, name: string): TRoomContext {
        this.getCtx()
            .fillText(name,
                x + this.roomSize / 2,
                y + this.roomSize / 2,
                this.roomSize - this.wall * 2);

        return this.forRoom(room);
    }

    private fillRects(...rects: Array<[x: number, y: number, width: number, height: number]>): void {
        const ctx = this.getCtx();
        rects.forEach(rect => ctx.fillRect(...rect));
    }

    private getCtx(): CanvasRenderingContext2D {
        const canvas = this.canvas.nativeElement;
        const ctx = canvas.getContext('2d');

        if (!ctx) throw new Error('The canvas context could not be accessed!');
        return ctx;
    }
}
