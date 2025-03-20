document.getElementById('file-upload').addEventListener('change', function(e) {
    const previewImage = document.getElementById('preview-image');
    const uploadBox = document.querySelector('.upload-box');
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        previewImage.src = e.target.result;
        uploadBox.classList.add('has-preview');
      }
      
      reader.readAsDataURL(file);
    } else {
      previewImage.src = '';
      uploadBox.classList.remove('has-preview');
    }
  });

document.querySelector('.submit-btn').addEventListener('click', function(e) {
  e.preventDefault();
  
  // Elementos de erro
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(msg => msg.remove()); // Limpa erros anteriores
  
  // Validações
  let isValid = true;
  const inputs = document.querySelectorAll('.form-input, #file-upload');
  inputs.forEach(input => input.classList.remove('invalid'));
  
  // Validação da imagem
  const fileInput = document.getElementById('file-upload');
  if (!fileInput.files[0]) {
    showError(fileInput, 'Please upload a profile image');
    isValid = false;
  } else if (fileInput.files[0].size > 500000) { // 500KB
    showError(fileInput, 'Image size exceeds 500KB');
    isValid = false;
  }

  // Validação do nome
  const nameInput = document.getElementById('fullname');
  if (!nameInput.value.trim() || !/[a-zA-Z]/.test(nameInput.value)) {
    showError(nameInput, 'Please enter at least one letter');
    isValid = false;
  }

  // Validação do email
  const emailInput = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    showError(emailInput, 'Please enter a valid email');
    isValid = false;
  }

  // Validação do GitHub
  const githubInput = document.getElementById('github');
  if (!githubInput.value.startsWith('@')) {
    showError(githubInput, 'Username must start with @');
    isValid = false;
  }

  if (!isValid) return;

  // Coletar dados
  const fullName = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const github = document.getElementById('github').value;
  const avatar = document.getElementById('preview-image').src;

  // Esconder seções anteriores
  document.querySelector('.upload-container').classList.add('hidden');
  document.querySelector('.form').classList.add('hidden');
  document.querySelector('.header').classList.add('hidden');

  // Preencher ticket
  document.getElementById('ticket-name').textContent = fullName;
  document.getElementById('ticket-email').textContent = email;
  document.getElementById('ticket-github').textContent = `@${github.replace('@', '')}`;
  document.getElementById('ticket-fullname').textContent = fullName;
  document.getElementById('ticket-avatar').src = avatar;

  // Mostrar ticket
  document.querySelector('.ticket').classList.remove('hidden');
});

function showError(input, message) {
  input.classList.add('invalid');
  const error = document.createElement('div');
  error.className = 'error-message';
  error.textContent = message;
  error.style.color = '#E16151';
  error.style.fontSize = '0.9rem';
  error.style.marginTop = '5px';
  input.parentNode.insertBefore(error, input.nextSibling);
}