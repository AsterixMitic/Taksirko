USE taksirko_db;

-- Firma
INSERT INTO Firma (naziv, pib) VALUES
                                   ('Eko Taksi', '555333444'),
                                   ('Brzi Taksi', '444555666');

-- Lokacija (10 locations)
INSERT INTO Lokacija (adresa, naziv, latituda, longituda) VALUES
                                                              ('Nemanjina 4, Beograd', 'Glavna stanica', 44.80500, 20.46200),
                                                              ('Trg Slobode 1, Novi Sad', 'Trg Slobode', 45.25100, 19.83600),
                                                              ('Knez Mihailova 10, Beograd', 'Knez Mihailova', 44.81700, 20.46300),
                                                              ('Bulevar Oslobodjenja 10, Novi Sad', 'Bulevar Oslobodjenja', 45.26700, 19.83300),
                                                              ('Bulevar Kralja Aleksandra 20, Beograd', 'Bulevar Kralja Aleksandra', 44.81800, 20.46800),
                                                              ('Zmaj Jovina 5, Novi Sad', 'Zmaj Jovina', 45.25100, 19.83600),
                                                              ('Takovska 8, Beograd', 'Takovska', 44.81200, 20.47000),
                                                              ('Cara Dušana 20, Beograd', 'Cara Dušana', 44.82500, 20.47000),
                                                              ('Kralja Petra I 3, Novi Sad', 'Kralja Petra', 45.25150, 19.83200),
                                                              ('Dunavska 2, Novi Sad', 'Dunavska', 45.25600, 19.83500);

-- Jezik (5 languages)
INSERT INTO Jezik (ime) VALUES
                            ('srp'), ('eng'), ('hrv'), ('ger'), ('rus');

-- Vozac (10 drivers)
INSERT INTO Vozac (ime, prezime, jmbg, slika_url, broj_telefona, username, password_hash, trenutno_zaposljen, napomena) VALUES
                                                                                                                            ('Marko', 'Markovic', '0101990710016', NULL, '+381612345678', 'marko1', 'hash1', TRUE, ''),
                                                                                                                            ('Jelena', 'Jovanovic', '0202990710024', NULL, '+381613456789', 'jelena2', 'hash2', TRUE, ''),
                                                                                                                            ('Petar', 'Petrovic', '0303990710032', NULL, '+381614567890', 'petar3', 'hash3', TRUE, ''),
                                                                                                                            ('Milica', 'Milic', '0404990710040', NULL, '+381615678901', 'milica4', 'hash4', TRUE, ''),
                                                                                                                            ('Stefan', 'Stefanovic', '0505990710059', NULL, '+381616789012', 'stefan5', 'hash5', TRUE, ''),
                                                                                                                            ('Ana', 'Anic', '0606990710067', NULL, '+381617890123', 'ana6', 'hash6', TRUE, ''),
                                                                                                                            ('Vladimir', 'Vukovic', '0707990710075', NULL, '+381618901234', 'vladimir7', 'hash7', TRUE, ''),
                                                                                                                            ('Jovan', 'Jovanovic', '0808990710083', NULL, '+381611234567', 'jovan8', 'hash8', TRUE, ''),
                                                                                                                            ('Nikola', 'Nikolic', '0909990710091', NULL, '+381611111111', 'nikola9', 'hash9', TRUE, ''),
                                                                                                                            ('Ivana', 'Ivic', '1010990710100', NULL, '+381612222222', 'ivana10', 'hash10', TRUE, '');

-- Vozilo (10 vehicles)
INSERT INTO Vozilo (redni_broj, registracija, marka, model, boja, karoserija, broj_putnika, gorivo, godiste) VALUES
                                                                                                                 (1, 'BG101AA', 'Toyota', 'Prius', 'Zuta', 'Limuzina', '4', 'Hibrid', 2020),
                                                                                                                 (2, 'NS102BB', 'VW', 'Golf', 'Plava', 'Hatchback', '5', 'Benzin', 2019),
                                                                                                                 (3, 'BG103CC', 'Fiat', 'Panda', 'Crvena', 'Hatchback', '4', 'Dizel', 2018),
                                                                                                                 (4, 'NS104DD', 'Audi', 'A3', 'Siva', 'Limuzina', '5', 'Benzin', 2021),
                                                                                                                 (5, 'BG105EE', 'BMW', 'X1', 'Crna', 'SUV', '5', 'Dizel', 2022),
                                                                                                                 (6, 'NS106FF', 'Mercedes', 'B-Class', 'Bela', 'Karavan', '5', 'Benzin', 2023),
                                                                                                                 (7, 'BG107GG', 'Opel', 'Corsa', 'Zelena', 'Hatchback', '5', 'Dizel', 2017),
                                                                                                                 (8, 'NS108HH', 'Peugeot', '208', 'Siva', 'Hatchback', '4', 'Benzin', 2020),
                                                                                                                 (9, 'BG109II', 'Citroen', 'C3', 'Narandžasta', 'Hatchback', '4', 'Benzin', 2021),
                                                                                                                 (10, 'NS110JJ', 'Skoda', 'Octavia', 'Bela', 'Limuzina', '5', 'Dizel', 2022);

