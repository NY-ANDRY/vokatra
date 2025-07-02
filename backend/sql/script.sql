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

CREATE TABLE t_produit_stocks (
    id SERIAL PRIMARY KEY,
    produit_id INT,
    quantite DECIMAL(10,2),
    date_maj TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produit_id) REFERENCES t_produits(id)
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
LEFT JOIN t_produit_stocks ps ON p.id = ps.produit_id
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
    FOREIGN KEY (panier_id) REFERENCES t_paniers(id),
    FOREIGN KEY (produit_id) REFERENCES t_produits(id)
);

CREATE TABLE t_panier_packs (
    id SERIAL PRIMARY KEY,
    panier_id INT,
    pack_id INT,
    quantite INT,
    FOREIGN KEY (panier_id) REFERENCES t_paniers(id),
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
(4, 'Annulée'),
(5, 'En retard');

CREATE TABLE t_factures (
    id SERIAL PRIMARY KEY,
    commande_id INT,
    date_facture TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    montant_total DECIMAL(10,2),
    statut_id INT,
    FOREIGN KEY (statut_id) REFERENCES t_statuts_factures(id),
    FOREIGN KEY (commande_id) REFERENCES t_commandes(id)
);

CREATE TABLE t_paiements (
    id SERIAL PRIMARY KEY,
    facture_id INT,
    date_paiement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    montant DECIMAL(10,2),
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
    adresse VARCHAR(255)
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