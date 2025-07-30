INSERT INTO Firma (naziv, pib) VALUES
('Eko Taksi', '555333444'),
('Brzi Taksi', '444555666'),
('Taksi Beograd', '123456789'),
('Taksi Novi Sad', '987654321');

INSERT INTO Lokacija (adresa, naziv, latituda, longituda) VALUES

('Nemanjina 4, Beograd', 'Glavna stanica', 44.805, 20.462),
('Trg Slobode 1, Novi Sad', 'Trg Slobode', 45.251, 19.836),
('Knez Mihailova 10, Beograd', 'Knez Mihailova', 44.817, 20.463),
('Bulevar Oslobodjenja 10, Novi Sad', 'Bulevar Oslobodjenja', 45.267, 19.833),
('Bulevar Kralja Aleksandra 20, Beograd', 'Bulevar Kralja Aleksandra', 44.818, 20.468),
('Zmaj Jovina 5, Novi Sad', 'Zmaj Jovina', 45.251, 19.836),
('Kopaonik 1, Beograd', 'Kopaonik', 44.250, 20.500),
('Bulevar Oslobodjenja 1, Novi Sad', 'Centar', 45.267, 19.833);

INSERT INTO Jezik (ime) VALUES
('srp'),
('eng'), 
('hrv'), 
('alb'), 
('mađ'),
('ger'),
('rus'),
('eng');

INSERT INTO Vozac (ime, prezime, jmbg, slika_url, broj_telefona) VALUES
('Marko', 'Markovic', '0101990710016', NULL, '+381612345678'),
('Jelena', 'Jovanovic', '0202990710024', NULL, '+381613456789'),
('Petar', 'Petrovic', '0303990710032', NULL, '+381614567890'),
('Milica', 'Milic', '0404990710040', NULL, '+381615678901'),
('Stefan', 'Stefanovic', '0505990710059', NULL, '+381616789012'),
('Ana', 'Anic', '0606990710067', NULL, '+381617890123'),
('Vladimir', 'Vukovic', '0707990710075', NULL, '+381618901234'),
('Jovan', 'Jovanovic', '0808990710083', NULL, '+381611234567');

INSERT INTO Vozilo (redni_broj, registracija, marka, model, boja, karoserija, broj_putnika, gorivo, godiste) VALUES
(1, 'BG123AA', 'Toyota', 'Prius', 'Zuta', 'Limuzina', '4', 'Hibrid', 2020),
(2, 'NS456BB', 'Volkswagen', 'Golf', 'Plava', 'Hatchback', '5', 'Benzin', 2019),
(3, 'BG789CC', 'Fiat', 'Punto', 'Crvena', 'Hatchback', '4', 'Dizel', 2018),
(4, 'NS321DD', 'Audi', 'A4', 'Siva', 'Limuzina', '5', 'Benzin', 2021),
(5, 'BG654EE', 'BMW', 'X3', 'Crna', 'SUV', '5', 'Dizel', 2022),
(6, 'NS987FF', 'Mercedes-Benz', 'C-Class', 'Bela', 'Limuzina', '5', 'Benzin', 2023),
(7, 'BG123GG', 'Opel', 'Astra', 'Zelena', 'Hatchback', '5', 'Dizel', 2017),
(2, 'NS987BB', 'Skoda', 'Octavia', 'Crna', 'Karavan', '4', 'Dizel', 2018);

INSERT INTO Putnik (ime, prezime, broj_telefona) VALUES
('Ana', 'Anic', '+381601234567'),
('Marko', 'Markovic', '+381602345678'),
('Jelena', 'Jovanovic', '+381603456789'),
('Petar', 'Petrovic', '+381604567890'),
('Milica', 'Milic', '+381605678901'),
('Stefan', 'Stefanovic', '+381606789012'),
('Vladimir', 'Vukovic', '+381607890123'),
('Petar', 'Petrovic', '+381602345678');

