export interface Grade {
  id: number;
  name: string;
  subjects: Subject[];
}

export interface Subject {
  id: number;
  name: string;
  units: Unit[];
}

export interface Unit {
  id: number;
  name: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  content: string | null;
  objectives: Objective[];
}

export interface Objective {
  id: number;
  text: string;
}
