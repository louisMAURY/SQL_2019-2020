const name = "louis-maury"
const promo = "B2A"

const q1 = `
  SELECT Name, Milliseconds AS "Temps (ms)"
  FROM Track
  WHERE Milliseconds < (SELECT Milliseconds
  FROM Track
  WHERE TrackId = 3457)
  ORDER BY Milliseconds ASC
`
const q2 = `
  SELECT t.Name
  FROM Track t
  JOIN MediaType m
  ON t.MediaTypeId = m.MediaTypeId
  WHERE m.Name = (
  SELECT m.Name
  FROM Track t
  JOIN MediaType m
  ON t.MediaTypeId = m.MediaTypeId
  WHERE t.Name = 'Rehab')
`
const q3 = `
  SELECT p.Name, COUNT(p.Name) AS "Nombre de chanson",
  SUM(t.Milliseconds)/60000 AS "Temps total de la playlist (min)",
  (SUM(t.Milliseconds)/COUNT(p.Name))/60000 AS "Temps moyen d'une chanson (min)"
  FROM Playlist p
  JOIN PlaylistTrack pt
  ON p.PlaylistId = pt.PlaylistId
  JOIN Track t
  ON pt.TrackId = t.TrackId
  GROUP BY p.Name 
`
const q4 = `
  SELECT p.Name, SUM(t.Milliseconds), AVG(t.Milliseconds)
  FROM Playlist p
  JOIN PlaylistTrack pt
  ON p.PlaylistId = pt.PlaylistId
  JOIN Track t
  ON pt.TrackId = t.TrackId
  GROUP By p.Name
  HAVING SUM(t.Milliseconds) >= AVG(t.Milliseconds)
  ORDER BY SUM(-.Milliseconds) DESC
`
const q5 = `
  SELECT p.PlaylistId, COUNT(p.Name) AS "Nombre de Chanson
  FROM Playlist p
  JOIN PlaylistTrack pt
  ON p.PLaylistId = pt.PlaylistId
  GROUP BY p.PlaylistId
  HAVING COUNT(p.Name) = (
    SELECT COUNT(p.Name)
    FROM Playlist p
    JOIN PlaylistTrack pt
    ON p.PLaylistId = pt.PlaylistId
    WHERE p.PlaylistId = 1
    GROUP BY p.PlaylistId
  )
  UNION
  SELECT p.PlaylistId, COUNT(p.Name) AS "Nombre de Chanson
  FROM Playlist p
  JOIN PlaylistTrack pt
  ON p.PLaylistId = pt.PlaylistId
  GROUP BY p.PlaylistId
  HAVING COUNT(p.Name) = (
    SELECT COUNT(p.Name)
    FROM Playlist p
    JOIN PlaylistTrack pt
    ON p.PLaylistId = pt.PlaylistId
    WHERE p.PlaylistId = 13
    GROUP BY p.PlaylistId
  )
`


