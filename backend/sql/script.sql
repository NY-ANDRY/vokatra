CREATE TABLE t_roles (
    id INT PRIMARY KEY,
    nom VARCHAR(30)
);

INSERT INTO t_roles (id, nom) VALUES
(1, 'Administrateur'),
(2, 'Client'),
(3, 'Vendeur'),
(4, 'Livreur'),
(5, 'Gestionnaire de stock');

CREATE TABLE t_utilisateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    mot_de_passe VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES t_roles(id)
);

CREATE TABLE t_categories (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100)
);

CREATE TABLE t_saisons (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    date_debut DATE,
    date_fin DATE
);

CREATE TABLE t_produits (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    description TEXT,
    prix DECIMAL(10,2),
    categorie_id INT,
    FOREIGN KEY (categorie_id) REFERENCES t_categories(id)
);

CREATE TABLE t_produit_saison (
    id SERIAL PRIMARY KEY,
    produit_id INT,
    saison_id INT,
    FOREIGN KEY (produit_id) REFERENCES t_produits(id),
    FOREIGN KEY (saison_id) REFERENCES t_saisons(id)
);

CREATE TABLE t_produit_images (
    id SERIAL PRIMARY KEY,
    produit_id INT,
    url_image VARCHAR(255),
    FOREIGN KEY (produit_id) REFERENCES t_produits(id)
);

CREATE TABLE t_stocks_mouvements (
    id SERIAL PRIMARY KEY,
    type_mouvement VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

INSERT INTO t_stocks_mouvements (type_mouvement, description) VALUES
('Entrée Stock', ' '),
('Sortie Vente', ' '),
('Retour Fournisseur', ' '),
('Retour Client', ' '),
('Perte/Casse', ' '),
('Ajustement Positif', ' '),
('Ajustement Négatif', ' '),
('Transfert Interne', ' ');

CREATE TABLE t_stocks_produits (
    id SERIAL PRIMARY KEY,
    produit_id INT,
    quantite DECIMAL(10,2),
  	mouvement_id INT,
    date_maj TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produit_id) REFERENCES t_produits(id),
 		FOREIGN KEY (mouvement_id) REFERENCES t_stocks_mouvements(id)
);

CREATE VIEW v_produits AS
SELECT 
    p.*, 
    c.nom AS categorie, 
    (
        SELECT url_image 
        FROM t_produit_images 
        WHERE produit_id = p.id 
        LIMIT 1
    ) AS url_image,
    COALESCE(SUM(ps.quantite), 0) AS stock
FROM t_produits p
JOIN t_categories c ON p.categorie_id = c.id
LEFT JOIN t_stocks_produits ps ON p.id = ps.produit_id
GROUP BY p.id, c.nom;

CREATE TABLE t_statuts_packs (
    id INT PRIMARY KEY,
    nom VARCHAR(50) UNIQUE
);

INSERT INTO t_statuts_packs (id, nom) VALUES
(1, 'Actif'),
(2, 'Inactif'),
(3, 'Expiré'),
(4, 'Archivé');

CREATE TABLE t_packs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    description TEXT,
    reduction_percent DECIMAL(5,2),
    prix_total DECIMAL(10,2),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut_id INT,
    FOREIGN KEY (statut_id) REFERENCES t_statuts_packs(id)
);

CREATE TABLE t_pack_produits (
    id SERIAL PRIMARY KEY,
    pack_id INT,
    produit_id INT,
    quantite DECIMAL(10,2),
    FOREIGN KEY (pack_id) REFERENCES t_packs(id),
    FOREIGN KEY (produit_id) REFERENCES t_produits(id)
);

CREATE TABLE t_paniers (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES t_utilisateurs(id)
);

CREATE TABLE t_panier_produits (
    id SERIAL PRIMARY KEY,
    panier_id INT,
    produit_id INT,
    quantite DECIMAL(10,2),
    FOREIGN KEY (panier_id) REFERENCES t_paniers(id) ON DELETE CASCADE,
    FOREIGN KEY (produit_id) REFERENCES t_produits(id)
);

CREATE TABLE t_panier_packs (
    id SERIAL PRIMARY KEY,
    panier_id INT,
    pack_id INT,
    quantite INT,
    FOREIGN KEY (panier_id) REFERENCES t_paniers(id) ON DELETE CASCADE,
    FOREIGN KEY (pack_id) REFERENCES t_packs(id)
);

