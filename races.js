// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Charger les données et afficher la grille
    fetch('races.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Données chargées:', data);
            displayRacesGrid(data.races);
        })
        .catch(error => {
            console.error('Erreur de chargement:', error);
            const grid = document.getElementById('racesGrid');
            grid.innerHTML = `<p style="color: red;">Erreur: ${error.message}</p>`;
        });
});

function displayRacesGrid(races) {
    const grid = document.getElementById('racesGrid');
    if (!grid) {
        console.error('Élément racesGrid non trouvé!');
        return;
    }
    
    grid.innerHTML = '';
    console.log('Affichage de', races.length, 'races');
    
    // Affiche les 26 premières races (4 colonnes x 6.5 lignes = 26 cases)
    races.slice(0, 26).forEach((race) => {
        const cell = document.createElement('div');
        cell.className = 'grid-cell race-cell';
        cell.innerHTML = `<h2>${race.nom}</h2>`;
        grid.appendChild(cell);
    });
    
    // Ajoute la case "retour" qui prend 2 colonnes
    const returnCell = document.createElement('div');
    returnCell.className = 'grid-cell return-cell';
    returnCell.innerHTML = '<h2>Retour</h2>';
    grid.appendChild(returnCell);
}
