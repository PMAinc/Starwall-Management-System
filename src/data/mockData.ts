import { Client, Submission, Order, Production, Installation, CalendarEvent, Statistic } from '../types';
import { addDays, subDays } from 'date-fns';

// Generate mock clients
export const clients: Client[] = [
  { id: '1', name: 'Constructions Modernes', city: 'Montréal', contactName: 'Jean Tremblay', phone: '514-555-1234', status: 'Actif' },
  { id: '2', name: 'Immobilier Québec', city: 'Québec', contactName: 'Marie Lavoie', phone: '418-555-5678', status: 'Actif' },
  { id: '3', name: 'Développements Urbains', city: 'Laval', contactName: 'Pierre Gagnon', phone: '450-555-9012', status: 'Non Actif' },
  { id: '4', name: 'Bâtiments Commerciaux', city: 'Sherbrooke', contactName: 'Sophie Bergeron', phone: '819-555-3456', status: 'Actif' },
  { id: '5', name: 'Résidences Luxueuses', city: 'Gatineau', contactName: 'Michel Côté', phone: '819-555-7890', status: 'Actif' },
  { id: '6', name: 'Projets Industriels', city: 'Trois-Rivières', contactName: 'Louise Bouchard', phone: '819-555-2345', status: 'Non Actif' },
  { id: '7', name: 'Édifices Corporatifs', city: 'Longueuil', contactName: 'Robert Lemieux', phone: '450-555-6789', status: 'Actif' },
  { id: '8', name: 'Construction Résidentielle', city: 'Saint-Jean-sur-Richelieu', contactName: 'Catherine Dion', phone: '450-555-0123', status: 'Actif' },
];

// Generate mock submissions
export const submissions: Submission[] = [
  { id: '1', number: 'S-2024-001', clientId: '1', clientName: 'Constructions Modernes', date: '2024-04-01', amount: 12500, status: 'En attente' },
  { id: '2', number: 'S-2024-002', clientId: '2', clientName: 'Immobilier Québec', date: '2024-04-03', amount: 8750, status: 'Accepte' },
  { id: '3', number: 'S-2024-003', clientId: '4', clientName: 'Bâtiments Commerciaux', date: '2024-04-05', amount: 15000, status: 'En revision' },
  { id: '4', number: 'S-2024-004', clientId: '5', clientName: 'Résidences Luxueuses', date: '2024-04-10', amount: 22000, status: 'En attente' },
  { id: '5', number: 'S-2024-005', clientId: '7', clientName: 'Édifices Corporatifs', date: '2024-04-12', amount: 18500, status: 'Accepte' },
  { id: '6', number: 'S-2024-006', clientId: '8', clientName: 'Construction Résidentielle', date: '2024-04-15', amount: 9750, status: 'En attente' },
  { id: '7', number: 'S-2024-007', clientId: '1', clientName: 'Constructions Modernes', date: '2024-04-18', amount: 13250, status: 'Accepte' },
  { id: '8', number: 'S-2024-008', clientId: '4', clientName: 'Bâtiments Commerciaux', date: '2024-04-20', amount: 16800, status: 'En revision' },
];

// Generate mock orders
export const orders: Order[] = [
  { id: '1', number: 'C-2024-001', clientId: '2', clientName: 'Immobilier Québec', creationDate: '2024-04-05', installationDate: '2024-05-10', status: 'En production', company: 'Starwall™', representativeName: 'Philippe Martin' },
  { id: '2', number: 'C-2024-002', clientId: '5', clientName: 'Résidences Luxueuses', creationDate: '2024-04-08', installationDate: '2024-05-15', status: 'En attente', company: 'Starwall™', representativeName: 'Julie Tremblay' },
  { id: '3', number: 'C-2024-003', clientId: '7', clientName: 'Édifices Corporatifs', creationDate: '2024-04-15', installationDate: '2024-05-20', status: 'En production', company: 'Starwall™', representativeName: 'Marc Leblanc' },
  { id: '4', number: 'C-2024-004', clientId: '1', clientName: 'Constructions Modernes', creationDate: '2024-04-20', installationDate: '2024-05-25', status: 'Fini', company: 'Starwall™', representativeName: 'Philippe Martin' },
  { id: '5', number: 'C-2024-005', clientId: '4', clientName: 'Bâtiments Commerciaux', creationDate: '2024-04-22', installationDate: '2024-05-30', status: 'En attente', company: 'Starwall™', representativeName: 'Julie Tremblay' },
];

