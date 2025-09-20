// script.js - External JavaScript for index.html

// Dependency checker function
function checkDependency() {
    const importInput = document.getElementById('importInput').value.trim();
    const resultDiv = document.getElementById('dependencyResult');
    
    if (!importInput) {
        resultDiv.innerHTML = 'Please enter an import statement';
        resultDiv.className = 'result warning';
        return;
    }

    // Standard library modules (not exhaustive list)
    const standardLib = [
        'os', 'sys', 'math', 'json', 'datetime', 're', 'random', 
        'collections', 'itertools', 'functools', 'argparse', 'csv',
        'html', 'http', 'urllib', 'ssl', 'socket', 'threading',
        'multiprocessing', 'subprocess', 'time', 'calendar', 'hashlib',
        'base64', 'zlib', 'pickle', 'sqlite3', 'xml', 'email'
    ];

    const importName = importInput.replace(/import\s+/i, '').split(' ')[0];
    const moduleName = importName.replace(/as\s+.+$/, '').trim();

    if (standardLib.includes(moduleName)) {
        resultDiv.innerHTML = `✅ <strong>${moduleName}</strong> is part of Python Standard Library. No need to add to install_requires!`;
        resultDiv.className = 'result success';
    } else {
        resultDiv.innerHTML = `📦 <strong>${moduleName}</strong> is a third-party package. Add to install_requires in setup.py:<br><code>install_requires=['${moduleName}']</code>`;
        resultDiv.className = 'result warning';
    }
}

// Copy code to clipboard
function copyCode(elementId) {
    const codeElement = document.getElementById(elementId);
    const textArea = document.createElement('textarea');
    textArea.value = codeElement.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Show feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '✓ Copied!';
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}

// Tab switching
function openTab(tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Remove active class from all buttons
    const tabButtons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // Show the specific tab content and activate button
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Simulate build process
function simulateBuild() {
    const moduleCode = document.getElementById('moduleCode').value;
    const setupCode = document.getElementById('setupCode').value;
    const outputDiv = document.getElementById('buildOutput');
    
    outputDiv.innerHTML = '🚀 Starting build process...\n\n';
    
    // Simulate build steps with delays
    setTimeout(() => {
        outputDiv.innerHTML += '✅ Checking setup.py syntax...\n';
    }, 500);
    
    setTimeout(() => {
        outputDiv.innerHTML += '✅ Validating module code...\n';
        
        // Check for basic syntax issues
        if (!moduleCode.includes('def ') && !moduleCode.includes('class ')) {
            outputDiv.innerHTML += '⚠️  Warning: No functions or classes found in module\n';
        }
        
    }, 1000);
    
    setTimeout(() => {
        outputDiv.innerHTML += '✅ Creating package structure...\n';
    }, 1500);
    
    setTimeout(() => {
        outputDiv.innerHTML += '✅ Generating distribution files...\n';
    }, 2000);
    
    setTimeout(() => {
        outputDiv.innerHTML += '\n🎉 Build completed successfully!\n';
        outputDiv.innerHTML += '📦 Package is ready for distribution\n';
        outputDiv.innerHTML += '\nTo install locally: pip install -e .\n';
        outputDiv.innerHTML += 'To build for PyPI: python -m build\n';
    }, 2500);
    
    // Scroll to output
    setTimeout(() => {
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }, 2600);
}

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Pre-fill some examples
    document.getElementById('importInput').placeholder = "import requests";
    
    // Add keyboard shortcut for dependency check
    document.getElementById('importInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkDependency();
        }
    });
});