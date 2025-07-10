INSERT INTO t_utilisateurs (nom, email, mot_de_passe, role_id) VALUES
('Alice Admin', 'admin@farm.com', 'pass_admin', 1),
('Bob Fermier', 'bob@farm.com', 'pass_bob', 3),
('Claire Client', 'claire@client.com', 'pass_claire', 2),
('Livio Livreur', 'livio@delivery.com', 'pass_livio', 4),
('Samuel Stock', 'sam@stock.com', 'pass_sam', 5);

INSERT INTO t_livraisons_lieux (nom, adresse, latitude, longitude) VALUES
('Antananarivo Centre', 'RN7, PK 174, Antsirabe', -18.879200, 47.507900),
('Ambohimanambola', 'RN7, PK 174, Antanarivo', -18.943000, 47.525500),
('Itaosy', 'RN5, PK 174, Antanarivo',-18.920700, 47.478300);

INSERT INTO t_categories (nom) VALUES
('Fruits'),       -- id = 1
('Légumes'),      -- id = 2
('Céréales');     -- id = 3

INSERT INTO t_saisons (nom, date_debut, date_fin) VALUES
('Printemps 2025', '2025-09-01', '2025-11-30'), -- id = 1
('Été 2025', '2025-12-01', '2026-02-28'),       -- id = 2
('Automne 2026', '2026-03-01', '2026-05-31');   -- id = 3

-- Fruits
INSERT INTO t_produits (nom, description, prix, categorie_id) VALUES
('Mangue', 'Fruit tropical juteux et sucré.', 2500, 1),
('Banane', 'Riche en potassium, idéale pour l’énergie.', 1200, 1),
('Pomme', 'Croquante et sucrée, idéale en collation.', 1800, 1),

-- Légumes
('Carotte', 'Bonne pour la vue, riche en bêta-carotène.', 1000, 2),
('Tomate', 'Utilisée dans de nombreux plats.', 1500, 2),
('Pomme de terre', 'Aliment de base, riche en amidon.', 900, 2),
('Épinard', 'Feuille verte riche en fer.', 1300, 2),

-- Céréales
('Maïs', 'Utilisé pour la farine, les céréales et le pop-corn.', 1100, 3),
('Riz', 'Céréale de base dans de nombreux pays.', 900, 3),
('Blé', 'Utilisé pour le pain, les pâtes et plus.', 1000, 3);

-- Fruits
INSERT INTO t_produit_saison (produit_id, saison_id) VALUES
(1, 2), -- Mangue - Été
(2, 2), -- Banane - Été
(3, 3), -- Pomme - Automne

-- Légumes
(4, 1), -- Carotte - Printemps
(5, 2), -- Tomate - Été
(6, 3), -- Pomme de terre - Automne
(7, 1), -- Épinard - Printemps

-- Céréales
(8, 2), -- Maïs - Été
(9, 3), -- Riz - Automne
(10, 3); -- Blé - Automne


-- 🚚 DÉLAI ET PRIX LIVRAISON
INSERT INTO t_livraisons_prix (delai_jour, prix) VALUES
(2, 3.00),
(4, 1.50);

INSERT INTO t_paiements_mode (id, nom) VALUES
(1, 'cash'),
(2, 'mvola');



INSERT INTO t_stocks_produits (produit_id, quantite, mouvement_id) VALUES
(1, 100.00, 1),  -- Mangue
(2, 150.00, 1),  -- Banane
(3, 80.00, 1),   -- Pomme
(4, 200.00, 1),  -- Carotte
(5, 170.00, 1),  -- Tomate
(6, 300.00, 1),  -- Pomme de terre
(7, 120.00, 1),  -- Épinard
(8, 250.00, 1),  -- Maïs
(9, 500.00, 1),  -- Riz
(10, 400.00, 1); -- Blé


-- PACK 1 : Été Tropical
INSERT INTO t_packs (id, nom, description, reduction_percent, prix_total, statut_id)
VALUES (1, 'Pack Été Tropical', 'Un mélange rafraîchissant de fruits et légumes d’été.', 10.00, 162450, 1);

INSERT INTO t_pack_produits (pack_id, produit_id, quantite) VALUES
(1, 1, 30),  -- Mangue
(1, 2, 40),  -- Banane
(1, 5, 20),  -- Tomate
(1, 8, 25);  -- Maïs

-- PACK 2 : Santé Verte
INSERT INTO t_packs (id, nom, description, reduction_percent, prix_total, statut_id)
VALUES (2, 'Pack Santé Verte', 'Des légumes riches en fibres et vitamines pour votre santé.', 5.00, 122075, 1);

INSERT INTO t_pack_produits (pack_id, produit_id, quantite) VALUES
(2, 4, 60),  -- Carotte
(2, 7, 25),  -- Épinard
(2, 6, 40);  -- Pomme de terre

-- PACK 3 : Automne Céréalier
INSERT INTO t_packs (id, nom, description, reduction_percent, prix_total, statut_id)
VALUES (3, 'Pack Automne Céréalier', 'Idéal pour cuisiner des plats d’automne avec céréales et fruits.', 8.00, 119600, 1);

INSERT INTO t_pack_produits (pack_id, produit_id, quantite) VALUES
(3, 9, 60),  -- Riz
(3, 10, 40), -- Blé
(3, 3, 20);  -- Pomme