INSERT INTO Dispecer (ime, prezime, username, password_hash, broj_telefona) VALUES
('Ivana', 'Ivanovic', 'ivana', '$2b$10$7QJ8Qw1Qw1Qw1Qw1Qw1QwO1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw', '+381603456789'),
('Petar', 'Petrovic', 'petar', '$2b$10$8Rk9Rk2Rk2Rk2Rk2Rk2RkO2Rk2Rk2Rk2Rk2Rk2Rk2Rk2Rk2Rk2Rk', '+381604567890'),
('Jelena', 'Jovanovic', 'jelena', '$2b$10$9Sj0Sj3Sj3Sj3Sj3Sj3SjO3Sj3Sj3Sj3Sj3Sj3Sj3Sj3Sj3Sj3Sj', '+381605678901'),
('Milan', 'Milanovic', 'milan', '$2b$10$0Tk1Tk4Tk4Tk4Tk4Tk4TkO4Tk4Tk4Tk4Tk4Tk4Tk4Tk4Tk4Tk4Tk4Tk', '+381606789012'),
('Ana', 'Anic', 'ana', '$2b$10$1Ul2Ul5Ul5Ul5Ul5Ul5UlO5Ul5Ul5Ul5Ul5Ul5Ul5Ul5Ul5Ul5Ul5Ul', '+381607890123'),
('Stefan', 'Stefanovic', 'stefan', '$2b$10$2Vm3Vm6Vm6Vm6Vm6Vm6VmO6Vm6Vm6Vm6Vm6Vm6Vm6Vm6Vm6Vm6Vm6Vm', '+381608901234'),
('Vladimir', 'Vukovic', 'vladimir', '$2b$10$3Wn4Wn7Wn7Wn7Wn7Wn7WnO7Wn7Wn7Wn7Wn7Wn7Wn7Wn7Wn7Wn7Wn', '+381609012345'),
('Milan', 'Milanovic', 'milan', '$2b$10$0Tk1Tk4Tk4Tk4Tk4Tk4TkO4Tk4Tk4Tk4Tk4Tk4Tk4Tk4Tk4Tk4Tk4Tk', '+381604567890');

-- Statusi za status_voznje
-- 1: Zakazana
-- 2: U toku
-- 3: Zavrsena
-- 4: Otkazana
-- 5: Ceka

INSERT INTO Voznja (pocetna_lokacija_id, krajnja_lokacija_id, vreme_pocetka, ocekivano_vreme_dolaska, cena, nacin_placanja, trazeni_jezik_id, broj_leta, napomena, status_voznje) VALUES
(1, 2, '2025-07-30 08:00:00', '2025-07-30 08:30:00', 1200.00, 'kes', 1, 'JU123', 'Nema', 1),
(2, 1, '2025-07-30 09:00:00', '2025-07-30 09:40:00', 1500.00, 'kartica', 2, NULL, 'Hitno', 2),
(3, 3, '2025-07-30 10:00:00', '2025-07-30 10:20:00', 800.00, 'kes', 3, NULL, 'Nema', 3),
(4, 4, '2025-07-30 11:00:00', '2025-07-30 11:50:00', 2000.00, 'kartica', 4, 'BA321', 'Sa ljubimcem', 4),
(5, 5, '2025-07-30 12:00:00', '2025-07-30 12:30:00', 1000.00, 'kes', 5, NULL, 'Nema napomena', 5);

INSERT INTO Povratak (vreme_pocetka, ocekivano_vreme_dolaska, status_voznje, cekanje) VALUES
('2025-07-30 10:00:00', '2025-07-30 10:30:00', 1, 5),
('2025-07-30 11:00:00', '2025-07-30 11:45:00', 2, 10);

INSERT INTO PromenaStatusa (novi_status_voznje, vreme) VALUES
(1, '2025-07-30 08:10:00'),
(2, '2025-07-30 08:20:00');
