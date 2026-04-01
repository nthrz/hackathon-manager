const TRANSLATIONS = {
  fr: {
    // nav
    logout:           'Déconnexion',

    // auth — login
    signIn:           'Connexion',
    email:            'Email',
    password:         'Mot de passe',
    signInBtn:        'Se connecter',
    noAccount:        'Pas de compte ?',
    registerLink:     "S'inscrire",

    // auth — register
    createAccount:    'Créer un compte',
    name:             'Nom',
    confirmPassword:  'Confirmer le mot de passe',
    registerBtn:      "S'inscrire",
    alreadyAccount:   'Déjà un compte ?',
    signInLink:       'Se connecter',

    // hackathons page
    hackathons:       'Hackathons',
    newHackathon:     '+ Nouveau Hackathon',
    createHackathon:  'Créer un Hackathon',
    title:            'Titre',
    description:      'Description',
    startDate:        'Date de début',
    endDate:          'Date de fin',
    create:           'Créer',
    cancel:           'Annuler',

    // hackathon page
    joinHackathon:    'Rejoindre le Hackathon',
    memberBadge:      '✓ Vous êtes membre',
    teams:            'Équipes',
    newTeam:          '+ Nouvelle Équipe',
    createTeam:       'Créer une Équipe',

    // team page
    backToHackathon:  '← Retour au hackathon',
    joinTeam:         "Rejoindre l'équipe",
    tasks:            'Tâches',
    newTask:          '+ Nouvelle Tâche',
    createTask:       'Créer une Tâche',
    members:          'Membres',

    // task statuses
    statusTodo:       'À faire',
    statusInProgress: 'En cours',
    statusDone:       'Terminé',
    delete:           'Supprimer',
    deleteTask:       'Supprimer cette tâche ?',

    // dynamic messages
    by:                    'Par',
    organizer:             'Organisateur',
    leader:                'Responsable',
    leaderBadge:           '(responsable)',
    noHackathons:          'Aucun hackathon pour le moment. Créez le premier !',
    noTeams:               'Aucune équipe pour le moment.',
    noTasks:               'Aucune tâche pour le moment.',
    loginFailed:           'Échec de la connexion',
    registerFailed:        "Échec de l'inscription",
    passwordMismatch:      'Les mots de passe ne correspondent pas',
    failedJoinHackathon:   'Échec lors de la participation au hackathon',
    failedJoinTeam:        "Échec lors de la participation à l'équipe",
    failedCreateHackathon: 'Échec lors de la création du hackathon',
    failedCreateTeam:      "Échec lors de la création de l'équipe",
    failedCreateTask:      'Échec lors de la création de la tâche',
    failedUpdateStatus:    'Échec lors de la mise à jour du statut',
    failedDeleteTask:      'Échec lors de la suppression de la tâche',
    failedLoadHackathons:  'Impossible de charger les hackathons',
    failedLoadTeams:       'Impossible de charger les équipes',
    failedLoadTasks:       'Impossible de charger les tâches',
    requestFailed:         'Échec de la requête',
  },

  en: {
    // nav
    logout:           'Logout',

    // auth — login
    signIn:           'Sign in',
    email:            'Email',
    password:         'Password',
    signInBtn:        'Sign in',
    noAccount:        'No account?',
    registerLink:     'Register',

    // auth — register
    createAccount:    'Create account',
    name:             'Name',
    confirmPassword:  'Confirm Password',
    registerBtn:      'Register',
    alreadyAccount:   'Already have an account?',
    signInLink:       'Sign in',

    // hackathons page
    hackathons:       'Hackathons',
    newHackathon:     '+ New Hackathon',
    createHackathon:  'Create a Hackathon',
    title:            'Title',
    description:      'Description',
    startDate:        'Start date',
    endDate:          'End date',
    create:           'Create',
    cancel:           'Cancel',

    // hackathon page
    joinHackathon:    'Join Hackathon',
    memberBadge:      '✓ You are a member',
    teams:            'Teams',
    newTeam:          '+ New Team',
    createTeam:       'Create a Team',

    // team page
    backToHackathon:  '← Back to hackathon',
    joinTeam:         'Join Team',
    tasks:            'Tasks',
    newTask:          '+ New Task',
    createTask:       'Create a Task',
    members:          'Members',

    // task statuses
    statusTodo:       'Todo',
    statusInProgress: 'In Progress',
    statusDone:       'Done',
    delete:           'Delete',
    deleteTask:       'Delete this task?',

    // dynamic messages
    by:                    'By',
    organizer:             'Organizer',
    leader:                'Leader',
    leaderBadge:           '(leader)',
    noHackathons:          'No hackathons yet. Create the first one!',
    noTeams:               'No teams yet.',
    noTasks:               'No tasks yet.',
    loginFailed:           'Login failed',
    registerFailed:        'Registration failed',
    passwordMismatch:      'Passwords do not match',
    failedJoinHackathon:   'Failed to join hackathon',
    failedJoinTeam:        'Failed to join team',
    failedCreateHackathon: 'Failed to create hackathon',
    failedCreateTeam:      'Failed to create team',
    failedCreateTask:      'Failed to create task',
    failedUpdateStatus:    'Failed to update status',
    failedDeleteTask:      'Failed to delete task',
    failedLoadHackathons:  'Could not load hackathons',
    failedLoadTeams:       'Could not load teams',
    failedLoadTasks:       'Could not load tasks',
    requestFailed:         'Request failed',
  }
};

function getLang() {
  return localStorage.getItem('lang') || 'fr';
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  location.reload();
}

function t(key) {
  const lang = getLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key])
      || TRANSLATIONS['en'][key]
      || key;
}

function applyI18n() {
  // update <html lang>
  document.documentElement.lang = getLang();

  // translate all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  // wire the language toggle button
  const btn = document.getElementById('btn-lang');
  if (btn) {
    btn.textContent = getLang() === 'fr' ? 'EN' : 'FR';
    btn.addEventListener('click', () => setLang(getLang() === 'fr' ? 'en' : 'fr'));
  }
}

// run immediately — scripts are at end of <body> so DOM is ready
applyI18n();
