export interface Client {
  id: string;
  name: string;
  city: string;
  contactName: string;
  phone: string;
  status: 'Actif' | 'Non Actif';
}

export interface Submission {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  date: string;
  amount: number;
  status: 'En attente' | 'Accepte' | 'En revision';
}

export interface Order {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  creationDate: string;
  installationDate: string;
  status: 'En attente' | 'En production' | 'Fini';
  company: string;
  representativeName: string;
}

export interface Production {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  projectNumber: string;
  status: 'En attente' | 'En fabrication' | 'Pret';
  startDate: string;
  endDate: string;
  progress: number;
}

export interface Installation {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  projectNumber: string;
  status: 'En attente' | 'En cours' | 'Complete';
  deliveryDate: string;
  installationDate: string;
  progress: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'production' | 'installation' | 'meeting';
}

export interface Statistic {
  label: string;
  value: number;
  previousValue: number;
  change: number;
  isPositive: boolean;
}