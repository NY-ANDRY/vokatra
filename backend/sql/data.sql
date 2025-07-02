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
INSERT INTO t_produit_stocks (produit_id, quantite) VALUES
(1, 100),
(2, 150),
(3, 80),
(4, 120);

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

-- 🚚 DÉLAI ET PRIX LIVRAISON
INSERT INTO t_livraisons_prix (delai_jour, prix) VALUES
(2, 3.00),
(4, 1.50);

-- 🚛 LIVRAISON
INSERT INTO t_livraisons (commande_id, lieu_livraison_id, prix, statut_id) VALUES
(1, 1, 3.00, 1); -- Préparée
