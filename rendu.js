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
const q4 = ``
const q5 = ``
const q6 = ``
const q7 = ``
const q8 = ``
const q9 = ``
const q10 = ``
const q11 = ``
const q12 = ``
const q13 = ``
const q14 = ``
const q15 = ``
const q16 = ``
const q17 = ``
const q18 = ``
const q19 = ``
const q20 = ``
const q21 = ``
const q22 = ``
const q23 = ``
const q24 = ``
const q25 = ``
const q26 = ``











































// NE PAS TOUCHER CETTE SECTION
const tp = {name: name, promo: promo, queries: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26]}
module.exports = tp