INSERT INTO t_produit_images (produit_id, url_image) VALUES
(1, '/assets/img/mangue.jpg'),
(2, '/assets/img/banane.jpg'),
(3, '/assets/img/pomme.jpg'),
(4, '/assets/img/carotte.jpg'),
(5, '/assets/img/tomate.jpg'),
(6, '/assets/img/patate.jpg'),
(7, '/assets/img/epinard.jpg'),
(8, '/assets/img/mais.jpg'),
(9, '/assets/img/riz.jpg'),
(10, '/assets/img/ble.jpg');















-- Commande 1 - 10 juin 2025
INSERT INTO t_commandes (date_commande, statut_id)
VALUES ('2025-06-10 10:30:00', 3); -- Payée

-- Commande 2 - 25 juin 2025
INSERT INTO t_commandes (date_commande, statut_id)
VALUES ('2025-06-25 14:45:00', 3); -- Payée

-- Commande 3 - 3 juillet 2025
INSERT INTO t_commandes (date_commande, statut_id)
VALUES ('2025-07-03 09:20:00', 3); -- Payée

-- Commande 4 - 8 juillet 2025
INSERT INTO t_commandes (date_commande, statut_id)
VALUES ('2025-07-08 16:10:00', 3); -- Payée





-- Commande 1 : 2 packs
INSERT INTO t_commandes_packs (commande_id, pack_id, quantite) VALUES
(1, 1, 1),
(1, 3, 1);

-- Commande 2 : 3 produits
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES
(2, 1, 10),  -- Mangue
(2, 5, 5),   -- Tomate
(2, 9, 20);  -- Riz

-- Commande 3 : 1 pack + 2 produits
INSERT INTO t_commandes_packs (commande_id, pack_id, quantite) VALUES
(3, 2, 1);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES
(3, 4, 10),  -- Carotte
(3, 10, 15); -- Blé

-- Commande 4 : 2 produits
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES
(4, 2, 20),  -- Banane
(4, 8, 10);  -- Maïs




-- Facture pour commande 1
INSERT INTO t_factures (commande_id, nom_client, montant_total, date_facture, statut_id)
VALUES (1, 'Client 1', 162450 + 119600, '2025-06-10 11:00:00', 2);

-- Facture pour commande 2
INSERT INTO t_factures (commande_id, nom_client, montant_total, date_facture, statut_id)
VALUES (2, 'Client 2', 50500, '2025-06-25 15:00:00', 2);

-- Facture pour commande 3
INSERT INTO t_factures (commande_id, nom_client, montant_total, date_facture, statut_id)
VALUES (3, 'Client 3', 147075, '2025-07-03 10:00:00', 2);

-- Facture pour commande 4
INSERT INTO t_factures (commande_id, nom_client, montant_total, date_facture, statut_id)
VALUES (4, 'Client 4', 35000, '2025-07-08 17:00:00', 2);







-- 📦 Commande 1 - 10 juin 2025 10:30
INSERT INTO t_stocks_produits (produit_id, quantite, mouvement_id, date_maj) VALUES
(1, -30.00, 2, '2025-06-10 10:30:00'),  -- Mangue (Pack 1)
(2, -40.00, 2, '2025-06-10 10:30:00'),  -- Banane (Pack 1)
(5, -20.00, 2, '2025-06-10 10:30:00'),  -- Tomate (Pack 1)
(8, -25.00, 2, '2025-06-10 10:30:00'),  -- Maïs (Pack 1)
(9, -60.00, 2, '2025-06-10 10:30:00'),  -- Riz (Pack 3)
(10, -40.00, 2, '2025-06-10 10:30:00'), -- Blé (Pack 3)
(3, -20.00, 2, '2025-06-10 10:30:00');  -- Pomme (Pack 3)

-- 🛒 Commande 2 - 25 juin 2025 14:45
INSERT INTO t_stocks_produits (produit_id, quantite, mouvement_id, date_maj) VALUES
(1, -10.00, 2, '2025-06-25 14:45:00'),  -- Mangue
(5, -5.00, 2, '2025-06-25 14:45:00'),   -- Tomate
(9, -20.00, 2, '2025-06-25 14:45:00');  -- Riz

-- 🛒 Commande 3 - 3 juillet 2025 09:20
INSERT INTO t_stocks_produits (produit_id, quantite, mouvement_id, date_maj) VALUES
(4, -60.00, 2, '2025-07-03 09:20:00'),  -- Carotte (Pack 2)
(7, -25.00, 2, '2025-07-03 09:20:00'),  -- Épinard (Pack 2)
(6, -40.00, 2, '2025-07-03 09:20:00'),  -- Pomme de terre (Pack 2)
(4, -10.00, 2, '2025-07-03 09:20:00'),  -- Carotte (produit seul)
(10, -15.00, 2, '2025-07-03 09:20:00'); -- Blé (produit seul)

-- 🛒 Commande 4 - 8 juillet 2025 16:10
INSERT INTO t_stocks_produits (produit_id, quantite, mouvement_id, date_maj) VALUES
(2, -20.00, 2, '2025-07-08 16:10:00'),  -- Banane
(8, -10.00, 2, '2025-07-08 16:10:00');  -- Maïs