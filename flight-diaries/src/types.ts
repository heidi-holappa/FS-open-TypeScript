export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}



export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;