// Generate mock production data
export const productions: Production[] = [
  { id: '1', number: 'P-2024-001', clientId: '2', clientName: 'Immobilier Québec', projectNumber: 'C-2024-001', status: 'En fabrication', startDate: '2024-04-10', endDate: '2024-04-25', progress: 60 },
  { id: '2', number: 'P-2024-002', clientId: '7', clientName: 'Édifices Corporatifs', projectNumber: 'C-2024-003', status: 'En attente', startDate: '2024-04-20', endDate: '2024-05-05', progress: 0 },
  { id: '3', number: 'P-2024-003', clientId: '1', clientName: 'Constructions Modernes', projectNumber: 'C-2024-004', status: 'Pret', startDate: '2024-04-01', endDate: '2024-04-15', progress: 100 },
  { id: '4', number: 'P-2024-004', clientId: '4', clientName: 'Bâtiments Commerciaux', projectNumber: 'C-2024-005', status: 'En attente', startDate: '2024-04-25', endDate: '2024-05-10', progress: 0 },
];

// Generate mock installation data
export const installations: Installation[] = [
  { id: '1', number: 'I-2024-001', clientId: '1', clientName: 'Constructions Modernes', projectNumber: 'C-2024-004', status: 'Complete', deliveryDate: '2024-04-18', installationDate: '2024-04-20', progress: 100 },
  { id: '2', number: 'I-2024-002', clientId: '2', clientName: 'Immobilier Québec', projectNumber: 'C-2024-001', status: 'En attente', deliveryDate: '2024-04-28', installationDate: '2024-05-10', progress: 0 },
  { id: '3', number: 'I-2024-003', clientId: '7', clientName: 'Édifices Corporatifs', projectNumber: 'C-2024-003', status: 'En attente', deliveryDate: '2024-05-08', installationDate: '2024-05-20', progress: 0 },
];

// Generate mock calendar events
export const calendarEvents: CalendarEvent[] = [
  { id: '1', title: 'Production - Immobilier Québec', date: new Date(), type: 'production' },
  { id: '2', title: 'Installation - Constructions Modernes', date: addDays(new Date(), 2), type: 'installation' },
  { id: '3', title: 'Réunion d\'équipe', date: addDays(new Date(), 1), type: 'meeting' },
  { id: '4', title: 'Production - Édifices Corporatifs', date: addDays(new Date(), 5), type: 'production' },
  { id: '5', title: 'Installation - Immobilier Québec', date: addDays(new Date(), 15), type: 'installation' },
  { id: '6', title: 'Réunion clients', date: addDays(new Date(), 3), type: 'meeting' },
  { id: '7', title: 'Production - Bâtiments Commerciaux', date: addDays(new Date(), 7), type: 'production' },
  { id: '8', title: 'Installation - Édifices Corporatifs', date: addDays(new Date(), 20), type: 'installation' },
];

// Generate mock statistics
export const statistics: Statistic[] = [
  { label: 'Clients', value: 8, previousValue: 6, change: 33.33, isPositive: true },
  { label: 'Soumissions', value: 8, previousValue: 5, change: 60, isPositive: true },
  { label: 'Commandes', value: 5, previousValue: 4, change: 25, isPositive: true },
  { label: 'Production', value: 4, previousValue: 6, change: -33.33, isPositive: false },
  { label: 'Installations', value: 3, previousValue: 2, change: 50, isPositive: true },
  { label: 'Revenu Mensuel', value: 75000, previousValue: 62000, change: 20.97, isPositive: true },
];

// Dashboard statistics
export const dashboardStats = {
  activeClients: {
    value: 6,
    change: 2
  },
  submissions: {
    value: 3,
    change: 1
  },
  upcomingInstallations: {
    value: 2,
    change: 0
  },
  monthlyOrders: {
    value: 5,
    change: 1
  }
};

// Generate monthly data for charts
export const monthlyData = [
  { month: 'Janvier', commandes: 3, soumissions: 5, installations: 2 },
  { month: 'Février', commandes: 4, soumissions: 6, installations: 3 },
  { month: 'Mars', commandes: 2, soumissions: 4, installations: 2 },
  { month: 'Avril', commandes: 5, soumissions: 8, installations: 3 },
  { month: 'Mai', commandes: 0, soumissions: 0, installations: 0 },
  { month: 'Juin', commandes: 0, soumissions: 0, installations: 0 },
  { month: 'Juillet', commandes: 0, soumissions: 0, installations: 0 },
  { month: 'Août', commandes: 0, soumissions: 0, installations: 0 },
  { month: 'Septembre', commandes: 0, soumissions: 0, installations: 0 },
  { month: 'Octobre', commandes: 0, soumissions: 0, installations: 0 },
  { month: 'Novembre', commandes: 0, soumissions: 0, installations: 0 },
  { month: 'Décembre', commandes: 0, soumissions: 0, installations: 0 },
];

// Revenue data
export const revenueData = [
  { month: 'Janvier', montant: 45000 },
  { month: 'Février', montant: 52000 },
  { month: 'Mars', montant: 38000 },
  { month: 'Avril', montant: 75000 },
  { month: 'Mai', montant: 0 },
  { month: 'Juin', montant: 0 },
  { month: 'Juillet', montant: 0 },
  { month: 'Août', montant: 0 },
  { month: 'Septembre', montant: 0 },
  { month: 'Octobre', montant: 0 },
  { month: 'Novembre', montant: 0 },
  { month: 'Décembre', montant: 0 },
];