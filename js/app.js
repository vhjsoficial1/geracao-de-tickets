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