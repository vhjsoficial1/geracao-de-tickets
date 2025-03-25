document.getElementById('file-upload').addEventListener('change', function(e) {
  const previewImage = document.getElementById('preview-image');
  const uploadArea = document.querySelector('.upload-area');
  const uploadSection = this.closest('.upload-section');
  const noteElement = uploadSection.querySelector('.upload-note');
  
  // Limpa erros e restaura elementos
  uploadSection.querySelectorAll('.error-message').forEach(msg => msg.remove());
  noteElement.classList.remove('hidden');
  uploadArea.classList.remove('invalid');

  const file = e.target.files[0];
  
  if (file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
          previewImage.src = e.target.result;
          uploadArea.classList.add('has-preview');
      }
      
      reader.readAsDataURL(file);
  } else {
      previewImage.src = '';
      uploadArea.classList.remove('has-preview');
  }
});

// Eventos para os botões de imagem
document.querySelector('.upload-area').addEventListener('click', function(e) {
  const uploadArea = document.querySelector('.upload-area');
  const fileInput = document.getElementById('file-upload');
  const previewImage = document.getElementById('preview-image');
  const uploadSection = document.querySelector('.upload-section');

  if (e.target.classList.contains('btn-change')) {
    fileInput.click();
  }
  
  if (e.target.classList.contains('btn-remove')) {
    fileInput.value = '';
    previewImage.src = '';
    uploadArea.classList.remove('has-preview'); // Apenas isso é necessário
    
    // Restaurar estado
    uploadSection.querySelectorAll('.error-message').forEach(msg => msg.remove());
    uploadSection.querySelector('.upload-note').classList.remove('hidden');
  }
});

document.querySelector('.generate-button').addEventListener('click', function(e) {
  e.preventDefault();
  
  // Limpar estados anteriores
  document.querySelectorAll('.error-message').forEach(msg => {
    if (msg.parentNode?.classList.contains('upload-section')) {
      const noteElement = msg.parentNode.querySelector('.upload-note');
      noteElement?.classList.remove('hidden');
    }
    msg.remove();
  });
  
  document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));

  let isValid = true;

  // Validação do Upload
  const fileInput = document.getElementById('file-upload');
  const uploadArea = document.querySelector('.upload-area');
  if (!fileInput.files[0]) {
      uploadArea.classList.add('invalid');
      showError(uploadArea, 'Please upload a profile image', 'upload');
      isValid = false;
  } else if (fileInput.files[0].size > 500000) {
      uploadArea.classList.add('invalid');
      showError(uploadArea, 'Image size exceeds 500KB', 'upload');
      isValid = false;
  }

  // Validação dos Campos
  const validations = [
    {
      input: document.getElementById('fullname'),
      validate: (value) => value.trim() && /[a-zA-Z]/.test(value),
      message: 'Please enter at least one letter'
    },
    {
      input: document.getElementById('email'),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email'
    },
    {
      input: document.getElementById('github'),
      validate: (value) => value.startsWith('@'),
      message: 'Username must start with @'
    }
  ];

  validations.forEach(({input, validate, message}) => {
    if (!validate(input.value)) {
      input.classList.add('invalid');
      showError(input, message);
      isValid = false;
    }
  });

  if (!isValid) return;

  // Processar dados
  const userData = {
    fullName: document.getElementById('fullname').value.trim(),
    email: document.getElementById('email').value.trim(),
    github: document.getElementById('github').value.replace(/^@/, ''),
    avatar: document.getElementById('preview-image').src
  };

  // Atualizar Ticket
  document.querySelectorAll('.header, .upload-section, .registration-form').forEach(el => el.classList.add('hidden'));
  document.getElementById('ticket-name').textContent = userData.fullName;
  document.getElementById('ticket-email').textContent = userData.email;
  document.getElementById('ticket-github').textContent = `@${userData.github}`;
  document.getElementById('ticket-fullname').textContent = userData.fullName;
  document.getElementById('ticket-avatar').src = userData.avatar;
  document.querySelector('.ticket').classList.remove('hidden');
});

function showError(element, message, type = 'input') {
  const error = document.createElement('div');
  error.className = 'error-message';

  if (type === 'upload') {
    const errorIcon = document.createElement('img');
    errorIcon.src = 'assets/images/icon-info.svg';
    errorIcon.style.filter = 'brightness(0.5) saturate(2)';
    errorIcon.classList.add('error-icon');
    
    const errorContent = document.createElement('span');
    errorContent.textContent = message;
    
    error.appendChild(errorIcon);
    error.appendChild(errorContent);
  } else {
    error.textContent = message;
  }

  if (type === 'upload') {
    const uploadSection = element.closest('.upload-section');
    const noteElement = uploadSection.querySelector('.upload-note');
    noteElement.classList.add('hidden');
    element.parentNode.insertBefore(error, element.nextElementSibling);
  } else {
    element.closest('.input-group').appendChild(error);
  }
}