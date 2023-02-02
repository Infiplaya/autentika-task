export interface CharacterData {
    data: CharacterData;
}

export interface CharacterData {
    character: SelectedCharacter;
}

export interface SelectedCharacter {
    name:     string;
    id:       string;
    image:    string;
    gender:   string;
    episode:  Episode[];
    status:   string;
    location: Location;
    origin:   Location;
    species:  string;
}

export interface Episode {
    episode: string;
}

export interface Location {
    dimension: string;
}
