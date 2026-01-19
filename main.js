// --- ИНИЦИАЛИЗАЦИЯ (Загрузка данных и элементов) ---

// 1. Загружаем данные из Local Storage. Если пусто, начинаем с пустого массива.
// Убрано ["Item A", "Item B"], чтобы избежать дублирования после сохранения.
const storedItems = localStorage.getItem('todoItems');
let items = storedItems ? JSON.parse(storedItems) : []; 

// 2. Получаем ссылку на контейнер списка из HTML (предполагаем, что ID — 'myList' или 'item-list' в зависимости от твоего HTML)
// Убедись, что ID в HTML совпадает с ID здесь!
const listContainer = document.getElementById('myList') || document.getElementById('item-list'); 

// Получаем ссылки на элементы ввода и кнопки
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');


// --- ФУНКЦИОНАЛ РЕНДЕРИНГА И УДАЛЕНИЯ (Обновленный) ---

function removeItem(index) {
    items.splice(index, 1);
    // Сохраняем массив сразу после удаления
    localStorage.setItem('todoItems', JSON.stringify(items)); 
    renderList();
}

// renderList() теперь включает логику для кнопок удаления
function renderList() {
    listContainer.innerHTML = ''; 
    items.forEach((itemText, index) => {
        const newLi = document.createElement("li");
        newLi.textContent = itemText + " "; // Добавляем пробел для кнопки
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Delete';
        
        // Привязываем функцию удаления к кнопке
        removeBtn.addEventListener('click', () => {
            removeItem(index);
        });
        
        newLi.appendChild(removeBtn);
        listContainer.appendChild(newLi);
    });
}


// --- ФУНКЦИОНАЛ ДОБАВЛЕНИЯ ---

function addItem(newItem) {
    items.push(newItem); 
    // Сохраняем массив сразу после добавления
    localStorage.setItem('todoItems', JSON.stringify(items)); 
    renderList(); 
}

function handleAdd() {
    const newItemText = taskInput.value.trim(); 

    if (newItemText !== "") { 
        addItem(newItemText); 
        taskInput.value = ''; 
    }
}


// --- СЛУШАТЕЛИ СОБЫТИЙ И ПЕРВЫЙ ЗАПУСК ---

// Привязываем слушатель события к кнопке
addButton.addEventListener('click', handleAdd);

// Добавляем возможность ввода по нажатию Enter
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleAdd();
    }
});

// Инициализируем отрисовку при загрузке страницы
renderList();



