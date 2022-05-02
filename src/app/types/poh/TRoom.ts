export type TRoomType = typeof RoomTypes[number];
export const RoomTypes = [
    'aquarium', 'bedroom', 'chapel', 'combat', 'costume', 'dining', 'dungeonCorridor', 'dungeonJunction', 'dungeonPit',
    'dungeonStairs', 'games', 'garden', 'gardenFormal', 'kitchen', 'menagerie', 'oubliette', 'parlour', 'portal',
    'quest', 'skill', 'study', 'throne', 'treasure', 'workshop'
] as const;
