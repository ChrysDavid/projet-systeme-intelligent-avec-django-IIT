// Gérer l'ouverture de la modale
const loginIcon = document.querySelector('.zone-icone a'); 
const modal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');

// Ouvrir la modale au clic sur l'icône
loginIcon.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
});

// Fermer la modale
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
});
