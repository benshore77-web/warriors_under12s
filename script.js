// Player data
let players = [
    { name: "Alexander", test1: 5.8, test2: 9.0, target: 9.9, notes: "", isCoach: false },
    { name: "Arda", test1: null, test2: 7.3, target: 8.0, notes: "", isCoach: false },
    { name: "Cian", test1: null, test2: 8.7, target: 9.6, notes: "", isCoach: false },
    { name: "Coen", test1: 8.0, test2: 8.2, target: 9.0, notes: "", isCoach: false },
    { name: "Cooper", test1: 5.1, test2: 6.2, target: 6.8, notes: "", isCoach: false },
    { name: "Finlay", test1: 6.3, test2: 6.3, target: 6.9, notes: "(dead leg)", isCoach: false },
    { name: "George", test1: null, test2: 10.7, target: 11.8, notes: "", isCoach: false },
    { name: "Harry", test1: 3.0, test2: 5.0, target: 5.5, notes: "", isCoach: false },
    { name: "Hugo", test1: 4.2, test2: 6.0, target: 6.6, notes: "", isCoach: false },
    { name: "Lachlan", test1: 6.5, test2: 9.5, target: 10.5, notes: "", isCoach: false },
    { name: "Magnus", test1: 5.6, test2: 6.7, target: 7.4, notes: "", isCoach: false },
    { name: "Ollie C", test1: 5.2, test2: 9.1, target: 10.0, notes: "", isCoach: false },
    { name: "Quin", test1: 5.4, test2: 8.7, target: 9.6, notes: "", isCoach: false },
    { name: "Angus", test1: null, test2: 6.0, target: 6.6, notes: "", isCoach: true },
    { name: "Brett", test1: null, test2: 6.0, target: 6.6, notes: "", isCoach: true },
    { name: "Rich", test1: null, test2: 10.7, target: 11.8, notes: "", isCoach: true }
];

let currentSort = 'alpha';
let editingIndex = -1;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderTable();
    attachEventListeners();
});