CREATE TABLE t_statuts_commandes (
    id INT PRIMARY KEY,
    nom VARCHAR(50) UNIQUE
);

INSERT INTO t_statuts_commandes (id, nom) VALUES
(1, 'En attente'),
(2, 'En cours'),
(3, 'Payée'),
(4, 'Annulée'),
(5, 'Terminée');

CREATE TABLE t_commandes (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut_id INT,
    FOREIGN KEY (utilisateur_id) REFERENCES t_utilisateurs(id),
    FOREIGN KEY (statut_id) REFERENCES t_statuts_commandes(id)
);

CREATE TABLE t_commandes_produits (
    id SERIAL PRIMARY KEY,
    commande_id INT,
    produit_id INT,
    quantite DECIMAL(10,2),
    FOREIGN KEY (commande_id) REFERENCES t_commandes(id),
    FOREIGN KEY (produit_id) REFERENCES t_produits(id)
);

CREATE TABLE t_commandes_packs (
    id SERIAL PRIMARY KEY,
    commande_id INT,
    pack_id INT,
    quantite INT,
    FOREIGN KEY (commande_id) REFERENCES t_commandes(id),
    FOREIGN KEY (pack_id) REFERENCES t_packs(id)
);

CREATE TABLE t_statuts_factures (
    id INT PRIMARY KEY,
    nom VARCHAR(50) UNIQUE
);

INSERT INTO t_statuts_factures (id, nom) VALUES
(1, 'En attente de paiement'),
(2, 'Payée'),
(3, 'Partiellement payée'),
(4, 'Annulée');

CREATE TABLE t_factures (
    id SERIAL PRIMARY KEY,
  	utilisateur_id INT,
  	nom_client VARCHAR(50),
    commande_id INT,
    date_facture TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    montant_total DECIMAL(10,2),
    statut_id INT,
  	FOREIGN KEY (utilisateur_id) REFERENCES t_utilisateurs(id),
    FOREIGN KEY (statut_id) REFERENCES t_statuts_factures(id),
    FOREIGN KEY (commande_id) REFERENCES t_commandes(id)
);

CREATE TABLE t_paiements_mode (
  	id SERIAL PRIMARY KEY,
  	nom VARCHAR(30)
);

CREATE TABLE t_paiements (
    id SERIAL PRIMARY KEY,
    facture_id INT,
    date_paiement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    montant DECIMAL(10,2),
  	mode_id INT,
  	FOREIGN KEY (mode_id) REFERENCES t_paiements_mode(id),
    FOREIGN KEY (facture_id) REFERENCES t_factures(id)
);

CREATE TABLE t_statuts_livraisons (
    id INT PRIMARY KEY,
    nom VARCHAR(50) UNIQUE
);

INSERT INTO t_statuts_livraisons (id, nom) VALUES
(1, 'Préparée'),
(2, 'En transit'),
(3, 'Livrée'),
(4, 'Échec de livraison'),
(5, 'Annulée');


CREATE TABLE t_livraisons_lieux (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    adresse VARCHAR(255),
  	latitude DECIMAL(9,6),
  	longitude DECIMAL(9,6)
);

CREATE TABLE t_livraisons_prix (
    id SERIAL PRIMARY KEY,
    delai_jour INT,
    prix DECIMAL(10,2)
);

CREATE TABLE t_livraisons (
    id SERIAL PRIMARY KEY,
    commande_id INT,
    lieu_livraison_id INT,
    date_livraison TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    prix DECIMAL(10,2),    
    statut_id INT,
    FOREIGN KEY (statut_id) REFERENCES t_statuts_livraisons(id),
    FOREIGN KEY (commande_id) REFERENCES t_commandes(id),    
    FOREIGN KEY (lieu_livraison_id) REFERENCES t_livraisons_lieux(id)
);


CREATE VIEW v_activite_quotidienne AS
SELECT
    DATE(f.date_facture) AS date_jour,
    SUM(f.montant_total) AS recettes
FROM
    t_factures f
WHERE
    f.statut_id = 2 -- L'ID 2 correspond à 'Payée'
GROUP BY
    DATE(f.date_facture)
ORDER BY
    date_jour;
    
CREATE OR REPLACE VIEW v_activite_mensuelle AS
SELECT
    -- Construire une date réelle (type DATE) à partir de l'année et du mois groupés
    MAKE_DATE(EXTRACT(YEAR FROM f.date_facture)::INT, EXTRACT(MONTH FROM f.date_facture)::INT, 1) AS date_mois,
    SUM(f.montant_total) AS recettes
