import { Cardinal } from '~enums/Cardinal';

export type TRoomType = typeof RoomTypes[number];
export const RoomTypes = [
    'aquarium', 'bedroom', 'chapel', 'combat', 'costume', 'dining', 'dungeonCorridor', 'dungeonJunction', 'dungeonPit',
    'dungeonStairs', 'games', 'garden', 'gardenFormal', 'kitchen', 'menagerie', 'oubliette', 'parlour', 'portal',
    'quest', 'skill', 'study', 'throne', 'treasure', 'workshop'
] as const;

type TRoomWallDrawer = (x: number, y: number, cardinal: Cardinal) => TRoomContext;
type TRoomNameDrawer = (x: number, y: number, name: string) => TRoomContext;
export type TRoomContext = {
    wallHorizontal: TRoomWallDrawer,
    wallVertical: TRoomWallDrawer,
    drawName: TRoomNameDrawer
};