-- Putnik (10 passengers)
INSERT INTO Putnik (ime, prezime, broj_telefona) VALUES
                                                     ('Ana', 'Anic', '+381601234567'),
                                                     ('Marko', 'Markovic', '+381602345678'),
                                                     ('Jelena', 'Jovanovic', '+381603456789'),
                                                     ('Petar', 'Petrovic', '+381604567890'),
                                                     ('Milica', 'Milic', '+381605678901'),
                                                     ('Stefan', 'Stefanovic', '+381606789012'),
                                                     ('Vladimir', 'Vukovic', '+381607890123'),
                                                     ('Jovan', 'Jovanovic', '+381608901234'),
                                                     ('Nikola', 'Nikolic', '+381609012345'),
                                                     ('Ivana', 'Ivic', '+381610123456');

-- Dispecer (5 dispatchers)
INSERT INTO Dispecer (ime, prezime, username, password_hash, broj_telefona) VALUES
                                                                                ('Ivana', 'Ivanovic', 'ivana', 'disp1', '+381611111111'),
                                                                                ('Petar', 'Petrovic', 'petar', 'disp2', '+381612222222'),
                                                                                ('Jelena', 'Jovanovic', 'jelena', 'disp3', '+381613333333'),
                                                                                ('Milan', 'Milanovic', 'milan', 'disp4', '+381614444444'),
                                                                                ('Ana', 'Anic', 'ana', 'disp5', '+381615555555');

-- Voznja (10 rides)
INSERT INTO Voznja (
    pocetna_lokacija_id, krajnja_lokacija_id, vreme_pocetka, ocekivano_vreme_dolaska,
    cena, nacin_placanja, trazeni_jezik_id, broj_leta, napomena, recenzija,
    status_voznje, povratak, cekanje, vozac_id, vozilo_id
) VALUES
      (1, 2, '2025-08-01 08:00:00', '2025-08-01 08:30:00', 1200.00, 'kes', 1, 'JU123', 'Na vreme', 'Odlična', 1, FALSE, '0', 1, 1),
      (2, 3, '2025-08-01 09:00:00', '2025-08-01 09:40:00', 1500.00, 'kartica', 2, NULL, 'Hitno', 'Super', 2, TRUE, '10', 2, 2),
      (3, 4, '2025-08-01 10:00:00', '2025-08-01 10:30:00', 1000.00, 'kes', 3, NULL, '', 'OK', 3, FALSE, '0', 3, 3),
      (4, 5, '2025-08-01 11:00:00', '2025-08-01 11:50:00', 2000.00, 'kartica', 4, 'BA321', 'Sa ljubimcem', 'Perfektno', 4, FALSE, '0', 4, 4),
      (5, 6, '2025-08-01 12:00:00', '2025-08-01 12:30:00', 800.00, 'kes', 5, NULL, 'Brzo', 'Zadovoljan', 5, FALSE, '0', 5, 5),
      (6, 7, '2025-08-01 13:00:00', '2025-08-01 13:45:00', 1600.00, 'kartica', 1, NULL, '', NULL, 1, TRUE, '15', 6, 6),
      (7, 8, '2025-08-01 14:00:00', '2025-08-01 14:30:00', 900.00, 'kes', 2, NULL, '', NULL, 2, FALSE, '0', 7, 7),
      (8, 9, '2025-08-01 15:00:00', '2025-08-01 15:30:00', 1100.00, 'kes', 3, NULL, '', NULL, 3, FALSE, '0', 8, 8),
      (9, 10, '2025-08-01 16:00:00', '2025-08-01 16:45:00', 1300.00, 'kartica', 4, NULL, '', NULL, 1, TRUE, '5', 9, 9),
      (10, 1, '2025-08-01 17:00:00', '2025-08-01 17:50:00', 1700.00, 'kes', 5, NULL, 'Duga ruta', NULL, 5, FALSE, '0', 10, 10);

-- PromenaStatusa (5 status changes)
INSERT INTO PromenaStatusa (novi_status_voznje, vreme) VALUES
                                                           (1, '2025-08-01 08:15:00'),
                                                           (2, '2025-08-01 09:20:00'),
                                                           (3, '2025-08-01 10:50:00'),
                                                           (4, '2025-08-01 11:40:00'),
                                                           (5, '2025-08-01 12:10:00');

-- Admin
INSERT INTO Admin (username, password_hash) VALUES
    ('admin', 'adminpass');

-- Odsustvo (2 leave requests)
INSERT INTO Odsustvo (vozac_id, pocetni_datum, krajnji_datum, razlog_odsustva) VALUES
                                                                                   (5, '2025-07-25', '2025-07-30', 'Odmor'),
                                                                                   (8, '2025-08-02', NULL, 'Privatni razlozi');
