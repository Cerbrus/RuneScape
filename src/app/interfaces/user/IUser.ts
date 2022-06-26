// noinspection SpellCheckingInspection
export interface IUser {
    name: string,
    combatlevel: number,
    melee: number,
    magic: number,
    ranged: number,
    questsstarted: number,
    questscomplete: number,
    questsnotstarted: number,
    totalskill: number,
    totalxp: number,
    rank: string,
    activities: Array<IUserActivity>,
    skillvalues: Array<IUserSkill>,
    loggedIn: boolean
}

export interface IUserSkill {
    id: number,
    level: number,
    xp: number,
    rank: number,
}

export interface IUserActivity {
    date: string,
    details: string,
    text: string
}