const q6 = `
  SELECT c.LastName, i.BillingCountry, i.Total
  FROM Customer c
  JOIN Invoice i
  ON c.CustomerId = i.CustomerId
  WHERE i.BillingCountry <> 'France'
  INTERSECT
  SELECT c.LastName, i.BillingCountry, i.Total
  FROM Customer c
  JOIN Invoice i
  ON c.CustomerId = i.CustomerId
  WHERE i.Total > (
    SELECT MAX(Total)
    FROM Invoice
    WHERE BillingCountry = 'France'
  )
`
const q7 = `
  SELECT BillingCountry,
  MIN(Total) AS "Commande la moins élevée",
  MAX(Total) AS Commande la plus élevée",
  AVG(Total) AS Nombre de commande",
  ROUND((2183.12/Total)), 2) AS "Pourcentage de commandes"
  FROM Invoice
  GROUP BY BillingCountry
  ORDER BY SUM(Total)
`
const q8 = `
  SELECT t.Name
  al.Title AS "Album Title",
  ar.Titla AS "Artist",
  m.Name AS "Media Type",
  g.Name AS "Genre",
  t.UnitPrice
  FROM MediaType m
  JOIN Track t
  ON m.MediaTypeid = t.MediaTypeId
  JOIN Album al
  ON t.AlbumId = al.AlbumId
  JOIN Artist ar
  ON al.ArtistId = ar.ArtistId
  JOIN Genre g
  ON t.GenderId = g.GenreId
  WHERE UnitPrice > (
    SELECT AVG(UnitPrice)
    FROM Track
  )
`
const q9 = `
  SELECT t.Name, g.Name, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY t.UnitPrice) OVER (PARTITION BY g.Name) AS "Prix du Genre"
  FROM Track t
  JOIN Genre g
  ON t.GenreId = g.GenreId
  WHERE t.UnitPrice < (
    SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY t.UnitPrice) OVER (PARTITION BY g.Name)
    FROM Track t
    JOIN Genre g
    ON t.GenreId = g.GenreId
  )
`
const q10 = `
  SELECT ar.Name AS "Artiste",
  COUNT(ar.Name) AS "Nombre de chansons par Artiste",
  AVG(t.UnitPrice) AS "Prix moyen des chansons",
  MAX(ar.ArtistId) AS "Nombre maximum de chansons"
  FROM Playlist p
  JOIN PlaylistTrack pt
  ON p.PlaylistId = pt.PlaylistId
  JOIN Track t
  ON pt.TrackId = t.TrackId
  JOIN Album al
  ON t.AlbumId = al.AlbumId
  JOIN Artist ar
  ON al.ArtistId = ar.ArtistId
  GROUP BY p.Name, ar.Name
  ORDER BY p.Name
`
const q11 = `
  SELECT e.Country AS "Employee Country",
  c.Country AS "Customer Country",
  i.BillingCountry AS "Invoice Country",
  COUNT(i.BillingCountry) AS "Nombre d'apparition(s)"
  FROM Employee e
  JOIN Customer c
  ON e.EmployeeId = c.SupportRepId
  JOIN Invoice i
  ON c.CustomerId = i.CustomerId
  GROUP BY e.Country, c.Country, i.BillingCountry
`
const q12 = `
  SELECT c.Country AS "Pays",
  COUNT(e.Country + c.Country + i.BillingCountry) AS "Total",
  COUNT(e.Country) AS "Employee",
  COUNT(c.Country) AS "Customer",
  COUNT(i.BillingCountry) AS "Invoice"
  FROM Employee e
  JOIN Customer c
  ON e.EmployeeId = c.SupportRepId
  JOIN Invoice i
  ON c.CustomerId = i.CustomerId
  GROUP BY c.Country
`
const q13 = `
  SELECT g.Name, MAX(t.Milliseconds) AS "Chanson la plus longue
  FROM InvoiceLine il
  JOIN Track t
  ON il.TrackId = t.TrackId
  JOIN Genre g
  ON t.GenreId = g.GenreId
  GROUP BY g.Name
`
const q14 = `
  SELECT i.InvoiceId,
  AVG(il.UnitPrice) AS "Cout moyen par chanson",
  SUM(t.Milliseconds) AS "Duree total des chansons",
  (il.UnitPrice/(t.Milliseconds/1000)) AS "Coût des chansons par seconde"
  FROM Invoice i
  JOIN InvoiceLine il
  ON i.InvoiceId = il.InvoiceId
  JOIN Track t
  ON il.TrackId = t.TrackId
  GROUP BY i.InvoiceId, (il.UnitPrice/(t.Milliseconds/1000))
  ORDER BY AVG(il.UnitPrice)
`
const q15 = `
  SELECT e.LastName, e.FirstName,
  SUM(i.InvoiceId) AS "Total de ventes par employé,
  i.BillingCountry,
  mt.Name AS "Media Type"
  FROM Employee e
  JOIN Customer c
  ON e.EmployeeId = c.SupportRepId
  JOIN Invoice i
  ON c.CustomerId = i.CustomerId
  JOIN InvoiceLine il
  ON i.InvoiceId = il.InvoiceId
  JOIN Track t
  ON il.TrackId = t.TrackId
  JOIN MediaType mt
  ON t.MediaTypeId = mt.MediaTypeId
  GROUP BY e.LastName, e.FirstName, i.BillingCountry, mt.Name
`
const q16 = `
  SELECT e.LastName, e.FirstName, SUM(i.InvoiceId) AS "Ventes", e.EmployeeId
  FROM Employee e
  JOIN Customer c
  ON e.EmployeeId = c.SupportRepId
  JOIN Invoice i
  ON c.CustomerId = i.CustomerId
  WHERE e.EmployeeId = 5
  GROUP BY e.LastName, e.FirstName, e.EmployeeId
`
const q17 = `
  SELECT p.PlaylidtId, p.Name
  FROM Playlist p
  JOIN PlaylistTrack pt
  ON p.PlaylistId = pt.PlaylistId
  JOIN Track t
  ON pt.TrackId = t.TrackId
  JOIN InvoiceLine il
  ON t.TrackId = il.TrackId
  GROUP BY p.PlaylistId, p.Name
  HAVING COUNT(il.TrackId) >= 2
  ORDER BY p.PlaylistId
`
const q18 = `
  IF DB_ID('base_q18') IS NULL
  CREATE DATABASE base_q18
  GO
  USE base_q18
  CREATE TABLE Groupe (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(60),
    display_name VARCHAR(60),
    description VARCHAR(400)
  )
  CREATE TABLE Rolee (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(60),
    display_name VARCHAR(60),
    descriptione VARCHAR(400)
  )
  CREATE TABLE Usere (
    id INT PRIMARY KEY NOT NULL,
    username VARCHAR(60),
    email VARCHAR(60),
    superuser BIT
  )
  CREATE TABLE Permission (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(60),
    dispaly_name VARCHAR(60),
    descriptione VARCHAR(400)
  )
  CREATE TABLE Group_Role (
    group_id INT FOREIGN KEY REFERENCES Groupe(id),
    role_id INT FOREIGN KEY REFERENCES Permission(id)
  )
  CREATE TABLE User_Group (
    usere_id INT FOREIGN KEY REFERENCES Usere(id),
    group_id INT FOREIGN KEY REFERENCES Groupe(id)
  )
  CREATE TABLE User_Role (
    usere_id INT FOREIGN KEY REFERENCES Usere(id),
    Role_id INT FOREIGN KEY REFERENCES Rolee(id)
  )
`
const q19 = `
  INSERT INTO Track (Name, MediaTypeId, Composer, Milliseconds, UnitPrice)
  VALUES
  ('Le Joueur de castagnettes', 1, 'Maurice Larcange', 198000, 0.99),
  ('Un jour de providence', 1, 'Maurice Larcange', 215000, 0.99),
  ('Plaisir des bois', 1, 'Maurice Larcange', 198000, 0.99)
`
const q20 = `
  INSERT INTO Employee (LastName, FirstName, Country)
  VALUES
  ('Dujardin', 'Jean', 'France'),
  ('Denice', 'Brice', 'France')
`
const q21 = `
  ALTER TABLE InvoiceLine
  DROP InvoiceId
  ALTER TABLE InvoiceLine
  ADD CONSTRAINT InvoiceId
  FOREIGN KEY (InvoiceId)
  REFERENCES Invoice(InvoiceId)
  ON DELETE CASCADE
  DELETE FROM Invoice
  WHERE CONVERT(INT, CONVERT(DATETIME, InvoiceDate)) BETWEEN 40184 AND 40535
`
const q22 = `
  UPDATE Invoice
  SET BillingCountry = 'France'
  WHERE CONVERT(INT, CONVERT(DATETIME, InvoiceDate)) > 40543
  AND
  BillingCountry = 'Germany'
`
const q23 = `
  UPDATE i
  SET i.BillingCountry = c.Country
  FROM Invoice i
  JOIN Customer c
  ON i.CustomerId = c.CustomerId
  WHERE i.BillingCountry <> c.Country
`
const q24 = `
  ALTER TABLE Employee
  ADD Salary INT
`
const q25 = `
  UPDATE Employee
  SET Salary = ROUND(RAND()*70000+30000, 0)
`
const q26 = `
  ALTER TABLE Invoice
  DROP COLUMN BillingPostalCode<
`











































// NE PAS TOUCHER CETTE SECTION
const tp = {name: name, promo: promo, queries: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26]}
module.exports = tp

