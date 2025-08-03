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
    ime VARCHAR(3) NOT NULL
);

-- JMBG 13 cifara
-- Telefon +3816 + 8 cifara = 13 cifara 
CREATE TABLE IF NOT EXISTS Vozac (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime VARCHAR(255) NOT NULL ,
    prezime VARCHAR(255) NOT NULL ,
    jmbg VARCHAR(13) NOT NULL ,
    slika_url VARCHAR(255),
    broj_telefona VARCHAR(13) NOT NULL ,
    username VARCHAR(255) NOT NULL ,
    password_hash VARCHAR(255) NOT NULL,
    trenutno_zaposljen BOOLEAN NOT NULL,
    napomena VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Vozilo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    redni_broj INT NOT NULL ,
    registracija VARCHAR(10) NOT NULL ,
    marka VARCHAR(255),
    model VARCHAR(255),
    boja VARCHAR(255),
    karoserija VARCHAR(255),
    broj_putnika VARCHAR(255) NOT NULL ,
    gorivo VARCHAR(255) NOT NULL ,
    godiste INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Putnik (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime VARCHAR(255),
    prezime VARCHAR(255),
    broj_telefona VARCHAR(13)
);

CREATE TABLE IF NOT EXISTS Dispecer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime VARCHAR(255) NOT NULL ,
    prezime VARCHAR(255) NOT NULL ,
    username VARCHAR(255) NOT NULL ,
    password_hash VARCHAR(255) NOT NULL ,
    broj_telefona VARCHAR(13) NOT NULL
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
    pocetna_lokacija_id INT NOT NULL,
    krajnja_lokacija_id INT NOT NULL,
    vreme_pocetka DATETIME NOT NULL,
    ocekivano_vreme_dolaska DATETIME,
    cena DECIMAL(10,2),
    nacin_placanja VARCHAR(255),
    trazeni_jezik_id INT,
    broj_leta VARCHAR(6),
    napomena VARCHAR(255),
    recenzija VARCHAR(255),
    status_voznje INT NOT NULL ,
    povratak BOOLEAN NOT NULL ,
    cekanje VARCHAR(255),
    vozac_id INT NOT NULL ,
    vozilo_id INT NOT NULL ,
    FOREIGN KEY (vozilo_id) REFERENCES Vozilo(id),
    FOREIGN KEY (vozac_id) REFERENCES Vozac(id),
    FOREIGN KEY (pocetna_lokacija_id) REFERENCES Lokacija(id),
    FOREIGN KEY (krajnja_lokacija_id) REFERENCES Lokacija(id),
    FOREIGN KEY (trazeni_jezik_id) REFERENCES Jezik(id)
);

CREATE TABLE IF NOT EXISTS PromenaStatusa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    novi_status_voznje INT,
    vreme DATETIME
);

CREATE TABLE IF NOT EXISTS Admin(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    username VARCHAR(255) NOT NULL ,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE  IF NOT EXISTS Odsustvo(
    id INT AUTO_INCREMENT PRIMARY KEY,
    vozac_id INT NOT NULL,
    pocetni_datum DATE NOT NULL,
    krajnji_datum DATE,
    razlog_odsustva VARCHAR(255) NOT NULL,
    FOREIGN KEY (vozac_id) REFERENCES Vozac(id)
);