// Load data from localStorage if available
function loadData() {
    const saved = localStorage.getItem('bleepTestData');
    if (saved) {
        players = JSON.parse(saved);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('bleepTestData', JSON.stringify(players));
}

// Render the table
function renderTable() {
    const tbody = document.getElementById('scoresBody');
    tbody.innerHTML = '';

    // Sort players
    let sortedPlayers = [...players];
    if (currentSort === 'alpha') {
        sortedPlayers.sort((a, b) => {
            // Sort coaches to bottom
            if (a.isCoach && !b.isCoach) return 1;
            if (!a.isCoach && b.isCoach) return -1;
            return a.name.localeCompare(b.name);
        });
    } else if (currentSort === 'score') {
        sortedPlayers.sort((a, b) => {
            // Sort coaches to bottom
            if (a.isCoach && !b.isCoach) return 1;
            if (!a.isCoach && b.isCoach) return -1;
            // Sort by test 2 score descending
            return (b.test2 || 0) - (a.test2 || 0);
        });
    }

    sortedPlayers.forEach((player, index) => {
        const row = document.createElement('tr');
        if (player.isCoach) {
            row.classList.add('coach-row');
        }

        // Calculate improvement
        let improvement = '';
        let improvementClass = '';
        if (player.test1 !== null && player.test2 !== null) {
            const diff = player.test2 - player.test1;
            if (diff > 0) {
                improvement = `+${diff.toFixed(1)}`;
                improvementClass = 'improvement-positive';
            } else if (diff < 0) {
                improvement = `${diff.toFixed(1)}`;
                improvementClass = 'improvement-negative';
            } else {
                improvement = '0.0';
                improvementClass = 'improvement-neutral';
            }
        } else {
            improvement = '-';
        }

        // Check if target reached
        let targetClass = '';
        if (player.test2 !== null && player.target !== null) {
            if (player.test2 >= player.target) {
                targetClass = 'target-reached';
            }
        }

        row.innerHTML = `
            <td class="${player.isCoach ? 'coach-name' : ''}">${player.name}${player.isCoach ? ' (Coach)' : ''}</td>
            <td>${player.test1 !== null ? player.test1.toFixed(1) : '-'}</td>
            <td>${player.test2 !== null ? player.test2.toFixed(1) : '-'} ${player.notes}</td>
            <td class="${improvementClass}">${improvement}</td>
            <td class="${targetClass}">${player.target !== null ? player.target.toFixed(1) : '-'}</td>
            <td class="edit-column hidden">
                <button class="btn-edit" onclick="editPlayer(${players.indexOf(player)})">Edit</button>
                <button class="btn-delete" onclick="deletePlayer(${players.indexOf(player)})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Attach event listeners
function attachEventListeners() {
    document.getElementById('sortAlpha').addEventListener('click', function() {
        currentSort = 'alpha';
        document.getElementById('sortAlpha').classList.add('active');
        document.getElementById('sortScore').classList.remove('active');
        renderTable();
    });

    document.getElementById('sortScore').addEventListener('click', function() {
        currentSort = 'score';
        document.getElementById('sortScore').classList.add('active');
        document.getElementById('sortAlpha').classList.remove('active');
        renderTable();
    });

    document.getElementById('toggleInfo').addEventListener('click', function() {
        const panel = document.getElementById('infoPanel');
        panel.classList.toggle('hidden');
    });

    document.getElementById('closeInfo').addEventListener('click', function() {
        document.getElementById('infoPanel').classList.add('hidden');
    });

    document.getElementById('editMode').addEventListener('click', function() {
        const editColumns = document.querySelectorAll('.edit-column');
        const isHidden = editColumns[0].classList.contains('hidden');

        editColumns.forEach(col => col.classList.toggle('hidden'));

        this.textContent = isHidden ? 'Exit Edit Mode' : 'Edit Scores';
        this.classList.toggle('active');
    });

    document.getElementById('scoreForm').addEventListener('submit', function(e) {
        e.preventDefault();
        savePlayer();
    });

    document.getElementById('cancelEdit').addEventListener('click', function() {
        hideEditForm();
    });
}

// Show edit form
function showEditForm(player = null, index = -1) {
    const form = document.getElementById('editForm');
    editingIndex = index;

    if (player) {
        document.getElementById('playerName').value = player.name;
        document.getElementById('test1Score').value = player.test1 !== null ? player.test1 : '';
        document.getElementById('test2Score').value = player.test2 !== null ? player.test2 : '';
        document.getElementById('targetScore').value = player.target !== null ? player.target : '';
        document.getElementById('notes').value = player.notes || '';
    } else {
        document.getElementById('scoreForm').reset();
    }

    form.classList.remove('hidden');
    form.scrollIntoView({ behavior: 'smooth' });
}

// Hide edit form
function hideEditForm() {
    document.getElementById('editForm').classList.add('hidden');
    document.getElementById('scoreForm').reset();
    editingIndex = -1;
}

// Save player
function savePlayer() {
    const name = document.getElementById('playerName').value.trim();
    const test1 = document.getElementById('test1Score').value;
    const test2 = document.getElementById('test2Score').value;
    const target = document.getElementById('targetScore').value;
    const notes = document.getElementById('notes').value.trim();

    const playerData = {
        name: name,
        test1: test1 ? parseFloat(test1) : null,
        test2: test2 ? parseFloat(test2) : null,
        target: target ? parseFloat(target) : null,
        notes: notes,
        isCoach: name.toLowerCase().includes('coach') || players[editingIndex]?.isCoach || false
    };

    if (editingIndex >= 0) {
        // Update existing player
        players[editingIndex] = playerData;
    } else {
        // Add new player
        players.push(playerData);
    }

    saveData();
    renderTable();
    hideEditForm();
}

// Edit player
function editPlayer(index) {
    showEditForm(players[index], index);
}

// Delete player
function deletePlayer(index) {
    if (confirm(`Are you sure you want to delete ${players[index].name}?`)) {
        players.splice(index, 1);
        saveData();
        renderTable();
    }
}
