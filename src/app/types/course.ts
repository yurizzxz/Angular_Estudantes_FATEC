export interface Course {
  id: number; 
  name: string; 
  level: 'Básico' | 'Intermediário' | 'Avançado'; 
  categories: string[]; 
  duration: number; 
  active: boolean;
}
