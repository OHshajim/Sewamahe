export interface User {
    id?: string;
    username?: string;
    email?: string;
    [key: string]: any;
}

export interface GlobalState {
    version: string;
    entryPath: string | null;
    token: string | null;
    user: User | null;
    rooms: any[];
    searchResults: any[];
    favorites: any[];
    meetings: any[];
    nav: string;
    search: string;
    over: any;
    isPicker: boolean;
    messages: any[];
    streams: any[];
    inCall: boolean;
    video: boolean;
    audio: boolean;
    audioStream: MediaStream | null;
    videoStream: MediaStream | null;
    screenStream: MediaStream | null;
    callStatus: any;
    counterpart: any;
    callDirection: any;
    meeting: any;
    showPanel: boolean;
    panel: string;
    newGroupUsers: any[];
}
