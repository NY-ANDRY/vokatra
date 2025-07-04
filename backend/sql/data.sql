-- ✅ ROLES déjà insérés (aucun doublon ici)

-- 👤 UTILISATEURS
INSERT INTO t_utilisateurs (nom, email, mot_de_passe, role_id) VALUES
('Alice Admin', 'admin@farm.com', 'pass_admin', 1),
('Bob Fermier', 'bob@farm.com', 'pass_bob', 3),
('Claire Client', 'claire@client.com', 'pass_claire', 2),
('Livio Livreur', 'livio@delivery.com', 'pass_livio', 4),
('Samuel Stock', 'sam@stock.com', 'pass_sam', 5);

-- 📂 CATÉGORIES
INSERT INTO t_categories (nom) VALUES
('Fruits'),
('Légumes');

-- 🌦️ SAISONS
INSERT INTO t_saisons (nom, date_debut, date_fin) VALUES
('Printemps 2025', '2025-09-01', '2025-11-30'),
('Été 2025', '2025-12-01', '2025-02-28');

-- 🛍️ PRODUITS AGRICOLES
INSERT INTO t_produits (nom, description, prix, categorie_id) VALUES
('Tomates bio', 'Tomates rouges issues de l’agriculture biologique', 2.50, 2),
('Carottes fraîches', 'Carottes croquantes non traitées', 1.80, 2),
('Pommes Golden', 'Pommes sucrées et juteuses', 3.20, 1),
('Bananes mûres', 'Bananes locales savoureuses', 2.90, 1);

-- 🔗 PRODUIT-SAISON
INSERT INTO t_produit_saison (produit_id, saison_id) VALUES
(1, 1), (2, 1), (3, 2), (4, 2);

-- 🖼️ IMAGES PRODUITS
INSERT INTO t_produit_images (produit_id, url_image) VALUES
(1, 'images/tomates.jpg'),
(2, 'images/carottes.jpg'),
(3, 'images/pommes.jpg'),
(4, 'images/bananes.jpg');

-- 📦 STOCK PRODUITS
INSERT INTO t_stocks_produits (produit_id, quantite, mouvement_id, date_maj) VALUES
(1, 100, 1, '2025-05-05'),
(2, 150, 1, '2025-06-05'),
(2, 100, 1, '2025-06-05'),
(2, -50, 2, '2025-06-06'),
(3, 80, 1, '2025-06-05'),
(4, 120, 1, '2025-07-01');

-- 📦 PACK
INSERT INTO t_packs (nom, description, reduction_percent, prix_total, statut_id) VALUES
('Panier Fruité', 'Pack de fruits de saison', 10.00, 10.00, 1);

-- 📦 CONTENU DU PACK
INSERT INTO t_pack_produits (pack_id, produit_id, quantite) VALUES
(1, 3, 1), -- Pommes
(1, 4, 1); -- Bananes

-- 🛒 PANIER CLIENT
INSERT INTO t_paniers (utilisateur_id) VALUES
(3); -- Claire Client

-- PRODUITS DANS PANIER
INSERT INTO t_panier_produits (panier_id, produit_id, quantite) VALUES
(1, 1, 2), -- Tomates
(1, 2, 1); -- Carottes

-- PACK DANS PANIER
INSERT INTO t_panier_packs (panier_id, pack_id, quantite) VALUES
(1, 1, 1); -- Panier Fruité

-- 📦 COMMANDE
INSERT INTO t_commandes (utilisateur_id, statut_id) VALUES
(3, 1); -- Claire, En attente

-- COMMANDE : PRODUITS
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES
(1, 1, 2),
(1, 2, 1);

-- COMMANDE : PACKS
INSERT INTO t_commandes_packs (commande_id, pack_id, quantite) VALUES
(1, 1, 1);

-- 💰 FACTURE
INSERT INTO t_factures (commande_id, montant_total, statut_id) VALUES
(1, 14.80, 1); -- En attente de paiement

-- 💵 PAIEMENT (optionnel)
INSERT INTO t_paiements (facture_id, montant) VALUES
(1, 14.80);

-- 📍 LIEU DE LIVRAISON
INSERT INTO t_livraisons_lieux (nom, adresse) VALUES
('Ferme locale Antsirabe', 'RN7, PK 174, Antsirabe');

