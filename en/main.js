// Standalone script for English version
document.addEventListener('DOMContentLoaded', function() {
    // Language Switcher for English version
    const languageBtn = document.getElementById('language-btn');
    if (languageBtn) {
        languageBtn.addEventListener('click', function() {
            // Simple direct navigation back to Portuguese version
            window.location.href = '../';
        });
    }
    
    // Add a class to indicate this is the English version
    document.documentElement.classList.add('en-version');
}); 