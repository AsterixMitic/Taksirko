CREATE DATABASE IF NOT EXISTS taksirko_db;
USE taksirko_db;

CREATE TABLE IF NOT EXISTS Firma (
    id INT AUTO_INCREMENT PRIMARY KEY,
    naziv VARCHAR(255) NOT NULL,
    pib VARCHAR(15) NOT NULL
);

-- Latituda ide od -90 do 90, 
-- Longituda od -180 do 180
-- Preciznost na 5 decimala je 1m sto je dovoljno za lokacije
CREATE TABLE IF NOT EXISTS Lokacija (
    id INT AUTO_INCREMENT PRIMARY KEY,
    adresa VARCHAR(255),
    naziv VARCHAR(255),
    latituda DECIMAL(10,5),
    longituda DECIMAL(10,5)
);

-- Ime oznacava ISO 639 medjunarodni kod
CREATE TABLE IF NOT EXISTS Jezik (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime VARCHAR(3)
);

-- JMBG 13 cifara
-- Telefon +3816 + 8 cifara = 13 cifara 
CREATE TABLE IF NOT EXISTS Vozac (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime VARCHAR(255),
    prezime VARCHAR(255),
    jmbg VARCHAR(13),
    slika_url VARCHAR(255),
    broj_telefona VARCHAR(13)
);

CREATE TABLE IF NOT EXISTS Vozilo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    redni_broj INT,
    registracija VARCHAR(10),
    marka VARCHAR(255),
    model VARCHAR(255),
    boja VARCHAR(255),
    karoserija VARCHAR(255),
    broj_putnika VARCHAR(255),
    gorivo VARCHAR(255),
    godiste INT
);

CREATE TABLE IF NOT EXISTS Putnik (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime VARCHAR(255),
    prezime VARCHAR(255),
    broj_telefona VARCHAR(13)
);

CREATE TABLE IF NOT EXISTS Dispecer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime VARCHAR(255),
    prezime VARCHAR(255),
    username VARCHAR(255),
    password_hash VARCHAR(255),
    broj_telefona VARCHAR(13)
);

-- Statusi za status_voznje
-- 1: Zakazana
-- 2: U toku
-- 3: Zavrsena
-- 4: Otkazana
-- 5: Ceka

-- Mala izmena status -> status_voznje zbog keyworda
CREATE TABLE IF NOT EXISTS Voznja (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pocetna_lokacija_id INT,
    krajnja_lokacija_id INT,
    vreme_pocetka DATETIME,
    ocekivano_vreme_dolaska DATETIME,
    cena DECIMAL(10,2),
    nacin_placanja VARCHAR(255),
    trazeni_jezik_id INT,
    broj_leta VARCHAR(6),
    napomena VARCHAR(255),
    status_voznje INT,
    FOREIGN KEY (pocetna_lokacija_id) REFERENCES Lokacija(id),
    FOREIGN KEY (krajnja_lokacija_id) REFERENCES Lokacija(id),
    FOREIGN KEY (trazeni_jezik_id) REFERENCES Jezik(id)
);

CREATE TABLE IF NOT EXISTS Povratak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vreme_pocetka DATETIME,
    ocekivano_vreme_dolaska DATETIME,
    status_voznje INT,
    cekanje INT
);

CREATE TABLE IF NOT EXISTS PromenaStatusa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    novi_status_voznje INT,
    vreme DATETIME
);