INSERT INTO t_livraisons_lieux (nom, adresse, latitude, longitude) VALUES
('locale 1 Antananarivo', 'RN7, PK 174, Antanarivo', -18.8792, 47.5079),
('locale 2 Antananarivo', 'RN5, PK 174, Antanarivo', -18.8850, 47.5100);

-- 🚚 DÉLAI ET PRIX LIVRAISON
INSERT INTO t_livraisons_prix (delai_jour, prix) VALUES
(2, 3.00),
(4, 1.50);

-- 🚛 LIVRAISON
INSERT INTO t_livraisons (commande_id, lieu_livraison_id, prix, statut_id) VALUES
(1, 1, 3.00, 1); -- Préparée

CREATE TABLE t_paiements_mode (
  	id SERIAL PRIMARY KEY,
  	nom VARCHAR(30)
);

INSERT INTO t_paiements_mode (id, nom) VALUES
(1, 'cash'),
(2, 'mvola');

--
-- Données pour les commandes et factures de Juin 2025
--
-- Jour 1
INSERT INTO t_commandes (utilisateur_id, date_commande, statut_id) VALUES (3, '2025-06-01 10:00:00', 3);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-01 10:00:00'), 1, 2.5);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-01 10:00:00'), 3, 1.0);
INSERT INTO t_factures (commande_id, date_facture, montant_total, statut_id) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-01 10:00:00'), '2025-06-01 10:05:00', 9.45, 2);

-- Jour 3
INSERT INTO t_commandes (utilisateur_id, date_commande, statut_id) VALUES (3, '2025-06-03 14:30:00', 3);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-03 14:30:00'), 2, 3.0);
INSERT INTO t_factures (commande_id, date_facture, montant_total, statut_id) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-03 14:30:00'), '2025-06-03 14:35:00', 5.40, 2);

-- Jour 7
INSERT INTO t_commandes (utilisateur_id, date_commande, statut_id) VALUES (3, '2025-06-07 09:15:00', 3);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-07 09:15:00'), 4, 1.5);
INSERT INTO t_factures (commande_id, date_facture, montant_total, statut_id) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-07 09:15:00'), '2025-06-07 09:20:00', 4.35, 2);

-- Jour 10
INSERT INTO t_commandes (utilisateur_id, date_commande, statut_id) VALUES (3, '2025-06-10 11:00:00', 3);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-10 11:00:00'), 1, 1.0);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-10 11:00:00'), 2, 2.0);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-10 11:00:00'), 4, 1.0);
INSERT INTO t_factures (commande_id, date_facture, montant_total, statut_id) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-10 11:00:00'), '2025-06-10 11:05:00', 9.0, 2);

-- Jour 15
INSERT INTO t_commandes (utilisateur_id, date_commande, statut_id) VALUES (3, '2025-06-15 16:45:00', 3);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-15 16:45:00'), 3, 2.0);
INSERT INTO t_factures (commande_id, date_facture, montant_total, statut_id) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-15 16:45:00'), '2025-06-15 16:50:00', 6.40, 2);

-- Jour 20
INSERT INTO t_commandes (utilisateur_id, date_commande, statut_id) VALUES (3, '2025-06-20 13:00:00', 3);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-20 13:00:00'), 1, 3.0);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-20 13:00:00'), 4, 0.5);
INSERT INTO t_factures (commande_id, date_facture, montant_total, statut_id) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-20 13:00:00'), '2025-06-20 13:05:00', 8.95, 2);

-- Jour 25
INSERT INTO t_commandes (utilisateur_id, date_commande, statut_id) VALUES (3, '2025-06-25 08:30:00', 3);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-25 08:30:00'), 2, 1.5);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-25 08:30:00'), 3, 1.0);
INSERT INTO t_factures (commande_id, date_facture, montant_total, statut_id) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-25 08:30:00'), '2025-06-25 08:35:00', 5.90, 2);

-- Jour 28
INSERT INTO t_commandes (utilisateur_id, date_commande, statut_id) VALUES (3, '2025-06-28 17:00:00', 3);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-28 17:00:00'), 1, 1.0);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-28 17:00:00'), 2, 1.0);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-28 17:00:00'), 3, 1.0);
INSERT INTO t_commandes_produits (commande_id, produit_id, quantite) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-28 17:00:00'), 4, 1.0);
INSERT INTO t_factures (commande_id, date_facture, montant_total, statut_id) VALUES ((SELECT id FROM t_commandes WHERE date_commande = '2025-06-28 17:00:00'), '2025-06-28 17:05:00', 10.40, 2);