FROM
    t_factures f
WHERE
    f.statut_id = 2 -- L'ID 2 correspond à 'Payée'
GROUP BY
    EXTRACT(YEAR FROM f.date_facture),
    EXTRACT(MONTH FROM f.date_facture)
ORDER BY
    date_mois;
    
-- CREATE TABLE t_stocks_produits (
--     id SERIAL PRIMARY KEY,
--     produit_id INT,
--     quantite DECIMAL(10,2),
--   	mouvement_id INT,
--     date_maj TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (produit_id) REFERENCES t_produits(id),
--  		FOREIGN KEY (mouvement_id) REFERENCES t_stocks_mouvements(id)
-- );

CREATE OR REPLACE VIEW v_produit_quotidienne AS 
SELECT
		p.nom as nom,
    p.id as id_produit,
    SUM(ps.quantite) as quantite,
    DATE(ps.date_maj) as date_maj
FROM t_stocks_produits as ps
JOIN t_produits as p ON ps.produit_id = p.id
GROUP BY
		p.id,
		DATE(ps.date_maj)
ORDER BY
		DATE(ps.date_maj);


CREATE OR REPLACE VIEW v_paniers_produits AS
SELECT 
	pp.*,
  prd.nom as produit_nom,
  prd.description as produit_description,
  prd.prix as produit_prix,
  prd.categorie_id as categorie_id,
  ctg.nom as categorie_nom,
  (prd.prix * pp.quantite) as total
FROM t_panier_produits AS pp
JOIN t_produits AS prd ON pp.produit_id = prd.id
JOIN t_categories AS ctg ON ctg.id = prd.categorie_id;


CREATE OR REPLACE VIEW v_commandes_produits AS
SELECT 
	cp.*,
  prd.nom as produit_nom,
  prd.description as produit_description,
  prd.prix as produit_prix,
  prd.categorie_id as categorie_id,
  ctg.nom as categorie_nom,
  (prd.prix * cp.quantite) as total
FROM t_commandes_produits AS cp
JOIN t_produits AS prd ON cp.produit_id = prd.id
JOIN t_categories AS ctg ON ctg.id = prd.categorie_id;

CREATE OR REPLACE VIEW v_commandes AS
SELECT 
    c.*,
    sc.nom as statut_nom,
    COALESCE(prod.total_produits, 0) + COALESCE(pack.total_packs, 0) AS total
FROM t_commandes c
JOIN t_statuts_commandes sc ON c.statut_id = sc.id
LEFT JOIN (
    SELECT 
        commande_id, 
        SUM(cp.quantite * p.prix) AS total_produits
    FROM t_commandes_produits cp
    JOIN t_produits p ON cp.produit_id = p.id
    GROUP BY commande_id
) AS prod ON c.id = prod.commande_id
LEFT JOIN (
    SELECT 
        commande_id, 
        SUM(cp.quantite * pk.prix_total) AS total_packs
    FROM t_commandes_packs cp
    JOIN t_packs pk ON cp.pack_id = pk.id
    GROUP BY commande_id
) AS pack ON c.id = pack.commande_id;

CREATE OR REPLACE VIEW v_factures AS
SELECT 
    f.id AS id,
    f.date_facture,
    f.montant_total,
    f.nom_client,
    f.utilisateur_id,
    u.nom AS utilisateur_nom,
    f.commande_id,
    sc.nom AS statut_facture,
    COALESCE(vc.total, 0) AS total_commande,
    
    -- Informations sur la livraison
    l.id AS livraison_id,
    l.date_livraison,
    l.prix AS prix_livraison,
    sl.nom AS statut_livraison,
    
    -- Lieu de livraison
    ll.nom AS lieu_nom,
    ll.adresse AS lieu_adresse,
    ll.latitude,
    ll.longitude

FROM t_factures f
LEFT JOIN t_utilisateurs u ON f.utilisateur_id = u.id
JOIN t_statuts_factures sc ON f.statut_id = sc.id
LEFT JOIN v_commandes vc ON f.commande_id = vc.id

-- Jointure sur la livraison liée à la commande
LEFT JOIN t_livraisons l ON f.commande_id = l.commande_id
LEFT JOIN t_statuts_livraisons sl ON l.statut_id = sl.id
LEFT JOIN t_livraisons_lieux ll ON l.lieu_livraison_id = ll.id;