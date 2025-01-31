export interface Band {
  id: number;
  name: string;
  genreCode: string;
  year: number;
  country: string;
  members: Member[];
}

export interface Member {
  name: string;
}

export interface Album {
  id: number;
  bandId: number;
  name: string;
  year: number;
}

export interface Genre {
  code: string;
  name: string;
}

export interface User {
  id: number;
  email: string;
  token: string;
}
