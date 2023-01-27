export interface Characters {
    data: Data;
}

export interface Data {
    characters: CharactersClass;
}

export interface CharactersClass {
    info:    Info;
    results: Character[];
}

export interface Info {
    next:  number;
    pages: number;
}

export interface Character {
    id:    string;
    name:  string;
    image: string;
}
